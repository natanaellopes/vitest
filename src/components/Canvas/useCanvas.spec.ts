import { renderHook, act } from '@testing-library/react-hooks';
import { useCanvas } from './useCanvas';

describe('useCanvas', () => {
  it('should add a point to the pointList on canvas click', () => {
    const { result } = renderHook(() => useCanvas());

    const mockEvent = {
      clientX: 50,
      clientY: 75,
    };

    act(() => {
      result.current.onCanvasClick(mockEvent as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.pointList).toHaveLength(1);
    expect(result.current.pointList[0]).toEqual({ x: 50, y: 75 });
  });

  it('should not add a duplicate point to the pointList on canvas click', () => {
    const { result } = renderHook(() => useCanvas());

    act(() => {
      result.current.onCanvasClick({ clientX: 50, clientY: 75 } as React.MouseEvent<HTMLElement>);
    });

    act(() => {
      result.current.onCanvasClick({ clientX: 50, clientY: 75 } as React.MouseEvent<HTMLElement>);
    });

    expect(result.current.pointList).toHaveLength(1);
  });
});
