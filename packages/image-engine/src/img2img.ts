export type Img2ImgOptions = {
  prompt: string;
  negativePrompt?: string;
  strength: number;
  referenceStrength: number;
  width: number;
  height: number;
  seed?: number;
  mask?: Blob;
};

export type Img2ImgRequest = Img2ImgOptions & { source: Blob };

export function validateImg2ImgRequest(request: Img2ImgRequest) {
  if (!request.source.size) throw new Error("A source image is required");
  if (!request.prompt.trim()) throw new Error("A transformation prompt is required");
  if (request.strength < 0 || request.strength > 1) throw new Error("strength must be between 0 and 1");
  if (request.referenceStrength < 0 || request.referenceStrength > 1) throw new Error("referenceStrength must be between 0 and 1");
  if (request.width < 64 || request.height < 64) throw new Error("image dimensions are too small");
}

export async function imageFileToBlob(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Only image files are supported");
  return file.slice(0, file.size, file.type);
}
