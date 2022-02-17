import { Point } from './Engine';
import { bezierCommandCalc, svgPath } from './pathAlgorithms';

export const generatePathData = (path: Point[]) => {
  return svgPath(path, bezierCommandCalc);
}

type RectData = {
  x: number,
  y: number,
  width: number,
  height: number
}

export const generateRectData = (points: [Point, Point]): RectData => {
  // rects have two points. [0] is the origin [1] is the last pointer/cursor coord
  const oX = points[0][0];
  const oY = points[0][1];
  const deltaX = points[1][0] - oX;
  const deltaY = points[1][1] - oY;

  let height = deltaY;
  let width = deltaX;
  let y = oY;
  let x = oX;

  if (height < 0) {
    height = Math.abs(height);
    y = oY - height;
  }

  if (width < 0) {
    width = Math.abs(width);
    x = oX - width
  }

  return {
    x,
    y,
    width,
    height
  };
}

export const generateLineData = (points: [Point, Point]) => {
  const oX = points[0][0];
  const oY = points[0][1];
  const deltaX = points[1][0];
  const deltaY = points[1][1];

  return {
    x1: oX,
    y1: oY,
    x2: deltaX,
    y2: deltaY
  }
}