import React, { useRef, useState, useEffect } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Box, Sparkles, Layers } from 'lucide-react';

interface Model3DViewerProps {
  modelType?: 'headphone' | 'watch' | 'sneaker' | 'laptop' | 'gadget' | 'sphere' | 'cube';
  productName?: string;
  accentColor?: string;
  autoRotateInit?: boolean;
}

export const Model3DViewer: React.FC<Model3DViewerProps> = ({
  modelType = 'headphone',
  productName = '3D Product Model',
  accentColor = '#6366f1',
  autoRotateInit = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState({ x: 15, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(autoRotateInit);
  const [renderMode, setRenderMode] = useState<'shaded' | 'wireframe' | 'exploded'>('shaded');

  const animFrameRef = useRef<number | null>(null);

  // Auto-rotation loop
  useEffect(() => {
    let lastTime = performance.now();
    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (autoRotate && !isDragging) {
        setRotation(prev => ({
          ...prev,
          y: (prev.y + delta * 25) % 360
        }));
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoRotate, isDragging]);

  // Render 3D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 300;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const radX = (rotation.x * Math.PI) / 180;
    const radY = (rotation.y * Math.PI) / 180;

    // 3D projection helper
    const project = (x: number, y: number, z: number) => {
      // Rotate Y
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate X
      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Perspective
      const fov = 450 * zoom;
      const distance = 500;
      const scale = fov / (distance + z2);

      return {
        px: cx + x1 * scale,
        py: cy + y2 * scale,
        z: z2,
        scale
      };
    };

    // Draw ambient floor grid / shadow
    ctx.save();
    ctx.beginPath();
    const shadowProj = project(0, 95, 0);
    const grad = ctx.createRadialGradient(shadowProj.px, shadowProj.py, 10, shadowProj.px, shadowProj.py, 120 * zoom);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.28)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.ellipse(shadowProj.px, shadowProj.py, 120 * zoom, 45 * zoom, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Model geometries generator
    const explodeOffset = renderMode === 'exploded' ? 35 : 0;

    if (modelType === 'headphone') {
      // 1. Headband arch
      ctx.save();
      ctx.lineWidth = renderMode === 'wireframe' ? 1.5 : 8 * zoom;
      ctx.strokeStyle = renderMode === 'wireframe' ? accentColor : '#334155';
      ctx.beginPath();
      for (let angle = 0; angle <= Math.PI; angle += 0.08) {
        const hx = Math.cos(angle) * 75;
        const hy = -Math.sin(angle) * 75 - explodeOffset;
        const pt = project(hx, hy, 0);
        if (angle === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.stroke();
      ctx.restore();

      // Top padding cushion
      ctx.save();
      ctx.lineWidth = 14 * zoom;
      ctx.strokeStyle = accentColor;
      ctx.beginPath();
      for (let angle = Math.PI * 0.25; angle <= Math.PI * 0.75; angle += 0.08) {
        const hx = Math.cos(angle) * 76;
        const hy = -Math.sin(angle) * 76 - explodeOffset;
        const pt = project(hx, hy, 0);
        if (angle === Math.PI * 0.25) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.stroke();
      ctx.restore();

      // Left and right earcups
      const cups = [
        { x: -75 - explodeOffset * 0.8, y: 15, z: 0, label: 'L' },
        { x: 75 + explodeOffset * 0.8, y: 15, z: 0, label: 'R' }
      ];

      cups.forEach(cup => {
        // Outer earcup cylinder
        const pCenter = project(cup.x, cup.y, cup.z);
        ctx.save();
        ctx.beginPath();
        ctx.arc(pCenter.px, pCenter.py, 32 * pCenter.scale, 0, Math.PI * 2);
        if (renderMode === 'shaded') {
          const cupGrad = ctx.createLinearGradient(pCenter.px - 30, pCenter.py - 30, pCenter.px + 30, pCenter.py + 30);
          cupGrad.addColorStop(0, '#1e293b');
          cupGrad.addColorStop(0.5, '#0f172a');
          cupGrad.addColorStop(1, accentColor);
          ctx.fillStyle = cupGrad;
          ctx.fill();
        }
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = renderMode === 'wireframe' ? 1.5 : 3;
        ctx.stroke();

        // Inner cushion ring
        ctx.beginPath();
        ctx.arc(pCenter.px, pCenter.py, 22 * pCenter.scale, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Center metal logo disc
        ctx.beginPath();
        ctx.arc(pCenter.px, pCenter.py, 9 * pCenter.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#cbd5e1';
        ctx.fill();
        ctx.restore();
      });
    } else if (modelType === 'watch') {
      // Smartwatch Case
      const ptCenter = project(0, 0, 0);
      const ptTopStrap = project(0, -90 - explodeOffset, 0);
      const ptBottomStrap = project(0, 90 + explodeOffset, 0);

      // Straps
      ctx.save();
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;

      // Top strap
      ctx.beginPath();
      const st1 = project(-28, -45, 0);
      const st2 = project(28, -45, 0);
      const st3 = project(24, -95 - explodeOffset, 0);
      const st4 = project(-24, -95 - explodeOffset, 0);
      ctx.moveTo(st1.px, st1.py);
      ctx.lineTo(st2.px, st2.py);
      ctx.lineTo(st3.px, st3.py);
      ctx.lineTo(st4.px, st4.py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Bottom strap
      ctx.beginPath();
      const sb1 = project(-28, 45, 0);
      const sb2 = project(28, 45, 0);
      const sb3 = project(24, 95 + explodeOffset, 0);
      const sb4 = project(-24, 95 + explodeOffset, 0);
      ctx.moveTo(sb1.px, sb1.py);
      ctx.lineTo(sb2.px, sb2.py);
      ctx.lineTo(sb3.px, sb3.py);
      ctx.lineTo(sb4.px, sb4.py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Watch Bezel
      ctx.beginPath();
      ctx.arc(ptCenter.px, ptCenter.py, 52 * ptCenter.scale, 0, Math.PI * 2);
      ctx.fillStyle = renderMode === 'shaded' ? '#0f172a' : 'transparent';
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4 * ptCenter.scale;
      ctx.stroke();

      // Display AMOLED screen
      ctx.beginPath();
      ctx.arc(ptCenter.px, ptCenter.py, 44 * ptCenter.scale, 0, Math.PI * 2);
      ctx.fillStyle = '#020617';
      ctx.fill();
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Watch hands / HUD Ring
      ctx.beginPath();
      ctx.arc(ptCenter.px, ptCenter.py, 34 * ptCenter.scale, -Math.PI / 2, Math.PI * 0.7);
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Digital time text
      ctx.font = `600 ${14 * ptCenter.scale}px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText('10:42', ptCenter.px, ptCenter.py + 4 * ptCenter.scale);

      // Rotating Crown Button
      const crown = project(54, 0, 0);
      ctx.beginPath();
      ctx.rect(crown.px - 3, crown.py - 6, 6, 12);
      ctx.fillStyle = '#cbd5e1';
      ctx.fill();
      ctx.restore();
    } else if (modelType === 'sneaker') {
      // 3D Sneaker silhouette & carbon plate
      ctx.save();
      const solePoints = [
        [-90, 45, 0],
        [-60, 40, 0],
        [20, 38, 0],
        [85, 25, 0],
        [95, 38, 0],
        [80, 50, 0],
        [-80, 52, 0]
      ];

      // Upper knit shape
      const upperPoints = [
        [-85, 42, 0],
        [-75, 10, 0],
        [-35, -5, 0],
        [15, -15, 0],
        [60, 5, 0],
        [90, 26, 0]
      ];

      // Fill upper
      ctx.beginPath();
      upperPoints.forEach((pt, i) => {
        const p = project(pt[0], pt[1] - explodeOffset, pt[2]);
        if (i === 0) ctx.moveTo(p.px, p.py);
        else ctx.lineTo(p.px, p.py);
      });
      ctx.closePath();
      ctx.fillStyle = renderMode === 'shaded' ? '#dc2626' : 'transparent';
      ctx.fill();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Carbon midsole
      ctx.beginPath();
      solePoints.forEach((pt, i) => {
        const p = project(pt[0], pt[1] + explodeOffset * 0.5, pt[2]);
        if (i === 0) ctx.moveTo(p.px, p.py);
        else ctx.lineTo(p.px, p.py);
      });
      ctx.closePath();
      ctx.fillStyle = renderMode === 'shaded' ? '#0f172a' : 'transparent';
      ctx.fill();
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Dynamic motion accent lines
      ctx.beginPath();
      const p1 = project(-30, 15, 10);
      const p2 = project(30, 10, 10);
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();
    } else {
      // Tech Gadget / Cube / Sphere holographic polyhedra
      ctx.save();
      const size = 50;
      const vertices = [
        [-size, -size, -size],
        [size, -size, -size],
        [size, size, -size],
        [-size, size, -size],
        [-size, -size, size],
        [size, -size, size],
        [size, size, size],
        [-size, size, size]
      ];

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // back
        [4, 5], [5, 6], [6, 7], [7, 4], // front
        [0, 4], [1, 5], [2, 6], [3, 7]  // connecting
      ];

      // Draw wireframe/shaded cube
      edges.forEach(([i, j]) => {
        const p1 = project(vertices[i][0], vertices[i][1], vertices[i][2]);
        const p2 = project(vertices[j][0], vertices[j][1], vertices[j][2]);

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = renderMode === 'wireframe' ? 1.5 : 2.5;
        ctx.stroke();
      });

      // Internal rotating energy orb
      const orbCenter = project(0, 0, 0);
      ctx.beginPath();
      ctx.arc(orbCenter.px, orbCenter.py, 18 * orbCenter.scale, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.fill();
      ctx.restore();
    }
  }, [rotation, zoom, renderMode, modelType, accentColor]);

  // Drag handlers for mouse & touch 360 rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: (prev.y + deltaX * 0.6) % 360
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMousePos.x;
    const deltaY = e.touches[0].clientY - lastMousePos.y;

    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: (prev.y + deltaX * 0.6) % 360
    }));

    setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] bg-gradient-to-b from-slate-100 to-slate-200/70 dark:from-slate-900 dark:to-slate-950 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between p-3 select-none group">
      {/* Top HUD Controls */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 backdrop-blur-md">
            <Sparkles className="w-3 h-3 animate-pulse" />
            3D Studio
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
            θ:{Math.round(rotation.y)}° φ:{Math.round(rotation.x)}°
          </span>
        </div>

        {/* Render mode selector */}
        <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-xs">
          <button
            type="button"
            onClick={() => setRenderMode('shaded')}
            title="Solid Shaded View"
            className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
              renderMode === 'shaded'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Shaded
          </button>
          <button
            type="button"
            onClick={() => setRenderMode('wireframe')}
            title="Wireframe Mesh View"
            className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
              renderMode === 'wireframe'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Wireframe
          </button>
          <button
            type="button"
            onClick={() => setRenderMode('exploded')}
            title="Exploded Component Matrix"
            className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
              renderMode === 'exploded'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Exploded
          </button>
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ touchAction: 'none' }}
        />

        {/* Drag Hint overlay on hover */}
        <div className="absolute bottom-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/70 text-white text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-md">
          Drag to orbit 360° | Scroll / Zoom
        </div>
      </div>

      {/* Bottom Tool Bar */}
      <div className="flex items-center justify-between z-10 pt-2 border-t border-slate-200/50 dark:border-slate-800/60">
        <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
          {productName}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
              autoRotate
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
            title={autoRotate ? 'Pause 3D rotation' : 'Start 3D rotation'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setZoom(prev => Math.min(1.8, prev + 0.15))}
            className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setZoom(prev => Math.max(0.6, prev - 0.15))}
            className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setRotation({ x: 15, y: 35 });
              setZoom(1);
            }}
            className="px-2 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
