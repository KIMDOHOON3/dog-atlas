// Start the model request alongside the scene chunk, not after scene construction.
const modelUrl = "/models/yard-furniture.glb?v=lossless-12";
let pending: Promise<ArrayBuffer> | undefined;

export function loadYardModel(): Promise<ArrayBuffer> {
  pending ??= fetch(modelUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Yard model unavailable");
      return response.arrayBuffer();
    })
    .catch((error: unknown) => {
      pending = undefined;
      throw error;
    });
  return pending;
}
