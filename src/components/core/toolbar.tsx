'use client';

import { useCanvasStore } from '@/store/canvas-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, MousePointer, Trash2, Undo, Redo } from 'lucide-react';
import { cn } from '@/lib/utils';

const COLORS = ['#000000', '#FF0000', '#0000FF', '#008000', '#FFFF00'];
const SIZES = [2, 4, 8, 12];

export function Toolbar() {
  const {
    tool, setTool,
    color, setColor,
    size, setSize,
    clear, undo, redo,
    canUndo, canRedo
  } = useCanvasStore();

  return (
    <TooltipProvider delayDuration={100}>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-card p-2 rounded-lg shadow-lg border flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={tool === 'select' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('select')}>
              <MousePointer className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Select</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={tool === 'draw' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('draw')}>
              <Pencil className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Draw</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="h-8" />
        <div className="flex items-center gap-1">
          {COLORS.map((c) => (
            <Tooltip key={c}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setColor(c)}
                  className={cn(
                    'w-6 h-6 rounded-full border-2 transition-transform transform hover:scale-110',
                    color === c ? 'border-primary scale-110' : 'border-transparent'
                  )}
                  style={{ backgroundColor: c }}
                  aria-label={`Set color to ${c}`}
                />
              </TooltipTrigger>
              <TooltipContent>{c}</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Separator orientation="vertical" className="h-8" />
        <div className="flex items-center gap-2">
          {SIZES.map((s) => (
            <Tooltip key={s}>
              <TooltipTrigger asChild>
                <Button variant={size === s ? 'secondary' : 'ghost'} size="icon" onClick={() => setSize(s)}>
                  <div className="rounded-full bg-foreground" style={{ width: s + 4, height: s + 4 }} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Size: {s}px</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Separator orientation="vertical" className="h-8" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo}>
              <Undo className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo}>
              <Redo className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="h-8" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" size="icon" onClick={clear}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear Canvas</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
