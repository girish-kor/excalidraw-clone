'use client';

import { useState, RefObject } from 'react';
import { useCanvasStore } from '@/store/canvas-store';
import { DrawingElement } from '@/types';

interface MouseEventLike {
  clientX: number;
  clientY: number;
}

export const useDrawing = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const { tool, color, size, addElement } = useCanvasStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<[number, number][]>([]);

  const getCoordinates = (event: MouseEventLike): [number, number] | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
  };

  const handleMouseDown = (event: MouseEventLike) => {
    if (tool !== 'draw') return;
    setIsDrawing(true);
    const coords = getCoordinates(event);
    if (coords) {
      setCurrentPath([coords]);
    }
  };

  const handleMouseMove = (event: MouseEventLike) => {
    if (!isDrawing || tool !== 'draw') return;
    const coords = getCoordinates(event);
    if (coords) {
      setCurrentPath((prevPath) => [...prevPath, coords]);
      // For live drawing preview
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (context && currentPath.length > 1) {
        context.strokeStyle = color;
        context.lineWidth = size;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();
        context.moveTo(currentPath[currentPath.length - 2][0], currentPath[currentPath.length - 2][1]);
        context.lineTo(coords[0], coords[1]);
        context.stroke();
      }
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || tool !== 'draw' || currentPath.length === 0) return;
    setIsDrawing(false);
    const newElement: DrawingElement = {
      id: Date.now(),
      path: currentPath,
      color,
      size,
    };
    addElement(newElement);
    setCurrentPath([]);
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};
