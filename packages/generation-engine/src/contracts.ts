export type GenerationContext = {
  prompt: string;
  negativePrompt?: string;
  scene: unknown;
  sourceImage?: Blob;
  mask?: Blob;
  strength: number;
  width: number;
  height: number;
  seed?: number;
};

export type GenerationProgress = {
  requestId: string;
  phase: "queued" | "preparing" | "generating" | "decoding" | "complete" | "cancelled" | "error";
  progress: number;
  preview?: Blob;
  message?: string;
};

export interface GenerationJob {
  id: string;
  cancel(): void;
  subscribe(listener: (event: GenerationProgress) => void): () => void;
}

export interface ModelProvider {
  readonly id: string;
  readonly displayName: string;
  generate(context: GenerationContext): Promise<GenerationJob>;
}

export type GenerationPolicy = {
  debounceMs: number;
  maxConcurrentJobs: number;
  coalesceLiveUpdates: boolean;
};

export const DEFAULT_GENERATION_POLICY: GenerationPolicy = {
  debounceMs: 350,
  maxConcurrentJobs: 1,
  coalesceLiveUpdates: true,
};
