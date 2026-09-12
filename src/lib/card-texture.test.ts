import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { captureCardTexture, CardRasterLayoutError } from "./card-texture";

let face: HTMLDivElement;
const drawImage = vi.fn();
const getImageData = vi.fn();
const encoded: string[] = [];

beforeEach(() => {
  vi.clearAllMocks();
  encoded.length = 0;
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: { ready: Promise.resolve() },
  });
  face = document.createElement("div");
  Object.defineProperties(face, {
    offsetWidth: { value: 350 },
    offsetHeight: { value: 490 },
  });
  face.style.background = "#fffdf8";
  vi.stubGlobal("getComputedStyle", () => {
    const values = new Map([
      ["width", "350px"],
      ["height", "490px"],
      ["background-color", "rgb(255,253,248)"],
    ]);
    return {
      [Symbol.iterator]: () => values.keys(),
      getPropertyValue: (name: string) => values.get(name) ?? "",
    };
  });
  vi.stubGlobal(
    "Image",
    class {
      src = "";
      naturalWidth = 350;
      naturalHeight = 490;
      async decode() {
        encoded.push(this.src);
      }
    },
  );
  getImageData.mockReturnValue({
    data: new Uint8ClampedArray([255, 253, 248, 255]),
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    drawImage,
    getImageData,
  } as unknown as CanvasRenderingContext2D);
  vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue(
    "data:image/png;base64,card",
  );
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("card raster compatibility", () => {
  it("keeps the SVG layout at CSS size and produces a double-resolution texture", async () => {
    const result = await captureCardTexture(face);
    const svg = new DOMParser().parseFromString(
      decodeURIComponent(encoded[0].split(",")[1]),
      "image/svg+xml",
    );
    expect(svg.documentElement.getAttribute("width")).toBe("350");
    expect(svg.documentElement.hasAttribute("viewBox")).toBe(false);
    expect(drawImage).toHaveBeenCalledWith(expect.anything(), 0, 0, 700, 980);
    expect(result.src).toBe("data:image/png;base64,card");
  });

  it("rejects a top-left-only raster instead of uploading it as a valid card", async () => {
    getImageData.mockImplementation((x: number, y: number) => ({
      data: new Uint8ClampedArray([
        255,
        253,
        248,
        x < 350 && y < 490 ? 255 : 0,
      ]),
    }));
    await expect(captureCardTexture(face)).rejects.toBeInstanceOf(
      CardRasterLayoutError,
    );
    expect(HTMLCanvasElement.prototype.toDataURL).not.toHaveBeenCalled();
  });

  it("rejects an entirely blank WebKit raster", async () => {
    getImageData.mockReturnValue({ data: new Uint8ClampedArray(4) });
    await expect(captureCardTexture(face)).rejects.toBeInstanceOf(
      CardRasterLayoutError,
    );
  });
});
