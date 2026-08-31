export type ProjectRecord = { id: string; name: string; updatedAt: number; scene: unknown; settings: { width: number; height: number; background: string }; thumbnailAssetId?: string };

export interface ProjectStore { save(project: ProjectRecord): Promise<void>; get(id: string): Promise<ProjectRecord | undefined>; list(): Promise<ProjectRecord[]>; delete(id: string): Promise<void>; }

export class MemoryProjectStore implements ProjectStore {
  private projects = new Map<string, ProjectRecord>();
  async save(project: ProjectRecord) { this.projects.set(project.id, project); }
  async get(id: string) { return this.projects.get(id); }
  async list() { return [...this.projects.values()].sort((a,b)=>b.updatedAt-a.updatedAt); }
  async delete(id: string) { this.projects.delete(id); }
}
