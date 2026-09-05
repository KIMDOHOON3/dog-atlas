import { captureCardTexture } from "./card-texture";

const vertex = `
precision mediump float;
attribute vec2 a_uv;
uniform float u_phase;
uniform float u_curl;
uniform vec2 u_tilt;
uniform float u_camera;
varying vec2 v_uv;
varying float v_bend;
void main() {
  v_uv = vec2(a_uv.x, 1. - a_uv.y);
  float p = u_phase;
  float row = clamp((p - (1. - a_uv.y) * .12) / .88, 0., 1.);
  float e = row * row * (3. - 2. * row);
  float bend = sin(p * 3.14159265) * 1.2 * u_curl;
  float angle = (a_uv.x - .15) * bend;
  float x = mix(a_uv.x - .5, sin(angle) / max(bend, .001) + .15 - .5, step(.001, bend));
  float z = (1. - cos(angle)) / max(bend, .001);
  float y = (a_uv.y - .5) * 1.4;
  if (u_curl > .5) {
    x -= e * 1.22;
    y += sin(row * 3.14159265) * .08;
    z += sin(row * 3.14159265) * .09;
  } else {
    float scale = 1. - p * .06;
    x = x * scale + p * .07;
    y = y * scale - p * .025;
    z = -p * .04;
  }
  float ty = u_tilt.y;
  float tx = u_tilt.x;
  vec3 q = vec3(x*cos(ty) + z*sin(ty), y, -x*sin(ty) + z*cos(ty));
  q = vec3(q.x, q.y*cos(tx) - q.z*sin(tx), q.y*sin(tx) + q.z*cos(tx));
  float perspective = u_camera / (u_camera - q.z);
  gl_Position = vec4(q.x * perspective / 1.7, q.y * perspective / 1.12, 0., 1.);
  v_bend = angle;
}`;
const fragment = `
precision mediump float;
uniform sampler2D u_image;
uniform float u_phase;
uniform float u_curl;
uniform float u_foil;
varying vec2 v_uv;
varying float v_bend;
void main() {
  vec4 ink = texture2D(u_image, v_uv);
  float lift = sin(u_phase * 3.14159265) * u_curl;
  float shade = 1. - abs(sin(v_bend)) * .16;
  float beam = pow(max(0., cos(v_bend * 3.5 - u_phase * 5. + v_uv.y * 1.8)), 12.) * lift;
  vec3 spectral = .65 + .35 * cos(vec3(0.,2.1,4.2) + v_bend * 5. + v_uv.y * 3.);
  vec3 color = ink.rgb * shade + beam * mix(vec3(.08), spectral * .17, u_foil);
  float fade = u_curl > .5 ? 1. - smoothstep(.78, 1., u_phase) : 1.;
  float edge = min(min(v_uv.x, 1. - v_uv.x), min(v_uv.y, 1. - v_uv.y) * 1.4);
  float coverage = smoothstep(0., .0025, edge);
  gl_FragColor = vec4(color, ink.a * fade * coverage);
}`;

export type CardTransitionRenderer = {
  prepare: (key: string, face: HTMLElement) => Promise<boolean>;
  settle: () => Promise<void>;
  start: (
    from: string,
    to: string,
    direction: number,
    width: number,
    height: number,
    tiltX: number,
    tiltY: number,
  ) => boolean;
  draw: (progress: number, foil: number) => void;
  stop: () => void;
  dispose: () => void;
};

