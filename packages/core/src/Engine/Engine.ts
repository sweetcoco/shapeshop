import Store, { StoreAction } from "./Store";

export type Point = [x: number, y: number];
export type Shape = {
  points: Point[],
  type: ShapeType
}
export enum ShapeType {
  Rect = "RECT",
  Circle = "CIRCLE",
  Line = "LINE",
  Path = "PATH",
  _ellipse = "ELLIPSE", // not implemented yet
  _polyline = "POLYLINE", // not implemented yet
  _polygon = "POLYGON" // not implemented yet
}
export type CanvasUpdate = {
  action: UpdateAction, 
  prop: UpdateProp,
  val: any, 
  previousVal: any
}
export type UpdateAction = StoreAction;
export type UpdateProp = CanvasState;
export enum CanvasState {
  Shapes = "shapes",
  ShapeType = "shapeType",
  IsDrawing = "isDrawing",
}

interface ShapeShopProps {
  el: HTMLElement,
  defaultShape: ShapeType,
  onCanvasUpdate?: (update: CanvasUpdate) => void;
}

export class Engine {
  el: HTMLElement;
  store: Store;
  onCanvasUpdate?: (update: CanvasUpdate) => void;

  // convenience methods
  _shapes = () => this.store.get(CanvasState.Shapes);
  _setShapes = (val: Shape[]) => this.store.set(CanvasState.Shapes, val);
  _isDrawing = () => this.store.get(CanvasState.IsDrawing);
  _setDrawing = (val: boolean) => this.store.set(CanvasState.IsDrawing, val);
  _shapeType = () => this.store.get(CanvasState.ShapeType);
  _setShapeType = (shapeType: ShapeType) => this.store.set(CanvasState.ShapeType, shapeType);

  constructor(props: ShapeShopProps) {
    console.log('ShapeShop Engine is on')

    // el is the "canvas"
    const {el, defaultShape} = props;

    // attach mouse event handlers to canvas
    this.el = el;
    this.el.addEventListener("mousedown", this.handleMouseDown);
    this.el.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);

    // set up the store
    this.store = new Store();
    this.store.listen(this.storeListener);
    this._setDrawing(false);
    this._setShapes([]);
    // this._setShapeType(!!defaultShape ? defaultShape : ShapeType.Path);
    this._setShapeType(defaultShape);
    
    // set up callbacks
    this.onCanvasUpdate = props.onCanvasUpdate;
  }

  handleMouseDown = (mouseEvent: MouseEvent) => {
    if (mouseEvent.button !== 0) {
      return;
    }

    try {
      const point = relativeCoordinatesForEvent(mouseEvent, this.el);
      const thisShape: Shape = {
        points: [point],
        type: this._shapeType()
      }

      this._setDrawing(true);
      this._setShapes([...this._shapes(), thisShape]);
    } catch (error) {
      if (error instanceof Error && error.message === "REF_IS_NULL") {
        console.warn("ref is null");
        return;
      }
    }
  }

  handleMouseMove = (mouseEvent: MouseEvent) =>  {
    if (!this._isDrawing()) {
      return;
    }

    try {
      const point: Point = relativeCoordinatesForEvent(mouseEvent, this.el);
      const shapes: Shape[] = this._shapes();
      const lastIndex = shapes.length - 1;

      const thisShape = {...shapes[lastIndex]};

      const shapeType = this._shapeType();

      if (shapeType === ShapeType.Path) {
        thisShape.points = [...thisShape.points, point];
      }

      if (shapeType === ShapeType.Rect || shapeType === ShapeType.Line) {
        thisShape.points = [thisShape.points[0], point];
      }

      const newShapes = [...shapes];
      newShapes[lastIndex] = thisShape;

      this._setShapes(newShapes);
    } catch (error) {
      if (error instanceof Error && error.message === "REF_IS_NULL") {
        console.warn("ref is null");
        return;
      }
    }
  }

  handleMouseUp = (mouseEvent: MouseEvent) => {
    if (mouseEvent.button !== 0) {
      return;
    }
    this._setDrawing(false);
  }

  setShapeType = (shapeType: ShapeType) => {
    this._setShapeType(shapeType);
  }

  storeListener = ({action, prop, val, previousVal}: CanvasUpdate) => {
    if (!!this.onCanvasUpdate) {
      this.onCanvasUpdate?.({
        action, prop, val, previousVal
      });
    }
  }

  destroy = () => {
    console.log("Destroying");
    this.el.removeEventListener("mousedown", this.handleMouseDown);
    this.el.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
}

function relativeCoordinatesForEvent(mouseEvent: MouseEvent, el: HTMLElement): Point {
  const boundingRect = el.getBoundingClientRect();
  return [mouseEvent.clientX - boundingRect.left, mouseEvent.clientY - boundingRect.top];
}