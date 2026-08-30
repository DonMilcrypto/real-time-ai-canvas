import type { Scene } from "../../canvas-engine/src/scene";

export type PromptContext = { prompt: string; negativePrompt?: string; scene: Scene };

export function compilePromptContext(input: PromptContext): string {
  const visibleLayers = input.scene.layers.filter((layer) => layer.visible);
  const annotations = visibleLayers.flatMap((layer) => layer.annotations);
  const semantic = annotations.map((a) => {
    const label = a.label ? `: ${a.label}` : "";
    return `${a.type}${label}`;
  });
  const guidance = semantic.length ? ` AI guidance: ${semantic.join(", ")}.` : "";
  return `${input.prompt.trim()}${guidance}`.trim();
}
