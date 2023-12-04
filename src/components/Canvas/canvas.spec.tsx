import { it, describe, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { Canvas } from "./Canvas";

const setup = () => render(<Canvas />);
const user = userEvent.setup()

describe('Canvas', () => {
  const getCanvas = (container: HTMLElement) => container.querySelector('#canvas') as HTMLElement;
  const getPoints = (canvas: HTMLElement) => canvas.getElementsByClassName('points');


  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('O canvas não pode ter pontos quando inicia', () => {
    const { container } = setup();

    const canvas = getCanvas(container);

    const points = canvas?.getElementsByClassName('points');

    expect(points?.length).toBe(0);
  });

  it('Deve ser adicionado um ponto ao clicar no canvas', async () => {
    const { container } = setup();

    const canvas = getCanvas(container);

    await user.pointer({
      keys: '[MouseLeft]',
      target: canvas,
      coords: {
        x: 10,
        y: 10
      }
    });

    const points = getPoints(canvas);

    expect(points?.length).toBe(1);
    expect(points.item(0)).matchSnapshot();
  });

  it('Deve ser adicionados dois pontos ao clicar no canvas', async () => {
    const { container } = setup();

    const canvas = getCanvas(container);

    await user.pointer({
      keys: '[MouseLeft]',
      target: canvas,
      coords: {
        x: 10,
        y: 10
      }
    })

    await user.pointer({
      keys: '[MouseLeft]',
      target: canvas,
      coords: {
        x: 20,
        y: 20
      }
    })

    const points = getPoints(canvas);

    expect(points.length).toBe(2);

    expect(points.item(0)).matchSnapshot();
    expect(points.item(1)).matchSnapshot();
  });

  it('Não deve ser adicionado ponto repetido', async () => {
    const { container } = setup();

    const canvas = getCanvas(container);

    await user.pointer({
      keys: '[MouseLeft]',
      target: canvas,
      coords: {
        x: 10,
        y: 10
      }
    })

    await user.pointer({
      keys: '[MouseLeft]',
      target: canvas,
      coords: {
        x: 20,
        y: 20
      }
    })

    await user.pointer({
      keys: '[MouseLeft]',
      target: canvas,
      coords: {
        x: 20,
        y: 20
      }
    })

    const points = getPoints(canvas);

    expect(points.length).toBe(2);

    expect(points.item(2)).toBeNull();
  });

});