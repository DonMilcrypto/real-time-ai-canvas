export type Point = { x: number; y: number };
export type RGBA = { r: number; g: number; b: number; a: number };

export type Stroke = {
  id: string;
  points: Point[];
  color: RGBA;
  width: number;
  opacity: number;
  tool: string;
};

export type Annotation = {
  id: string;
  type: "arrow" | "region" | "mask" | "text" | "note";
  geometry: Point[];
  label?: string;
  color?: RGBA;
  metadata?: Record<string, string | number | boolean>;
};

export type Layer = {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  strokes: Stroke[];
  annotations: Annotation[];
};

export type Scene = {
  version: 1;
  width: number;
  height: number;
  background: RGBA;
  layers: Layer[];
};

export function createScene(width = 1024, height = 1024): Scene {
  return {
    version: 1,
    width,
    height,
    background: { r: 247, g: 247, b: 245, a: 1 },
    layers: [{
      id: crypto.randomUUID(),
      name: "Artwork",
      visible: true,
      opacity: 1,
      strokes: [],
      annotations: [],
    }],
  };
}
