'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

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
  scale?: number;   // size multiplier
  z?: number;       // stacking order
}

/* ---------- Visual constants ---------- */
const OUTLINE   = "#6b5f58";
const BRAND     = "#6f0500";
const SWATCHES  = ["#E6E6E6","#EAE4D9","#DFE9DA","#DDE7F5","#FCE2D9","#CDC2AE","#FFFFFF","#DDD8CF"];
const GRID_SIZE = 10;
const SCALE_MIN = 0.6;
const SCALE_MAX = 1.8;

/* ---------- Fixed “world” size (wide / horizontal) ---------- */
const ROOM_W = 1200;
const ROOM_H = 360;

/* ---------- Helpers ---------- */
const clamp = (n:number,min:number,max:number)=>Math.max(min,Math.min(max,n));
const snap  = (n:number,g=GRID_SIZE)=>Math.round(n/g)*g;
function magnet(n:number, snapTo:number, threshold=12){ return Math.abs(n - snapTo) <= threshold ? snapTo : n; }

function baseSize(t:FurnitureType){
  switch(t){
    case "Bed":       return { w:240, h:130 };
    case "Desk":      return { w:170, h: 90 };
    case "Chair":     return { w: 80, h: 80 };
    case "Dresser":   return { w:130, h: 95 };
    case "Bookshelf": return { w: 90, h:160 };
    case "Nightstand":return { w: 70, h: 60 };
    case "Lamp":      return { w: 60, h:100 };
    case "Rug":       return { w:300, h:180 };
    case "Plant":     return { w: 90, h:120 };
    default:          return { w: 80, h: 80 };
  }
}
function sized(t:FurnitureType, rot:0|90|180|270=0, scale=1){
  const { w, h } = baseSize(t);
  const W = Math.round(w * scale);
  const H = Math.round(h * scale);
  return (rot===90 || rot===270) ? { w:H, h:W } : { w:W, h:H };
}

