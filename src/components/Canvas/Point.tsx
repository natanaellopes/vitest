import React from "react";
import { Point as PointType } from "./types";

type PointProps = {
  point: PointType;
}

export const Point: React.FC<PointProps> = ({ point }) => (
  <div className="points" style={{left: `${point.x - 7}px`, top: `${point.y - 7}px`}}></div>
);