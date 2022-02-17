import { useCallback, useRef, useState } from 'react';
import { generatePathData, generateRectData, generateLineData, CanvasUpdate, Point, Shape, ShapeType, useShapeShop } from "@shapeshop/react";

type CanvasProps = {
  shape: ShapeType
}

function Canvas({ shape }: CanvasProps) {
  const [shapes, setShapes] = useState<Shape[]>([]);

  const annotationLayerRef = useRef<HTMLDivElement | null>(null)

  const onCanvasUpdate = useCallback((update: CanvasUpdate) => {
    if (update.prop === "shapes") {
      const shapes = update.val;
      setShapes(shapes);
    }
  }, [])

  useShapeShop(annotationLayerRef, shape, onCanvasUpdate);

  return (
    <div className="annotation-layer" ref={annotationLayerRef}>
      <svg height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" className="svg">
        {shapes.map((shape, index) => (
          <RenderShape key={index} shape={shape} />
        ))}
      </svg>
    </div>
  );
}

type RenderShapeProps = {
  shape: Shape
}
function RenderShape({ shape }: RenderShapeProps) {

  const defaultProps = {
    stroke: "grey",
    fill: "none",
    strokeLinecap: "round" as "round",
    strokeWidth: 10
  }

  if (shape.type === ShapeType.Path) {
    if (shape.points.length === 1) {
      return <circle cx={shape.points[0][0]} cy={shape.points[0][1]} r={5} {...defaultProps} fill="grey" strokeWidth={undefined} />;
    }

    const pathData = generatePathData(shape.points);
    return <path d={pathData} {...defaultProps} />
  }

  if (shape.type === ShapeType.Rect) {
    if (shape.points.length === 1) {
      const origin = shape.points[0];
      return <rect x={origin[0]} y={origin[1]} width={1} height={1} {...defaultProps} />
    }
    const rectData = generateRectData(shape.points as [Point, Point]);
    return <rect x={rectData.x} y={rectData.y} width={rectData.width || 1} height={rectData.height || 1} {...defaultProps} />
  }

  if (shape.type === ShapeType.Line) {
    if (shape.points.length === 1) {
      const [x, y] = shape.points[0];
      return <line x1={x} y1={y} x2={x + 1} y2={y + 2} {...defaultProps} />
    }
    const { x1, y1, x2, y2 } = generateLineData(shape.points as [Point, Point]);
    return <line x1={x1} y1={y1} x2={x2} y2={y2} {...defaultProps} />
  }

  return null
}

export default Canvas;
