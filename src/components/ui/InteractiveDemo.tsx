'use client';

import * as React from "react";

/* ---------- Types ---------- */
type FurnitureType =
  | "Bed" | "Desk" | "Chair" | "Dresser" | "Bookshelf"
  | "Nightstand" | "Lamp" | "Rug" | "Plant";

interface Piece {
  id: number;
  type: FurnitureType;
  x: number;
  y: number;
  color: string;
  rot?: 0 | 90 | 180 | 270;
  z?: number;
}

/* ---------- Visual constants ---------- */
const OUTLINE = "#6b5f58";
const BRAND = "#6f0500";
const SWATCHES = ["#E6E6E6", "#EAE4D9", "#DFE9DA", "#DDE7F5", "#FCE2D9", "#CDC2AE", "#FFFFFF", "#DDD8CF"];
const GRID_SIZE = 10;

/* ---------- Helpers ---------- */
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const snap = (n: number, g = GRID_SIZE) => Math.round(n / g) * g;

function sizeOf(t: FurnitureType) {
  switch (t) {
    case "Bed": return { w: 180, h: 100 };
    case "Desk": return { w: 150, h: 80 };
    case "Chair": return { w: 80, h: 80 };
    case "Dresser": return { w: 120, h: 90 };
    case "Bookshelf": return { w: 90, h: 150 };
    case "Nightstand": return { w: 70, h: 60 };
    case "Lamp": return { w: 50, h: 90 };
    case "Rug": return { w: 220, h: 140 };
    default: return { w: 80, h: 80 };
  }
}

function rotatedSize(t: FurnitureType, rot?: 0 | 90 | 180 | 270) {
  const { w, h } = sizeOf(t);
  return rot === 90 || rot === 270 ? { w: h, h: w } : { w, h };
}

function overlaps(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
}

/* ---------- SVG furniture ---------- */
const FurnitureSVG = ({ type, fill }: { type: FurnitureType; fill: string }) => {
  switch (type) {
    case "Bed":
      return (
        <svg viewBox="0 0 180 100" width="100%" height="100%">
          <rect x="3" y="3" width="174" height="94" rx="12" fill={fill} stroke={OUTLINE} strokeWidth="2" />
          <rect x="3" y="3" width="174" height="18" rx="10" fill="#fff" opacity=".5" />
          <rect x="12" y="22" width="48" height="24" rx="6" fill="#fff" stroke={OUTLINE} strokeWidth="1.5" />
        </svg>
      );
    case "Desk":
      return (
        <svg viewBox="0 0 150 80" width="100%" height="100%">
          <rect x="4" y="10" width="142" height="20" rx="6" fill={fill} stroke={OUTLINE} strokeWidth="2" />
          <rect x="10" y="30" width="8" height="40" fill={OUTLINE} opacity=".7" />
          <rect x="132" y="30" width="8" height="40" fill={OUTLINE} opacity=".7" />
        </svg>
      );
    case "Chair":
      return (
        <svg viewBox="0 0 80 80" width="100%" height="100%">
          <rect x="22" y="8" width="36" height="18" rx="4" fill={fill} stroke={OUTLINE} strokeWidth="2" />
          <rect x="18" y="30" width="44" height="18" rx="4" fill={fill} stroke={OUTLINE} strokeWidth="2" />
        </svg>
      );
    case "Rug":
      return (
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <rect x="2" y="2" width="216" height="136" rx="16" fill={fill} stroke={OUTLINE} strokeWidth="2" />
          <rect x="18" y="18" width="184" height="104" rx="12" fill="#fff" opacity=".12" />
        </svg>
      );
    case "Plant":
      return (
        <svg viewBox="0 0 80 80" width="100%" height="100%">
          <rect x="28" y="46" width="24" height="18" rx="4" fill={fill} stroke={OUTLINE} strokeWidth="2" />
          <rect x="28" y="46" width="24" height="4" fill="#654" opacity=".3" />
        </svg>
      );
    default:
      return (
        <rect width="100%" height="100%" rx="8" fill={fill} stroke={OUTLINE} strokeWidth="2" />
      );
  }
};

/* ---------- Initial layout ---------- */
const INITIAL: Piece[] = [
  { id: 1, type: "Bed", x: 40, y: 40, color: "#EAE4D9" },
  { id: 2, type: "Desk", x: 260, y: 40, color: "#DFE9DA" },
  { id: 3, type: "Chair", x: 40, y: 180, color: "#DDE7F5" },
  { id: 4, type: "Plant", x: 260, y: 180, color: "#FCE2D9" },
];