/* ---------- SVG furniture ---------- */
const BedSVG=({fill}:{fill:string})=>(
  <svg viewBox="0 0 240 130" width="100%" height="100%">
    <defs>
      <linearGradient id="bed-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity=".15"/>
        <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="234" height="124" rx="14" fill={fill} stroke={OUTLINE} strokeWidth="2.5"/>
    <rect x="3" y="3" width="234" height="26" rx="14" fill="#fff" opacity=".45"/>
    <rect x="18" y="34" width="90" height="28" rx="8" fill="#fff" stroke={OUTLINE} strokeWidth="1.5" opacity=".9"/>
    <rect x="112" y="34" width="90" height="28" rx="8" fill="#fff" stroke={OUTLINE} strokeWidth="1.5" opacity=".9"/>
    <rect x="3" y="3" width="234" height="80" rx="14" fill="url(#bed-grad)"/>
  </svg>
);
const DeskSVG=({fill}:{fill:string})=>(
  <svg viewBox="0 0 170 90" width="100%" height="100%">
    <rect x="5" y="12" width="160" height="22" rx="6" fill={fill} stroke={OUTLINE} strokeWidth="2.5"/>
    <rect x="16"  y="35" width="10" height="50" rx="2" fill={OUTLINE} opacity=".7"/>
    <rect x="144" y="35" width="10" height="50" rx="2" fill={OUTLINE} opacity=".7"/>
    <rect x="64" y="40" width="42" height="20" rx="4" fill="#fff" opacity=".35" stroke={OUTLINE} strokeWidth="1"/>
    <circle cx="85" cy="50" r="2.5" fill={OUTLINE} opacity=".7"/>
  </svg>
);
const ChairSVG=({fill}:{fill:string})=>(
  <svg viewBox="0 0 80 80" width="100%" height="100%">
    <rect x="22" y="6" width="36" height="20" rx="5" fill={fill} stroke={OUTLINE} strokeWidth="2"/>
    <rect x="16" y="32" width="48" height="18" rx="5" fill={fill} stroke={OUTLINE} strokeWidth="2"/>
    <rect x="20" y="52" width="6" height="22" rx="2" fill={OUTLINE} opacity=".6"/>
    <rect x="54" y="52" width="6" height="22" rx="2" fill={OUTLINE} opacity=".6"/>
  </svg>
);
const DresserSVG=({fill}:{fill:string})=>(
  <svg viewBox="0 0 130 95" width="100%" height="100%">
    <rect x="5" y="8" width="120" height="80" rx="8" fill={fill} stroke={OUTLINE} strokeWidth="2.5"/>
    <rect x="12" y="22" width="104" height="18" rx="4" fill="#fff" opacity=".35"/>
    <circle cx="64" cy="31" r="2.5" fill={OUTLINE} opacity=".6"/>
    <rect x="12" y="48" width="104" height="18" rx="4" fill="#fff" opacity=".35"/>
    <circle cx="64" cy="57" r="2.5" fill={OUTLINE} opacity=".6"/>
  </svg>
);
const BookshelfSVG=({fill}:{fill:string})=>(
  <svg viewBox="0 0 90 160" width="100%" height="100%">
    <rect x="5" y="5" width="80" height="150" rx="8" fill={fill} stroke={OUTLINE} strokeWidth="2.5"/>
    <line x1="10" y1="44" x2="80" y2="44" stroke={OUTLINE} opacity=".4" strokeWidth="2"/>
    <line x1="10" y1="84" x2="80" y2="84" stroke={OUTLINE} opacity=".4" strokeWidth="2"/>
    <line x1="10" y1="124" x2="80" y2="124" stroke={OUTLINE} opacity=".4" strokeWidth="2"/>
  </svg>
);
const NightstandSVG=({fill}:{fill:string})=>(
  <svg viewBox="0 0 70 60" width="100%" height="100%">
    <rect x="5" y="8" width="60" height="44" rx="8" fill={fill} stroke={OUTLINE} strokeWidth="2.5"/>
    <rect x="12" y="18" width="46" height="14" rx="3" fill="#fff" opacity=".35"/>
  </svg>
);
const LampSVG=({fill}:{fill:string})=>(
  <svg viewBox="0 0 60 100" width="100%" height="100%">
    <rect x="10" y="10" width="40" height="26" rx="8" fill={fill} stroke={OUTLINE} strokeWidth="2.5"/>
    <rect x="29" y="36" width="2" height="48" fill={OUTLINE} opacity=".7"/>
    <rect x="18" y="86" width="24" height="6" rx="2" fill={OUTLINE} opacity=".6"/>
  </svg>
);
const RugSVG=({fill}:{fill:string})=>(
  <svg viewBox="0 0 300 180" width="100%" height="100%">
    <defs>
      <pattern id="rug-hatch" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M0,10 10,0" stroke="#000" strokeOpacity=".05" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect x="3" y="3" width="294" height="174" rx="20" fill={fill} stroke={OUTLINE} strokeWidth="2.5"/>
    <rect x="20" y="20" width="260" height="140" rx="14" fill="url(#rug-hatch)" />
  </svg>
);
const PlantSVG=({fill}:{fill:string})=>(
  <svg viewBox="0 0 90 120" width="100%" height="100%">
    <rect x="28" y="78" width="34" height="22" rx="6" fill={fill} stroke={OUTLINE} strokeWidth="2.5"/>
    <rect x="44" y="40" width="2" height="40" rx="1" fill={OUTLINE} opacity=".6"/>
    <ellipse cx="44" cy="52" rx="18" ry="10" fill={fill} stroke={OUTLINE} strokeWidth="2"/>
    <ellipse cx="60" cy="64" rx="16" ry="9"  fill={fill} stroke={OUTLINE} strokeWidth="2"/>
    <ellipse cx="28" cy="64" rx="16" ry="9"  fill={fill} stroke={OUTLINE} strokeWidth="2"/>
  </svg>
);
function FurnitureSVG({type,fill}:{type:FurnitureType;fill:string}){
  switch(type){
    case "Bed":       return <BedSVG fill={fill}/>;
    case "Desk":      return <DeskSVG fill={fill}/>;
    case "Chair":     return <ChairSVG fill={fill}/>;
    case "Dresser":   return <DresserSVG fill={fill}/>;
    case "Bookshelf": return <BookshelfSVG fill={fill}/>;
    case "Nightstand":return <NightstandSVG fill={fill}/>;
    case "Lamp":      return <LampSVG fill={fill}/>;
    case "Rug":       return <RugSVG fill={fill}/>;
    default:          return <PlantSVG fill={fill}/>;
  }
}

