import React, { useState, useRef, useEffect } from 'react';
import { ResizableSection } from '../types';

interface ResizablePanelProps {
  section: ResizableSection;
  onResize: (width: number) => void;
  children: React.ReactNode;
}

export function ResizablePanel({ section, onResize, children }: ResizablePanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const delta = e.clientX - startXRef.current;
      const newWidth = Math.min(
        Math.max(startWidthRef.current + delta, section.minWidth),
        section.maxWidth
      );
      
      onResize(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, section.minWidth, section.maxWidth, onResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = section.width;
  };

  return (
    <div
      ref={panelRef}
      className="relative"
      style={{ width: section.width }}
    >
      {children}
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 hover:opacity-50"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}