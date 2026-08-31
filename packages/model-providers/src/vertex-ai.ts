export type VertexImageRequest = {
  projectId: string;
  location: string;
  model: string;
  prompt: string;
  negativePrompt?: string;
  imageBase64?: string;
  maskBase64?: string;
  aspectRatio?: string;
  sampleCount?: number;
  seed?: number;
  guidanceScale?: number;
};

export type VertexImageEvent =
  | { type: "queued"; requestId: string }
  | { type: "generating"; requestId: string; progress?: number }
  | { type: "image"; requestId: string; data: string; mimeType: string }
  | { type: "complete"; requestId: string }
  | { type: "error"; requestId: string; message: string };

/**
 * Server-side Vertex AI adapter boundary.
 *
 * Authentication and the actual Vertex REST/gRPC transport belong on the server,
 * never in browser code. The adapter deliberately exposes async events so a
 * provider that offers intermediate previews can stream them without changing
 * the editor API. Providers that only return a final image emit generating then
 * complete.
 */
export interface VertexAITransport {
  generateImage(request: VertexImageRequest, signal?: AbortSignal): AsyncIterable<VertexImageEvent>;
}

export class VertexAIImageProvider {
  constructor(private readonly transport: VertexAITransport) {}

  async *generate(request: VertexImageRequest, signal?: AbortSignal): AsyncIterable<VertexImageEvent> {
    for await (const event of this.transport.generateImage(request, signal)) {
      yield event;
    }
  }
}
