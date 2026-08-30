export type ProjectAsset = { id: string; kind: "source" | "generated" | "thumbnail" | "mask"; storageKey: string; mimeType: string; width?: number; height?: number };

export type GenerationRecord = {
  id: string;
  projectId: string;
  createdAt: string;
  prompt: string;
  negativePrompt?: string;
  providerId: string;
  modelId: string;
  seed?: number;
  strength: number;
  width: number;
  height: number;
  outputAssetId: string;
};

export type Project = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  scene: unknown;
  assets: ProjectAsset[];
  generations: GenerationRecord[];
};

export interface ProjectStore {
  get(id: string): Promise<Project | null>;
  save(project: Project): Promise<void>;
  delete(id: string): Promise<void>;
}
