export type HistoryCommand<T> = { before: T; after: T; label: string };

export class HistoryStack<T> {
  private undoStack: HistoryCommand<T>[] = [];
  private redoStack: HistoryCommand<T>[] = [];
  constructor(private readonly limit = 100) {}
  push(command: HistoryCommand<T>): void { this.undoStack.push(command); if (this.undoStack.length > this.limit) this.undoStack.shift(); this.redoStack = []; }
  undo(current: T): T | undefined { const command = this.undoStack.pop(); if (!command) return; this.redoStack.push(command); return command.before; }
  redo(current: T): T | undefined { const command = this.redoStack.pop(); if (!command) return; this.undoStack.push(command); return command.after; }
  clear(): void { this.undoStack=[]; this.redoStack=[]; }
  get canUndo(): boolean { return this.undoStack.length > 0; }
  get canRedo(): boolean { return this.redoStack.length > 0; }
}
