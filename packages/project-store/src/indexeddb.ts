import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export type ProjectRecord = {
  id: string;
  name: string;
  scene: unknown;
  prompt: string;
  updatedAt: number;
};

type Schema = DBSchema & { projects: { key: string; value: ProjectRecord; indexes: { updatedAt: number } } };

let database: Promise<IDBPDatabase<Schema>> | undefined;
function db() {
  database ??= openDB<Schema>("rtai-canvas", 1, { upgrade(d) { const store = d.createObjectStore("projects", { keyPath: "id" }); store.createIndex("updatedAt", "updatedAt"); } });
  return database;
}

export async function saveProject(project: ProjectRecord) { return (await db()).put("projects", project); }
export async function loadProject(id: string) { return (await db()).get("projects", id); }
export async function listProjects() { return (await db()).getAllFromIndex("projects", "updatedAt"); }
export async function deleteProject(id: string) { return (await db()).delete("projects", id); }
