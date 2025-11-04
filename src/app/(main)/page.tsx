"use client";

import { Canvas } from "@/components/core/canvas";
import { Toolbar } from "@/components/core/toolbar";

export default function HomePage() {
  return (
    <div className="relative flex-1 w-full h-full overflow-hidden">
      <Toolbar />
      <Canvas />
    </div>
  );
}
