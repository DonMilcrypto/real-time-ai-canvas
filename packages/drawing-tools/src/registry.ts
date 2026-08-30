export type ToolKind =
  | "brush" | "pencil" | "pen" | "marker" | "highlighter" | "eraser"
  | "line" | "arrow" | "rectangle" | "ellipse" | "polygon"
  | "fill" | "select" | "pan" | "text" | "mask";

export type ToolDefinition = {
  id: ToolKind;
  label: string;
  shortcut?: string;
  semantic: "artwork" | "annotation" | "navigation";
};

export const TOOLS: ToolDefinition[] = [
  { id: "brush", label: "Brush", shortcut: "B", semantic: "artwork" },
  { id: "pencil", label: "Pencil", shortcut: "N", semantic: "artwork" },
  { id: "pen", label: "Pen", shortcut: "P", semantic: "artwork" },
  { id: "marker", label: "Marker", semantic: "artwork" },
  { id: "highlighter", label: "Highlighter", semantic: "annotation" },
  { id: "eraser", label: "Eraser", shortcut: "E", semantic: "artwork" },
  { id: "line", label: "Line", semantic: "artwork" },
  { id: "arrow", label: "Arrow", semantic: "annotation" },
  { id: "rectangle", label: "Rectangle", semantic: "artwork" },
  { id: "ellipse", label: "Ellipse", semantic: "artwork" },
  { id: "polygon", label: "Polygon", semantic: "artwork" },
  { id: "fill", label: "Fill", shortcut: "G", semantic: "artwork" },
  { id: "select", label: "Select", shortcut: "V", semantic: "navigation" },
  { id: "pan", label: "Pan", shortcut: "Space", semantic: "navigation" },
  { id: "text", label: "Text", shortcut: "T", semantic: "annotation" },
  { id: "mask", label: "Mask", semantic: "annotation" },
];