/* ---------- Initial layout ---------- */
const INITIAL: Piece[]=[
  {id:1,type:"Rug",       x:20,  y:20,  color:"#EAE4D9", scale:1.0, z:0},
  {id:2,type:"Bed",       x:40,  y:40,  color:"#EAE4D9", scale:1.0, z:2},
  {id:3,type:"Desk",      x:320, y:40,  color:"#DFE9DA", scale:1.0, z:2},
  {id:4,type:"Chair",     x:320, y:150, color:"#DDE7F5", scale:1.0, z:2},
  {id:5,type:"Plant",     x:80,  y:180, color:"#FCE2D9", scale:1.0, z:1},
];

/* ---------- Presets ---------- */
function presetCozySuite(canvasW: number, canvasH: number): Piece[] {
  const m = 24;
  const base = (id: number, p: Partial<Piece>) =>
    ({ id, x: 0, y: 0, color: "#EAE4D9", scale: 1, rot: 0, z: 2, ...p }) as Piece;

  const rugBaseW = 300, rugBaseH = 180;
  const rugScale = Math.min((canvasW - m * 2) / rugBaseW * 0.9, (canvasH - m * 2) / rugBaseH * 0.75);

  return [
    base(1, { type: "Rug", color:"#EAE4D9", z:0, scale: rugScale,
      x: Math.round((canvasW - rugBaseW * rugScale) / 2),
      y: Math.round((canvasH - rugBaseH * rugScale) / 2) }),
    base(2, { type: "Bed",        x: m,                y: m + 28 }),
    base(3, { type: "Nightstand", color:"#FFFFFF",     x: m + 210,         y: m + 46 }),
    base(4, { type: "Desk",       color:"#DFE9DA",     x: canvasW - 170 - m, y: canvasH - 90 - m }),
    base(5, { type: "Chair",      color:"#DDE7F5",     x: canvasW - 170 - m - 90, y: canvasH - 80 - m }),
    base(6, { type: "Dresser",    color:"#E6E6E6",     x: canvasW - 130 - m, y: m }),
    base(7, { type: "Bookshelf",  color:"#DDD8CF",     x: m,                y: canvasH - 160 - m, z:1 }),
    base(8, { type: "Lamp",       color:"#CDC2AE",     x: m + 220,          y: m + 6 }),
    base(9, { type: "Plant",      color:"#FCE2D9",     x: Math.round(canvasW/2 - 45), y: canvasH - 120 - m, z:1 }),
  ];
}
function presetStudyFocus(canvasW: number, canvasH: number): Piece[] {
  const m = 24;
  const base = (id: number, p: Partial<Piece>) =>
    ({ id, x: 0, y: 0, color: "#EAE4D9", scale: 1, rot: 0, z: 2, ...p }) as Piece;

  const rugScale = Math.min((canvasW - m * 2) / 300 * 0.85, (canvasH - m * 2) / 180 * 0.55);

  return [
    base(1, { type: "Rug",       color:"#DFE9DA", z:0, scale: rugScale,
      x: Math.round(canvasW*0.52 - (300*rugScale)/2),
      y: Math.round(canvasH*0.55 - (180*rugScale)/2) }),
    base(2, { type: "Bed",       x: m,                y: canvasH - 130 - m }),
    base(3, { type: "Nightstand",color:"#FFFFFF",     x: m + 210,          y: canvasH - 120 - m }),
    base(4, { type: "Desk",      color:"#DFE9DA",     x: canvasW - 170 - m, y: m + 20 }),
    base(5, { type: "Chair",     color:"#DDE7F5",     x: canvasW - 170 - m - 90, y: m + 30 }),
    base(6, { type: "Bookshelf", color:"#DDD8CF",     x: canvasW*0.52 - 45, y: m, z:1 }),
    base(7, { type: "Dresser",   color:"#E6E6E6",     x: canvasW*0.52 - 65, y: canvasH - 95 - m }),
    base(8, { type: "Lamp",      color:"#CDC2AE",     x: canvasW - 70 - m,  y: canvasH - 100 - m }),
    base(9, { type: "Plant",     color:"#FCE2D9",     x: m + 10,            y: m + 6, z:1 }),
  ];
}
function presetLShape(canvasW: number, canvasH: number): Piece[] {
  const m = 24;
  const base = (id: number, p: Partial<Piece>) =>
    ({ id, x: 0, y: 0, color: "#EAE4D9", scale: 1, rot: 0, z: 2, ...p }) as Piece;

  const rugScale = Math.min((canvasW - m * 2) / 300 * 0.8, (canvasH - m * 2) / 180 * 0.6);

  return [
    base(1, { type: "Rug",       color:"#EAE4D9", z:0, scale: rugScale,
      x: m + 20, y: Math.round(canvasH/2 - (180*rugScale)/2) }),
    base(2, { type: "Bed",       x: canvasW - 240 - m, y: m }),
    base(3, { type: "Nightstand",color:"#FFFFFF",      x: canvasW - 240 - m - 80, y: m + 16 }),
    base(4, { type: "Desk",      color:"#DFE9DA",      x: m,                   y: canvasH - 90 - m }),
    base(5, { type: "Chair",     color:"#DDE7F5",      x: m + 180,             y: canvasH - 80 - m }),
    base(6, { type: "Dresser",   color:"#E6E6E6",      x: canvasW - 130 - m,   y: canvasH - 95 - m }),
    base(7, { type: "Bookshelf", color:"#DDD8CF",      x: canvasW - 90 - m,    y: Math.round(canvasH/2 - 80), z:1 }),
    base(8, { type: "Lamp",      color:"#CDC2AE",      x: canvasW - 70 - m,    y: m + 8 }),
    base(9, { type: "Plant",     color:"#FCE2D9",      x: m + 10,              y: m + 6, z:1 }),
  ];
}