export function createCardTransitionRenderer(
  canvas: HTMLCanvasElement,
): CardTransitionRenderer | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    premultipliedAlpha: false,
    depth: false,
    stencil: false,
  });
  if (!gl) {
    canvas.dataset.meshError = "WebGL unavailable";
    return null;
  }
  const textures = new Map<string, WebGLTexture>();
  const pending = new Map<string, Promise<boolean>>();
  const shaders: WebGLShader[] = [];
  let disposed = false;
  let pair: [WebGLTexture, WebGLTexture] | null = null;
  let direction = 1;
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const indices = gl.createBuffer();
  const stop = () => {
    pair = null;
    canvas.style.opacity = "0";
  };
  const dispose = () => {
    disposed = true;
    stop();
    for (const texture of textures.values()) gl.deleteTexture(texture);
    textures.clear();
    shaders.forEach((shader) => gl.deleteShader(shader));
    gl.deleteBuffer(buffer);
    gl.deleteBuffer(indices);
    gl.deleteProgram(program);
  };
  try {
    if (!program || !buffer || !indices)
      throw new Error("Transition allocation failed");
    for (const [type, source] of [
      [gl.VERTEX_SHADER, vertex],
      [gl.FRAGMENT_SHADER, fragment],
    ] as const) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Shader allocation failed");
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
    }
    gl.bindAttribLocation(program, 0, "a_uv");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(
        gl.getProgramInfoLog(program) || "Transition shader compilation failed",
      );
    gl.useProgram(program);
    const vertices: number[] = [],
      elements: number[] = [];
    const columns = 20,
      rows = 28;
    for (let y = 0; y <= rows; y++)
      for (let x = 0; x <= columns; x++) vertices.push(x / columns, y / rows);
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < columns; x++) {
        const i = y * (columns + 1) + x;
        elements.push(
          i,
          i + 1,
          i + columns + 1,
          i + 1,
          i + columns + 2,
          i + columns + 1,
        );
      }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(elements),
      gl.STATIC_DRAW,
    );
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const phase = gl.getUniformLocation(program, "u_phase"),
      curl = gl.getUniformLocation(program, "u_curl"),
      foil = gl.getUniformLocation(program, "u_foil"),
      tilt = gl.getUniformLocation(program, "u_tilt"),
      camera = gl.getUniformLocation(program, "u_camera");
    gl.uniform1i(gl.getUniformLocation(program, "u_image"), 0);
    gl.clearColor(0, 0, 0, 0);
    return {
      prepare(key, face) {
        if (textures.has(key)) {
          const value = textures.get(key)!;
          textures.delete(key);
          textures.set(key, value);
          return Promise.resolve(true);
        }
        if (pending.has(key)) return pending.get(key)!;
        const task = captureCardTexture(face)
          .then((image) => {
            if (disposed || gl.isContextLost()) return false;
            const texture = gl.createTexture();
            if (!texture) return false;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(
              gl.TEXTURE_2D,
              gl.TEXTURE_WRAP_S,
              gl.CLAMP_TO_EDGE,
            );
            gl.texParameteri(
              gl.TEXTURE_2D,
              gl.TEXTURE_WRAP_T,
              gl.CLAMP_TO_EDGE,
            );
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            gl.texImage2D(
              gl.TEXTURE_2D,
              0,
              gl.RGBA,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              image,
            );
            textures.set(key, texture);
            // Four double-resolution snapshots use about 13 MiB at a 390px card.
            while (textures.size > 4) {
              const oldest = textures.keys().next().value!;
              gl.deleteTexture(textures.get(oldest)!);
              textures.delete(oldest);
            }
            canvas.dataset.textureCount = String(textures.size);
            return true;
          })
          .catch((error: unknown) => {
            canvas.dataset.textureError =
              error instanceof Error
                ? error.message
                : "Texture preparation failed";
            return false;
          })
          .finally(() => pending.delete(key));
        pending.set(key, task);
        return task;
      },
      async settle() {
        await Promise.all(pending.values());
      },
      start(from, to, nextDirection, width, height, tiltX, tiltY) {
        if (
          disposed ||
          gl.isContextLost() ||
          !textures.has(from) ||
          !textures.has(to)
        )
          return false;
        pair = [textures.get(from)!, textures.get(to)!];
        direction = nextDirection;
        const cssWidth = width * 3.4,
          cssHeight = height * 1.6;
        const ratio = Math.min(
          window.devicePixelRatio || 1,
          1.5,
          Math.sqrt(1_100_000 / (cssWidth * cssHeight)),
        );
        const w = Math.round(cssWidth * ratio),
          h = Math.round(cssHeight * ratio);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
        gl.uniform2f(tilt, tiltX, tiltY);
        gl.uniform1f(camera, 1200 / width);
        canvas.dataset.renderer = "webgl-mesh";
        canvas.style.opacity = "1";
        return true;
      },
      draw(progress, strength) {
        if (!pair || disposed) return;
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(foil, strength);
        const p = Math.min(1, Math.max(0, progress));
        const paint = (
          texture: WebGLTexture,
          amount: number,
          curved: number,
        ) => {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.uniform1f(phase, amount);
          gl.uniform1f(curl, curved);
          gl.drawElements(gl.TRIANGLES, elements.length, gl.UNSIGNED_SHORT, 0);
        };
        const ease = p * p * (3 - 2 * p);
        if (direction > 0) {
          paint(pair[1], 1 - ease, 0);
          paint(pair[0], p, 1);
        } else {
          paint(pair[0], ease, 0);
          paint(pair[1], 1 - p, 1);
        }
      },
      stop,
      dispose,
    };
  } catch (error) {
    canvas.dataset.meshError =
      error instanceof Error ? error.message : "Mesh unavailable";
    dispose();
    return null;
  }
}
