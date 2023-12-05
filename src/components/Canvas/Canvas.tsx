import { Point } from "./Point";
import { useCanvas } from "./useCanvas";

export const Canvas = () => {
  const { onCanvasClick, pointList } = useCanvas();

  return (
    <div id="canvas" onClick={onCanvasClick} aria-hidden="true">
      {pointList.map(point => (
        <Point key={`${point.x}-${point.y}`} point={point} />
      ))}
    </div>
  );
}