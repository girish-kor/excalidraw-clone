'use client';

import { useRef, useEffect } from 'react';
import { useDrawing } from '@/hooks/use-drawing';
import { useCanvasStore } from '@/store/canvas-store';

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { elements } = useCanvasStore();

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDrawing(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redrawCanvas();
    };

    const redrawCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      elements.forEach(({ path, color, size }) => {
        context.strokeStyle = color;
        context.lineWidth = size;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();
        path.forEach(([x, y], index) => {
          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.stroke();
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [elements]);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={(e) => handleMouseDown(e.touches[0])}
      onTouchMove={(e) => handleMouseMove(e.touches[0])}
      onTouchEnd={handleMouseUp}
      className="absolute top-0 left-0 w-full h-full bg-background z-0"
      aria-label="Drawing Canvas"
    />
  );
}
