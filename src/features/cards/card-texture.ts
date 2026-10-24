// Capture the already styled, local card once before movement. No DOM reads,
// image decoding, or texture uploads belong in the animation loop.
const imageData = new Map<string, Promise<string>>();
export class CardRasterLayoutError extends Error {}
async function inlineImage(src: string): Promise<string> {
  let pending = imageData.get(src);
  if (!pending) {
    pending = fetch(src).then(async (response) => {
      if (!response.ok) throw new Error("Card image unavailable");
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
    imageData.set(src, pending);
    pending.catch(() => imageData.delete(src));
  }
  return pending;
}

export async function captureCardTexture(
  face: HTMLElement,
): Promise<HTMLImageElement> {
  await document.fonts.ready;
  const width = face.offsetWidth,
    height = face.offsetHeight;
  if (!width || !height) throw new Error("Card has no layout");
  const copy = face.cloneNode(true) as HTMLElement;
  const originals = [face, ...face.querySelectorAll<HTMLElement>("*")];
  const copies = [copy, ...copy.querySelectorAll<HTMLElement>("*")];
  // Read styles once, before asynchronous work can change the live card.
  originals.forEach((node, i) => {
    const style = getComputedStyle(node);
    const target = copies[i];
    for (const property of style)
      target.style.setProperty(property, style.getPropertyValue(property));
    target.style.visibility = "visible";
    target.style.animation = "none";
    target.style.transition = "none";
    target.style.willChange = "auto";
    target.style.contain = "none";
    target.style.containerType = "normal";
    target.removeAttribute("hidden");
    target.removeAttribute("id");
  });
  copy.style.cssText += `;position:relative;inset:auto;width:${width}px;height:${height}px;transform:none;display:block;margin:0;`;
  await Promise.all(
    copies
      .filter((node) => node.tagName === "IMG")
      .map(async (node) => {
        const img = node as HTMLImageElement;
        img.removeAttribute("srcset");
        img.removeAttribute("loading");
        img.src = await inlineImage(img.src);
      }),
  );
  const markup = new XMLSerializer().serializeToString(copy);
  // WebKit can composite positioned descendants of a scaled foreignObject at
  // their original size/origin. Keep its viewport 1:1; scale only drawImage.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject x="0" y="0" width="${width}" height="${height}">${markup}</foreignObject></svg>`;
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await image.decode();
  // Rasterize here, while idle: WebGL cannot upload an SVG foreignObject directly.
  const raster = document.createElement("canvas");
  raster.width = Math.round(width * 2);
  raster.height = Math.round(height * 2);
  const context = raster.getContext("2d");
  if (!context) throw new Error("Card raster unavailable");
  context.drawImage(image, 0, 0, raster.width, raster.height);
  // Every card has an opaque paper background. Reject blank or top-left-only
  // WebKit snapshots before they can replace the accessible HTML card.
  for (const x of [0.1, 0.5, 0.9]) {
    for (const y of [0.1, 0.5, 0.9]) {
      const alpha = context.getImageData(
        Math.floor(raster.width * x),
        Math.floor(raster.height * y),
        1,
        1,
      ).data[3];
      if (alpha < 250)
        throw new CardRasterLayoutError("Card raster lost its layout");
    }
  }
  const result = new Image();
  result.src = raster.toDataURL("image/png");
  await result.decode();
  return result;
}
