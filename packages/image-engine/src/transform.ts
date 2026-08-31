export type ImageTransformRequest = { source: Blob; prompt: string; mask?: Blob; denoise: number; referenceStrength: number; width: number; height: number; seed?: number };

export function validateImageTransform(request: ImageTransformRequest): void {
  if (request.source.size === 0) throw new Error("Source image is empty");
  if (!request.prompt.trim()) throw new Error("A transformation prompt is required");
  if (!Number.isFinite(request.denoise) || request.denoise < 0 || request.denoise > 1) throw new Error("Denoise must be between 0 and 1");
  if (!Number.isFinite(request.referenceStrength) || request.referenceStrength < 0 || request.referenceStrength > 1) throw new Error("Reference strength must be between 0 and 1");
  if (!Number.isInteger(request.width) || !Number.isInteger(request.height) || request.width < 64 || request.height < 64) throw new Error("Invalid output dimensions");
}

export async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}
