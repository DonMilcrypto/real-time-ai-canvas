export type PromptContext = {
  prompt: string;
  negativePrompt?: string;
  annotations: Array<{ type: string; label?: string }>;
  canvasDescription?: string;
};

export function compilePrompt(context: PromptContext) {
  const guidance = context.annotations.filter(a => a.label).map(a => `${a.type}: ${a.label}`).join("; ");
  return [context.prompt.trim(), context.canvasDescription?.trim(), guidance ? `Guidance: ${guidance}` : ""].filter(Boolean).join("\n\n");
}