/* ---------- Component ---------- */
export default function InteractiveDemo() {
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [pieces, setPieces] = React.useState<Piece[]>(INITIAL);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const idCounter = React.useRef(5);

  const [canvasWH, setCanvasWH] = React.useState({ w: 0, h: 0 });
  React.useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCanvasWH({ w: r.width, h: r.height });
  }, []);

  const dragInfo = React.useRef<{ id: number | null; ox: number; oy: number }>({ id: null, ox: 0, oy: 0 });

  const onPieceDown = (e: React.PointerEvent<HTMLDivElement>, piece: Piece) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    dragInfo.current = { id: piece.id, ox: e.clientX - rect.left, oy: e.clientY - rect.top };
    setSelectedId(piece.id);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    e.stopPropagation();
  };

  const onCanvasMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragInfo.current;
    if (!d.id) return;
    const cRect = (canvasRef.current as HTMLDivElement).getBoundingClientRect();
    const piece = pieces.find(p => p.id === d.id)!;
    const { w, h } = rotatedSize(piece.type, piece.rot || 0);
    let nx = e.clientX - cRect.left - d.ox;
    let ny = e.clientY - cRect.top - d.oy;
    nx = snap(clamp(nx, 0, cRect.width - w));
    ny = snap(clamp(ny, 0, cRect.height - h));
    setPieces(p => p.map(x => (x.id === d.id ? { ...x, x: nx, y: ny } : x)));
  };

  const onCanvasUp = () => { dragInfo.current = { id: null, ox: 0, oy: 0 }; };
  const onCanvasDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSelectedId(null);
  };

  const addPiece = (t: FurnitureType) => {
    const { w, h } = sizeOf(t);
    const id = idCounter.current++;
    const x = clamp(30 + id * 10, 0, canvasWH.w - w);
    const y = clamp(30 + id * 10, 0, canvasWH.h - h);
    setPieces(p => [...p, { id, type: t, x, y, color: SWATCHES[id % SWATCHES.length], rot: 0 }]);
    setSelectedId(id);
  };

  const reset = () => { setPieces(INITIAL); setSelectedId(null); };
  const del = () => { if (!selectedId) return; setPieces(p => p.filter(x => x.id !== selectedId)); setSelectedId(null); };
  const rotate = () => { if (!selectedId) return; setPieces(p => p.map(x => x.id === selectedId ? { ...x, rot: (((x.rot || 0) + 90) % 360) as 0 | 90 | 180 | 270 } : x)); };
  const updateColor = (id: number, c: string) => setPieces(p => p.map(x => x.id === id ? { ...x, color: c } : x));

  const selected = selectedId != null ? pieces.find(p => p.id === selectedId) : null;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-bold tracking-tight">Interactive Dorm Designer</h2>
        <div className="flex flex-wrap gap-2">
          {(["Bed", "Desk", "Chair", "Dresser", "Bookshelf", "Nightstand", "Lamp", "Rug", "Plant"] as FurnitureType[]).map(t => (
            <button key={t} onClick={() => addPiece(t)} className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50" style={{ borderColor: "#d9d9d9" }}>
              + {t}
            </button>
          ))}
          <button onClick={reset} className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50" style={{ borderColor: "#d9d9d9" }}>Reset</button>
          <button onClick={del} disabled={!selected} className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50" style={{ borderColor: "#d9d9d9" }}>Delete</button>
          <button onClick={rotate} disabled={!selected} className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50" style={{ borderColor: "#d9d9d9" }}>Rotate 90°</button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative w-full h-[420px] rounded-xl border bg-white shadow-inner"
        style={{
          overflow: "hidden",
          borderColor: "#d9d9d9",
          backgroundImage:
            `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
             linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
        onPointerDown={onCanvasDown}
        onPointerMove={onCanvasMove}
        onPointerUp={onCanvasUp}
        onPointerLeave={onCanvasUp}
      >
        {pieces.map(piece => {
          const { w, h } = rotatedSize(piece.type, piece.rot || 0);
          return (
            <div
              key={piece.id}
              onPointerDown={(e) => onPieceDown(e, piece)}
              style={{
                position: "absolute",
                left: piece.x,
                top: piece.y,
                width: w,
                height: h,
                transform: `rotate(${piece.rot || 0}deg)`,
                transformOrigin: "top left",
                zIndex: selectedId === piece.id ? 10 : 1,
                cursor: "grab",
                userSelect: "none",
              }}
            >
              <div
                className="h-full w-full rounded-md"
                style={{
                  background: piece.color,
                  border: `1.5px solid ${OUTLINE}`,
                  boxShadow: "0 1px 0 rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.25)",
                  outline: selectedId === piece.id ? `2px solid ${BRAND}` : "none",
                }}
              >
                <FurnitureSVG type={piece.type} fill={piece.color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 