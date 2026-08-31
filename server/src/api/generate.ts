import type { VertexAITransport, VertexImageEvent, VertexImageRequest } from "../../../packages/model-providers/src/vertex-ai";

export async function streamGeneration(
  request: VertexImageRequest,
  transport: VertexAITransport,
  signal?: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const event of transport.generateImage(request, signal)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
          if (event.type === "complete" || event.type === "error") controller.close();
        }
      } catch (error) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", message: error instanceof Error ? error.message : "Generation failed" })}\n\n`));
        controller.close();
      }
    },
    cancel() { /* request cancellation is propagated by the caller's AbortSignal */ },
  });
}

export function sseHeaders(): Record<string, string> {
  return { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive" };
}

export type { VertexImageEvent };
