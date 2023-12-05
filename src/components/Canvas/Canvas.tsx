import { useState } from 'react';
import { Point } from './types';

export const Canvas = () => {
  const [pointList, setPointList] = useState<Point[]>([]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLElement>) => {
    const isDuplicated = pointList.some(item => item.x === event.clientX && item.y === event.clientY);

    if (isDuplicated) {
      return;
    }

    setPointList(oldValue => ([...oldValue, {
      y: event.clientY,
      x: event.clientX
    }]));
  }

  return (
    <div id="canvas" onClick={handleCanvasClick} aria-hidden="true">
      {pointList.map(point => (
        <div key={`${point.x}-${point.y}`} className="points" style={{left: `${point.x - 7}px`, top: `${point.y - 7}px`}}></div>
      ))}
    </div>
  );
}