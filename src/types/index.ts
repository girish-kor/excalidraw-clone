export type Tool = 'select' | 'draw';

export interface DrawingElement {
  id: number;
  path: [number, number][]; // Array of [x, y] coordinates
  color: string;
  size: number;
}
