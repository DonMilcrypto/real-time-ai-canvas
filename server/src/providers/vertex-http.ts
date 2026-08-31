import type { VertexAITransport, VertexImageEvent, VertexImageRequest } from "../../../packages/model-providers/src/vertex-ai";

export class VertexHttpTransport implements VertexAITransport {
  constructor(private readonly accessToken: () => Promise<string>) {}

  async *generateImage(request: VertexImageRequest, signal?: AbortSignal): AsyncIterable<VertexImageEvent> {
    const id = crypto.randomUUID();
    yield { type: "queued", requestId: id };
    try {
      const token = await this.accessToken();
      yield { type: "generating", requestId: id, progress: 0.05 };
      const endpoint = `https://${request.location}-aiplatform.googleapis.com/v1/projects/${encodeURIComponent(request.projectId)}/locations/${encodeURIComponent(request.location)}/publishers/google/models/${encodeURIComponent(request.model)}:predict`;
      const body: Record<string, unknown> = {
        instances: [{ prompt: request.prompt, ...(request.imageBase64 ? { image: { bytesBase64Encoded: request.imageBase64 } } : {}) }],
        parameters: {
          ...(request.negativePrompt ? { negativePrompt: request.negativePrompt } : {}),
          ...(request.aspectRatio ? { aspectRatio: request.aspectRatio } : {}),
          ...(request.sampleCount ? { sampleCount: request.sampleCount } : {}),
          ...(request.seed !== undefined ? { seed: request.seed } : {}),
          ...(request.guidanceScale !== undefined ? { guidanceScale: request.guidanceScale } : {}),
        },
      };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal,
      });
      if (!response.ok) throw new Error(`Vertex AI request failed (${response.status})`);
      const json = await response.json() as { predictions?: Array<{ bytesBase64Encoded?: string; mimeType?: string }> };
      yield { type: "generating", requestId: id, progress: 0.9 };
      for (const prediction of json.predictions ?? []) {
        if (prediction.bytesBase64Encoded) {
          yield { type: "image", requestId: id, data: prediction.bytesBase64Encoded, mimeType: prediction.mimeType ?? "image/png" };
        }
      }
      yield { type: "complete", requestId: id };
    } catch (error) {
      if (signal?.aborted) {
        yield { type: "error", requestId: id, message: "Generation cancelled" };
        return;
      }
      yield { type: "error", requestId: id, message: error instanceof Error ? error.message : "Unknown generation error" };
    }
  }
}
