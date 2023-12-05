import { useState } from 'react';
import { Point } from './types';

export const useCanvas = () => {
  const [pointList, setPointList] = useState<Point[]>([]);

  const onCanvasClick = (event: React.MouseEvent<HTMLElement>) => {
    const isDuplicated = pointList.some(item => item.x === event.clientX && item.y === event.clientY);
  
    if (isDuplicated) {
      return;
    }
  
    setPointList(oldValue => ([...oldValue, {
      y: event.clientY,
      x: event.clientX
    }]));
  }

  return {
    pointList,
    onCanvasClick
  }
}

