import { useEffect, MutableRefObject, useCallback, useRef } from "react";
import { CanvasUpdate, ShapeShop, ShapeType } from "@shapeshop/core";

export default function useShapeShop<HTMLElement>(ref: MutableRefObject<HTMLElement>, shape: ShapeType, onCanvasUpdate?: (update: CanvasUpdate) => void) {
  const shapeshopRef = useRef<ShapeShop>() as MutableRefObject<ShapeShop>;

  useEffect(() => {
    return () => shapeshopRef.current.destroy();
  }, [])

  useEffect(() => {
    if (!!shape && !!shapeshopRef.current) {
      shapeshopRef.current.setShapeType(shape);
    }
  }, [shape])

  const _onCanvasUpdate = useCallback((update: CanvasUpdate) => {
    if (onCanvasUpdate !== undefined) {
      onCanvasUpdate(update);
    }
  }, [onCanvasUpdate]);

  useEffect(() => {
    const element = ref.current;
    if (isHtmlElment(element)) {
      shapeshopRef.current = new ShapeShop({el: castToHtmlElement(ref.current), defaultShape: shape, onCanvasUpdate: _onCanvasUpdate});
    }
  }, [ref, _onCanvasUpdate]);
}

function castToHtmlElement(obj: any) {
  if (isHtmlElment(obj)) {
    return obj;
  }

  throw new Error("NOT_HTML_ELEMENT");
}

function isHtmlElment(obj: any): obj is HTMLElement {
  return obj?.onmousedown !== undefined &&
  obj?.onmouseup !== undefined &&
  obj?.onmousemove !== undefined;
}