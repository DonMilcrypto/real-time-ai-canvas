export type GenerationRecord = { id: string; createdAt: number; prompt: string; model: string; width: number; height: number; seed?: number; kind: "text-to-image" | "image-to-image"; sourceAssetId?: string; outputAssetId?: string; metadata?: Record<string, string | number | boolean> };

export interface GenerationHistoryStore { add(record: GenerationRecord): Promise<void>; list(limit?: number): Promise<GenerationRecord[]>; get(id: string): Promise<GenerationRecord | undefined>; remove(id: string): Promise<void>; }

export class MemoryGenerationHistory implements GenerationHistoryStore {
  private records: GenerationRecord[] = [];
  async add(record: GenerationRecord) { this.records.unshift(record); }
  async list(limit = 50) { return this.records.slice(0, limit); }
  async get(id: string) { return this.records.find(r => r.id === id); }
  async remove(id: string) { this.records = this.records.filter(r => r.id !== id); }
}
