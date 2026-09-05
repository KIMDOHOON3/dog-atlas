// Static engravings live in a build-time RGB map. Only the light changes per frame.
const vertexSource = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() { v_uv = a_position * .5 + .5; gl_Position = vec4(a_position, 0., 1.); }
`;
const fragmentSource = `
precision mediump float;
varying vec2 v_uv;
uniform vec2 u_light;
uniform float u_strength;
uniform float u_back;
uniform float u_woodland;
uniform sampler2D u_material;
uniform sampler2D u_spectrum;
void main() {
  vec2 uv = vec2(v_uv.x, 1. - v_uv.y);
  vec3 material = texture2D(u_material, uv).rgb;
  float diagonal = uv.x * .83 + uv.y * .59;
  float sweep = diagonal - .60 - dot(u_light, vec2(.48, .30));
  float band = exp2(-sweep * sweep * 21.64);
  float reveal = band * band * band;
  vec2 lightOffset = (uv - .5) * vec2(1., 1.4) - u_light * vec2(.65, .85);
  float specular = max(0., 1. - dot(lightOffset, lightOffset) * 1.6);
  specular *= specular; specular *= specular;
  float phase = abs(fract(material.b * 3. + dot(u_light, vec2(.65,.52))) * 2. - 1.);
  phase *= phase; phase *= phase;
  float sparkle = smoothstep(.6, 1., material.b) * phase;
  float edge = abs(uv.x - .5) * 2.; edge = edge * edge * edge * edge * edge;
  float artwork = 1. - smoothstep(.74, .82, uv.y);
  float alpha = ((.10 + .29 * band + .10 * specular) * material.g + .16 * edge * artwork);
  alpha += sparkle * (.12 + band * .60) * artwork;
  float engraving = material.r * (.025 + reveal * .95);
  float grain = smoothstep(.90, 1., sin(uv.x * 170. + uv.y * 22. + material.b * 5.)) * .22;
  engraving = mix(engraving, grain * reveal, u_woodland);
  vec3 rainbow = texture2D(u_spectrum, vec2(fract(diagonal * 1.65 + dot(u_light, vec2(.62,-.42))), .5)).rgb;
  vec3 ice = mix(vec3(.59,.80,.92), vec3(.97,.88,.68), band);
  ice = mix(ice, mix(vec3(.53,.68,.46), vec3(.99,.85,.53), band), u_woodland);
  vec3 color = mix(ice, rainbow, .32);
  color = mix(color, vec3(.96,.99,1.), clamp(specular * .35 + sparkle, 0., 1.));
  vec3 silver = mix(vec3(.13,.34,.49), vec3(.63,.83,.94), smoothstep(.35,.90,reveal));
  silver = mix(silver, vec3(.78,.68,.39), u_woodland);
  color = mix(color, silver, clamp(engraving * 1.8, 0., 1.));
  float leftCopy = (1. - smoothstep(.28, .40, uv.x)) * smoothstep(.22,.28,uv.y) * (1. - smoothstep(.61,.66,uv.y));
  float backCopy = max(leftCopy, max(1. - smoothstep(.12,.20,uv.y), smoothstep(.78,.84,uv.y)));
  float copyMask = mix(1. - smoothstep(.74,.83,uv.y), 1. - backCopy * .94, u_back);
  gl_FragColor = vec4(color, clamp((alpha + engraving * .78) * u_strength * copyMask, 0., .90));

}`;

export type FoilRenderer = {
  draw: (
    x: number,
    y: number,
    strength: number,
    back?: boolean,
    woodland?: boolean,
  ) => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
};

export function createFoilRenderer(
  canvas: HTMLCanvasElement,
  onReady?: () => void,
  onError?: () => void,
): FoilRenderer | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    premultipliedAlpha: false,
  });
  if (!gl) return null;
  const shaders: WebGLShader[] = [],
    textures: WebGLTexture[] = [],
    images: HTMLImageElement[] = [];
  let program: WebGLProgram | null = null,
    buffer: WebGLBuffer | null = null;
  let disposed = false,
    loaded = 0;
  const dispose = () => {
    disposed = true;
    images.forEach((image) => {
      image.onload = null;
      image.onerror = null;
    });
    textures.forEach((texture) => gl.deleteTexture(texture));
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
    shaders.forEach((shader) => gl.deleteShader(shader));
  };
  try {
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Shader allocation failed");
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error("Shader compilation failed");
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource),
      fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    program = gl.createProgram();
    if (!program) throw new Error("Program allocation failed");
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error("Shader linking failed");
    gl.useProgram(program);
    buffer = gl.createBuffer();
    if (!buffer) throw new Error("Buffer allocation failed");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const light = gl.getUniformLocation(program, "u_light"),
      strength = gl.getUniformLocation(program, "u_strength"),
      back = gl.getUniformLocation(program, "u_back"),
      woodland = gl.getUniformLocation(program, "u_woodland");
    const loadTexture = (url: string, uniform: string, unit: number) => {
      const texture = gl.createTexture();
      if (!texture) throw new Error("Texture allocation failed");
      textures.push(texture);
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGB,
        1,
        1,
        0,
        gl.RGB,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0]),
      );
      gl.uniform1i(gl.getUniformLocation(program!, uniform), unit);
      const image = new Image();
      images.push(image);
      image.onload = () => {
        if (disposed || gl.isContextLost()) return;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          image,
        );
        loaded++;
        if (loaded === 2) onReady?.();
      };
      image.onerror = () => {
        if (!disposed) onError?.();
      };
      image.src = url;
    };
    loadTexture(
      "/illustrations/card-studies/alpine-foil-material-v1.png",
      "u_material",
      0,
    );
    loadTexture(
      "/illustrations/card-studies/foil-spectrum-v1.png",
      "u_spectrum",
      1,
    );
    return {
      resize(width, height) {
        // Only the translucent coating is downsampled; illustration and text stay sharp.
        const ratio = Math.min(1, 320 / Math.max(1, width));
        const w = Math.max(1, Math.round(width * ratio)),
          h = Math.max(1, Math.round(height * ratio));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
      },
      draw(x, y, amount, reverse = false, forest = false) {
        if (disposed || loaded !== 2) return;
        gl.uniform2f(light, x, y);
        gl.uniform1f(strength, amount);
        gl.uniform1f(back, reverse ? 1 : 0);
        gl.uniform1f(woodland, forest ? 1 : 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      },
      dispose,
    };
  } catch {
    dispose();
    return null;
  }
}