/* ---------- Small resize handle for rugs ---------- */
function ResizeHandle({ onDrag }: { onDrag: (dx:number, dy:number)=>void }) {
  const start = useRef<{x:number;y:number}|null>(null);
  return (
    <div
      onPointerDown={(e) => {
        start.current = { x: e.clientX, y: e.clientY };
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        e.stopPropagation();
      }}
      onPointerMove={(e) => {
        if (!start.current) return;
        const dx = e.clientX - start.current.x;
        const dy = e.clientY - start.current.y;
        onDrag(dx, dy);
        start.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={() => (start.current = null)}
      className="absolute bottom-1 right-1 h-4 w-4 rounded-sm border border-[#cfcfcf] bg-white shadow-sm"
      title="Resize"
      style={{ cursor: "nwse-resize" }}
    />
  );
}

/* ---------- Component ---------- */
export default function InteractiveDemo(){
  const viewportRef = useRef<HTMLDivElement>(null); // visible frame
  const [pieces,setPieces]=useState<Piece[]>(INITIAL);
  const [selectedId,setSelectedId]=useState<number|null>(null);
  const [draggingId,setDraggingId]=useState<number|null>(null);
  const idCounter=useRef(INITIAL.length + 1);
  const zCounter = useRef(Math.max(...INITIAL.map(p=>p.z ?? 0), 5));

  const [zoom, setZoom] = useState(1);
  useLayoutEffect(()=>{
    const el = viewportRef.current;
    if(!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setZoom(Math.min(1, r.width / ROOM_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  },[]);

  /* map client coords -> world coords */
  const clientToWorld = (clientX:number, clientY:number) => {
    const vRect = (viewportRef.current as HTMLDivElement).getBoundingClientRect();
    return { x: (clientX - vRect.left)/zoom, y: (clientY - vRect.top)/zoom };
  };

  const effSize = (piece: Piece, rot = piece.rot ?? 0, scale = piece.scale ?? 1) =>
    sized(piece.type, rot as 0|90|180|270, scale);

  /* Dragging with activation threshold (prevents accidental drags on tap) */
  const DRAG_THRESHOLD = 6; // world px
  const dragInfo=useRef<{id:number|null;ox:number;oy:number;active:boolean;sx:number;sy:number}>({
    id:null,ox:0,oy:0,active:false,sx:0,sy:0
  });

  const onPieceDown=(e:React.PointerEvent<HTMLDivElement>,piece:Piece)=>{
    const { x: wx, y: wy } = clientToWorld(e.clientX, e.clientY);
    dragInfo.current={
      id:piece.id,
      ox:wx-piece.x, oy:wy-piece.y,
      active:false,
      sx:wx, sy:wy
    };
    setSelectedId(piece.id);
    setDraggingId(piece.id);
    setPieces(p => p.map(it => it.id===piece.id ? {...it, z: ++zCounter.current} : it));
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    e.stopPropagation();
  };

  const onViewportMove=(e:React.PointerEvent<HTMLDivElement>)=>{
    const d=dragInfo.current;if(!d.id)return;
    const piece=pieces.find(p=>p.id===d.id)!;
    const {w,h}=effSize(piece);
    const { x: wx, y: wy } = clientToWorld(e.clientX, e.clientY);

    // Activate drag only after threshold
    if(!d.active){
      const dx = Math.abs(wx - d.sx);
      const dy = Math.abs(wy - d.sy);
      if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) return;
      d.active = true;
    }

    let nx = wx - d.ox;
    let ny = wy - d.oy;
    nx=snap(clamp(nx,0,ROOM_W - w));
    ny=snap(clamp(ny,0,ROOM_H - h));
    nx = magnet(nx, 0); ny = magnet(ny, 0);
    nx = magnet(nx, ROOM_W  - w);
    ny = magnet(ny, ROOM_H - h);
    setPieces(p=>p.map(x=>x.id===d.id?{...x,x:nx,y:ny}:x));
  };

  const onViewportUp=()=>{dragInfo.current={id:null,ox:0,oy:0,active:false,sx:0,sy:0};setDraggingId(null);};
  const onViewportDown=(e:React.PointerEvent<HTMLDivElement>)=>{
    if(e.target===e.currentTarget)setSelectedId(null);
  };

  /* Keyboard + On-screen nudge */
  const [nudgeBig,setNudgeBig] = useState(false); // ×4 toggle
  const doNudge = (dx:number,dy:number) => {
    if(selectedId==null) return;
    const step = (nudgeBig?4:1);
    const ndx = dx * GRID_SIZE * step;
    const ndy = dy * GRID_SIZE * step;
    setPieces(p=>p.map(it=>{
      if(it.id!==selectedId) return it;
      const {w,h}=effSize(it);
      return {
        ...it,
        x: clamp(snap(it.x+ndx), 0, Math.max(0, ROOM_W - w)),
        y: clamp(snap(it.y+ndy), 0, Math.max(0, ROOM_H - h)),
      };
    }));
  };

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if(selectedId==null) return;
      if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      const big = e.shiftKey;
      setNudgeBig(big);
      if(e.key==="ArrowLeft")  doNudge(-1,0);
      if(e.key==="ArrowRight") doNudge( 1,0);
      if(e.key==="ArrowUp")    doNudge( 0,-1);
      if(e.key==="ArrowDown")  doNudge( 0, 1);
    };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedId, nudgeBig]);

  /* Controls */
  const addPiece=(t:FurnitureType)=>{
    const id=idCounter.current++;
    const scale = 1.0;
    const { w, h } = sized(t, 0, scale);
    const x=clamp(30+id*8, 0, Math.max(0, ROOM_W-w));
    const y=clamp(30+id*8, 0, Math.max(0, ROOM_H-h));
    setPieces(p=>[
      ...p,
      { id, type:t, x, y, color:SWATCHES[id%SWATCHES.length], rot:0, scale, z: ++zCounter.current }
    ]);
    setSelectedId(id);
  };

  const reset=()=>{ setPieces(INITIAL.map(p=>({ ...p }))); setSelectedId(null); };
  const del=()=>{ if(!selectedId) return; setPieces(p=>p.filter(x=>x.id!==selectedId)); setSelectedId(null); };

  const rotate=()=>{ if(!selectedId) return;
    setPieces(p=>p.map(x=>{
      if(x.id!==selectedId) return x;
      const rot = (((x.rot||0)+90)%360) as 0|90|180|270;
      const { w, h } = sized(x.type, rot, x.scale ?? 1);
      return {
        ...x,
        rot,
        x: clamp(x.x, 0, Math.max(0, ROOM_W - w)),
        y: clamp(x.y, 0, Math.max(0, ROOM_H - h)),
      };
    }));
  };

  const bringForward = ()=> { if(!selectedId) return; setPieces(p => p.map(it => it.id===selectedId ? {...it, z: ++zCounter.current} : it)); };
  const sendBackward = ()=> { if(!selectedId) return; setPieces(p => p.map(it => it.id===selectedId ? {...it, z: (it.z ?? 0) - 1} : it)); };

  const updateColor=(id:number,c:string)=>setPieces(p=>p.map(x=>x.id===id?{...x,color:c}:x));

  const updateType=(id:number,t:FurnitureType)=>setPieces(p=>p.map(x=>{
    if(x.id!==id) return x;
    const scale = x.scale ?? 1;
    const { w, h } = sized(t, x.rot||0, scale);
    return {
      ...x,
      type:t,
      x: clamp(x.x, 0, Math.max(0, ROOM_W - w)),
      y: clamp(x.y, 0, Math.max(0, ROOM_H - h)),
    };
  }));

  const updateScale=(id:number,scale:number)=>setPieces(p=>p.map(x=>{
    if(x.id!==id) return x;
    const s = clamp(scale, SCALE_MIN, SCALE_MAX);
    const { w, h } = sized(x.type, x.rot||0, s);
    return {
      ...x,
      scale: s,
      x: clamp(x.x, 0, Math.max(0, ROOM_W - w)),
      y: clamp(x.y, 0, Math.max(0, ROOM_H - h)),
    };
  }));

  const selected=selectedId!=null?pieces.find(p=>p.id===selectedId):null;

  // Render order
  const renderList = useMemo(() => {
    const arr = [...pieces];
    arr.sort((a,b)=>{
      const arug = a.type === 'Rug' ? 0 : 1;
      const brug = b.type === 'Rug' ? 0 : 1;
      if (arug !== brug) return arug - brug;
      return (a.z ?? 0) - (b.z ?? 0);
    });
    return arr;
  }, [pieces]);

  /* utility: apply preset within world bounds */
  const applyPreset = (fn: (w:number,h:number)=>Piece[]) => {
    const preset = fn(ROOM_W, ROOM_H).map(p => {
      const { w, h } = sized(p.type, p.rot ?? 0, p.scale ?? 1);
      return {
        ...p,
        x: clamp(p.x, 0, Math.max(0, ROOM_W - w)),
        y: clamp(p.y, 0, Math.max(0, ROOM_H - h)),
      };
    });
    setPieces(preset); setSelectedId(null);
    idCounter.current = preset.length + 1;
    zCounter.current  = Math.max(...preset.map(p => p.z ?? 0)) + 1;
  };

  /* Simple on-screen Nudge Pad (touch friendly) */
  const NudgePad = () => (
    <div className="flex items-center gap-2">
      <button onClick={()=>setNudgeBig(b=>!b)}
        className={`rounded-md border px-2 py-1 text-xs ${nudgeBig?'bg-gray-100':''}`}
        style={{borderColor:"#d9d9d9"}}>Step ×{nudgeBig?4:1}</button>
      <div className="grid grid-cols-3 gap-1 select-none">
        <div />
        <button onPointerDown={(e)=>{e.preventDefault(); doNudge(0,-1);}} className="rounded-md border px-3 py-2" style={{borderColor:"#d9d9d9"}}>▲</button>
        <div />
        <button onPointerDown={(e)=>{e.preventDefault(); doNudge(-1,0);}} className="rounded-md border px-3 py-2" style={{borderColor:"#d9d9d9"}}>◀</button>
        <button onPointerDown={(e)=>{e.preventDefault();}}  className="rounded-md border px-3 py-2 opacity-60" style={{borderColor:"#d9d9d9"}}>•</button>
        <button onPointerDown={(e)=>{e.preventDefault(); doNudge(1,0);}}  className="rounded-md border px-3 py-2" style={{borderColor:"#d9d9d9"}}>▶</button>
        <div />
        <button onPointerDown={(e)=>{e.preventDefault(); doNudge(0,1);}}  className="rounded-md border px-3 py-2" style={{borderColor:"#d9d9d9"}}>▼</button>
        <div />
      </div>
    </div>
  );

  const [showControls, setShowControls] = useState(true);

  return(
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      {/* Toolbar (mobile: horizontal scroll) */}
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Interactive Dorm Designer</h2>
          <button
            onClick={()=>setShowControls(s=>!s)}
            className="ml-3 rounded-md border px-2 py-1 text-xs sm:text-sm hover:bg-gray-50"
            style={{borderColor:"#d9d9d9"}}
          >
            {showControls ? 'Hide Controls' : 'Show Controls'}
          </button>
        </div>

        {showControls && (
          <div className="mt-3 overflow-x-auto -mx-2 px-2">
            <div className="whitespace-nowrap flex gap-2">
              {(["Bed","Desk","Chair","Dresser","Bookshelf","Nightstand","Lamp","Rug","Plant"] as FurnitureType[]).map(t=>(
                <button
                  key={t}
                  onClick={()=>addPiece(t)}
                  className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50"
                  style={{borderColor:"#d9d9d9"}}
                >
                  + {t}
                </button>
              ))}
              <button onClick={reset} className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50" style={{borderColor:"#d9d9d9"}}>Reset</button>
              <button onClick={del} disabled={!selected} className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50" style={{borderColor:"#d9d9d9"}}>Delete</button>
              <button onClick={rotate} disabled={!selected} className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50" style={{borderColor:"#d9d9d9"}}>Rotate 90°</button>
              <button onClick={()=>{ if(!selected) return; setPieces(p => p.map(it => it.id===selected.id ? {...it, z: ++zCounter.current} : it)); }} disabled={!selected} className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50" style={{borderColor:"#d9d9d9"}}>Bring forward</button>
              <button onClick={()=>{ if(!selected) return; setPieces(p => p.map(it => it.id===selected.id ? {...it, z: (it.z ?? 0) - 1} : it)); }} disabled={!selected} className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50" style={{borderColor:"#d9d9d9"}}>Send backward</button>
              <button
                onClick={() => {
                  const data = JSON.stringify(pieces, null, 2);
                  navigator.clipboard.writeText(data);
                  alert("Layout copied to clipboard!");
                }}
                className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50"
                style={{ borderColor: "#d9d9d9" }}
              >
                Export
              </button>
              <label className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50 cursor-pointer" style={{ borderColor: "#d9d9d9" }}>
                Import
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const text = await file.text();
                    try {
                      const parsed = JSON.parse(text) as Piece[];
                      setPieces(parsed.map(p => ({ ...p })));
                      setSelectedId(null);
                    } catch {
                      alert("Invalid layout file.");
                    }
                  }}
                />
              </label>
              <button onClick={() => applyPreset(presetCozySuite)}  className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50" style={{ borderColor: "#d9d9d9" }}>Preset: Cozy</button>
              <button onClick={() => applyPreset(presetStudyFocus)} className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50" style={{ borderColor: "#d9d9d9" }}>Preset: Focus</button>
              <button onClick={() => applyPreset(presetLShape)}     className="inline-flex rounded-md border px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-50" style={{ borderColor: "#d9d9d9" }}>Preset: L-Shape</button>
            </div>
          </div>
        )}
      </div>

      {/* Inspector */}
      {selected&&showControls&&(
        <div className="mb-2 sm:mb-3 flex flex-wrap items-center gap-3 rounded-md border bg-white p-3 shadow-sm" style={{borderColor:"#d9d9d9"}} onPointerDown={(e)=>e.stopPropagation()}>
          <label className="text-xs text-[#555]">Type:</label>
          <select className="rounded border px-2 py-1 text-sm" style={{borderColor:"#d0c9bf"}}
            value={selected.type} onChange={e=>updateType(selected.id,e.target.value as FurnitureType)}>
            {(["Bed","Desk","Chair","Dresser","Bookshelf","Nightstand","Lamp","Rug","Plant"] as FurnitureType[]).map(t=><option key={t} value={t}>{t}</option>)}
          </select>

          <span className="ml-2 text-xs text-[#555]">Color:</span>
          {SWATCHES.map(c=>(
            <button key={c} onClick={()=>updateColor(selected.id,c)} className="h-6 w-6 rounded border" style={{background:c,borderColor:"#d0c9bf"}}/>
          ))}
          <input type="color" className="h-6 w-10 cursor-pointer" value={selected.color}
            onChange={(e)=>updateColor(selected.id,e.target.value)}/>

          <label className="ml-3 text-xs text-[#555]">Size:</label>
          <input
            type="range" min={SCALE_MIN} max={SCALE_MAX} step={0.1}
            value={selected.scale ?? 1}
            onChange={(e)=>updateScale(selected.id, parseFloat(e.target.value))}
          />
        </div>
      )}

      {/* Viewport / World */}
<div className="w-full px-2 sm:px-4">
  <div className="w-full flex flex-col items-center">
    {/* Canvas viewport */}
    <div
      ref={viewportRef}
      className="relative rounded-[18px] border bg-white shadow-inner"
      style={{
        width: '100%',
        maxWidth: ROOM_W,
        height: ROOM_H * zoom,
        overflow: "hidden",
        borderColor:"#e5e2dc",
        boxShadow:"inset 0 0 0 6px #f6f4ef, inset 0 0 0 1px #e5e2dc",
        touchAction: "none"
      }}
      onPointerDown={onViewportDown}
      onPointerMove={onViewportMove}
      onPointerUp={onViewportUp}
      onPointerLeave={onViewportUp}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width: ROOM_W,
          height: ROOM_H,
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          backgroundImage:
            `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
             linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize:`${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      >
        {renderList.map(piece=>{
          const {w,h}=effSize(piece);
          const isSelected = selectedId===piece.id;
          const isDragging = draggingId===piece.id;

          return(
            <div
              key={piece.id}
              onPointerDown={(e)=>onPieceDown(e,piece)}
              style={{
                position:"absolute",
                left:piece.x, top:piece.y, width:w, height:h,
                transform:`rotate(${piece.rot||0}deg)`,
                transformOrigin:"top left",
                zIndex:(piece.z ?? 0) + (isSelected ? 1000 : 0),
                userSelect:"none",
                cursor:"grab",
                transition: isDragging ? "none" : "transform .08s ease, box-shadow .12s ease"
              }}
            >
              <div
                className="h-full w-full rounded-md"
                style={{
                  background:piece.color,
                  border:`1.5px solid ${OUTLINE}`,
                  boxShadow: isSelected
                    ? "0 10px 24px rgba(0,0,0,.18), inset 0 0 0 2px "+BRAND
                    : "0 8px 18px rgba(0,0,0,.10), inset 0 0 0 1px rgba(255,255,255,.25)"
                }}
              >
                <div className={isDragging ? "scale-[1.01]" : "hover:scale-[1.01] transition-transform"} style={{height:"100%", width:"100%"}}>
                  <FurnitureSVG type={piece.type} fill={piece.color}/>
                </div>
              </div>

              {/* label */}
              <div
                className="hidden sm:block pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 text-[11px] text-[#666] bg-white/85 px-1 rounded"
                style={{border:"1px solid #eee"}}
              >
                {piece.type}
              </div>

              {/* live dimensions when selected */}
              {isSelected && (
                <div
                  className="hidden sm:block pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 text-[10px] text-[#8a8a8a] bg-white/90 px-1 rounded"
                  style={{ border: "1px solid #eee" }}
                >
                  {Math.round(w)}×{Math.round(h)} px
                </div>
              )}

              {/* resizable handle for Rug */}
              {piece.type==="Rug" && isSelected && (
                <ResizeHandle
                  onDrag={(dx,dy)=>{
                    const worldDx = dx / zoom;
                    const worldDy = dy / zoom;
                    setPieces(p => p.map(it=>{
                      if(it.id!==piece.id) return it;
                      const current = it.scale ?? 1;
                      const grow = (worldDx + worldDy) / 400;
                      const next  = clamp(current + grow, SCALE_MIN, SCALE_MAX);
                      const { w, h } = sized(it.type, it.rot ?? 0, next);
                      return {
                        ...it,
                        scale: next,
                        x: clamp(it.x, 0, Math.max(0, ROOM_W - w)),
                        y: clamp(it.y, 0, Math.max(0, ROOM_H - h)),
                      };
                    }));
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>

    {/* Nudge Pad BELOW the canvas */}
    {selected && (
      <div className="mt-2 sm:mt-3 flex justify-center">
        <div className="bg-white/95 backdrop-blur rounded-md border shadow-sm p-2"
             style={{borderColor:"#e5e2dc"}}>
          <div className="flex items-center gap-2">
            <button onClick={()=>setNudgeBig(b=>!b)}
              className={`rounded-md border px-2 py-1 text-xs ${nudgeBig?'bg-gray-100':''}`}
              style={{borderColor:"#d9d9d9"}}>Step ×{nudgeBig?4:1}</button>
            <div className="grid grid-cols-3 gap-1 select-none">
              <div />
              <button onPointerDown={(e)=>{e.preventDefault(); doNudge(0,-1);}} className="rounded-md border px-3 py-2" style={{borderColor:"#d9d9d9"}}>▲</button>
              <div />
              <button onPointerDown={(e)=>{e.preventDefault(); doNudge(-1,0);}} className="rounded-md border px-3 py-2" style={{borderColor:"#d9d9d9"}}>◀</button>
              <button onPointerDown={(e)=>{e.preventDefault();}}  className="rounded-md border px-3 py-2 opacity-60" style={{borderColor:"#d9d9d9"}}>•</button>
              <button onPointerDown={(e)=>{e.preventDefault(); doNudge(1,0);}}  className="rounded-md border px-3 py-2" style={{borderColor:"#d9d9d9"}}>▶</button>
              <div />
              <button onPointerDown={(e)=>{e.preventDefault(); doNudge(0,1);}}  className="rounded-md border px-3 py-2" style={{borderColor:"#d9d9d9"}}>▼</button>
              <div />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  );
}