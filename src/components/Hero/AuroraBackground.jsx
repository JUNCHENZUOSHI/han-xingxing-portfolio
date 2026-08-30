import { useEffect, useRef } from 'react';

/**
 * AuroraBackground — 1:1 recreation of the deepseek.com/harness hero background.
 *
 * Two WebGL2 passes, mirroring the reference implementation:
 *   1. "brush" pass — a quarter-resolution velocity field. Each frame the old
 *      field decays (0.925) and the cursor splats influence + direction into it
 *      (gaussian falloff, strength boosted by pointer speed).
 *   2. "light" render pass — a domain-warped simplex-noise aurora that reads the
 *      velocity field for mouse distortion, swirl and a 3-color glow, then adds
 *      self-luminance bloom, a warm light core / cool halo that follows the
 *      pointer, film grain and a vignette.
 *
 * Mouse smoothing, velocities, 30fps cadence, dpr cap (1.5), touch/Windows
 * suppression and IntersectionObserver pausing all match the reference.
 */

const PARAMS = {
  mouseRadius: 0.09,
  mouseStrength: 1.8,
  mouseSmoothing: 0.1,
  mouseVelocity: 0.2,
  decay: 0.925,
  distortBoost: 2.2,
  swirlBoost: 0.8,
  glowIntensity: 0.13,
  glowColors: ['#fff7d1', '#538dca', '#2d448b'],
  speed: 28,
  scale: 1.77,
  offsetX: -124,
  offsetY: -48,
  grain: 0.005,
  colors: ['#000000', '#1A3870', '#204a7e', '#eed8aa', '#000000'],
  lightX: 0.89,
  lightY: 0.46,
  lightCore: 0.14,
  lightHalo: 0.2,
  vignette: 0.38,
  lightFollow: 0.63,
  bloomThreshold: 0.61,
  bloomRange: 0.18,
  bloomStrength: 0.4,
};

const VERT = `#version 300 es
in vec4 a_position;
out vec2 vUv;
void main() {
  vUv = a_position.xy * 0.5 + 0.5;
  gl_Position = a_position;
}
`;

const BRUSH_FRAG = `#version 300 es
precision mediump float;
in vec2 vUv;
uniform sampler2D u_prev;
uniform vec2 u_mouse;
uniform vec2 u_velocity;
uniform float u_brushRadius;
uniform float u_brushStrength;
uniform float u_decay;
out vec4 fragColor;

void main() {
  vec4 prev = texture(u_prev, vUv);

  prev.r *= u_decay;
  prev.gb = mix(vec2(0.5), prev.gb, u_decay);

  float dist = distance(vUv, u_mouse);
  float influence = exp(-dist * dist / (u_brushRadius * u_brushRadius * 0.5));
  influence = max(0.0, influence - 0.01);

  float speed = length(u_velocity);
  float presenceStrength = u_brushStrength * 0.3;
  float velBonus = min(speed * 3.0, 0.7) * u_brushStrength;
  float totalStrength = presenceStrength + velBonus;

  prev.r = max(prev.r, influence * totalStrength);
  float blendAmt = influence * min(totalStrength, 0.4) * 0.3;
  prev.g = mix(prev.g, clamp(u_velocity.x * 2.0 + 0.5, 0.0, 1.0), blendAmt);
  prev.b = mix(prev.b, clamp(u_velocity.y * 2.0 + 0.5, 0.0, 1.0), blendAmt);

  fragColor = prev;
}
`;

const LIGHT_FRAG = `#version 300 es
precision mediump float;
in vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_c1, u_c2, u_c3, u_c4, u_c5;
uniform float u_scale;
uniform vec2 u_offset;
uniform float u_grain;
uniform sampler2D u_flowmap;
uniform float u_distortBoost;
uniform float u_swirlBoost;
uniform float u_glowIntensity;
uniform vec3 u_glowColor1;
uniform vec3 u_glowColor2;
uniform vec3 u_glowColor3;
uniform vec2 u_lightPos;
uniform float u_lightCore;
uniform float u_lightHalo;
uniform float u_vignette;
uniform float u_bloomThreshold;
uniform float u_bloomRange;
uniform float u_bloomStrength;
out vec4 fragColor;

vec3 mod289v3(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289v4(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289v4(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float hash(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float fbm(vec3 p){
  float v = 0.0, amp = 0.6;
  vec3 shift = vec3(100.0);
  for (int i = 0; i < 1; i++) { v += amp * snoise(p); p = p * 2.0 + shift; amp *= 0.4; }
  return v;
}

float fluidNoise(vec2 uv, float t){
  float n1 = fbm(vec3(uv * 0.6, t * 0.06));
  float n2 = fbm(vec3(uv * 0.6 + 5.2, t * 0.06 + 1.3));
  vec2 w1 = vec2(n1, n2) * 0.6;
  float n3 = fbm(vec3((uv + w1) * 0.7 + 1.7, t * 0.05 + 3.1));
  float n4 = fbm(vec3((uv + w1) * 0.7 + 9.2, t * 0.05 + 5.7));
  vec2 w2 = vec2(n3, n4) * 0.5;
  return fbm(vec3((uv + w1 + w2) * 0.5, t * 0.04));
}

vec2 curlish(vec2 uv, float t){
  float eps = 0.02;
  float n  = snoise(vec3(uv * 0.8, t));
  float nx = snoise(vec3((uv + vec2(eps, 0.0)) * 0.8, t));
  float ny = snoise(vec3((uv + vec2(0.0, eps)) * 0.8, t));
  return vec2(-(ny - n) / eps, (nx - n) / eps) * 0.003;
}

void main(){
  float aspect = u_resolution.x / u_resolution.y;
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 suv = vec2(uv.x * aspect, uv.y) * u_scale + u_offset;
  float t = u_time;

  // Mouse interaction via the velocity field
  vec4 flow = texture(u_flowmap, uv);
  float influence = flow.r;
  vec2 flowDir = (flow.gb - 0.5) * 2.0;

  // Mouse distortion of the noise UVs
  suv += flowDir * influence * u_distortBoost * 0.8;
  // Mouse swirl around the sampling point
  float swirlAngle = influence * u_swirlBoost * 2.5;
  float cs = cos(swirlAngle), sn = sin(swirlAngle);
  vec2 delta = suv - vec2(uv.x * aspect, uv.y) * u_scale;
  suv += (mat2(cs, sn, -sn, cs) * delta - delta) * influence;

  vec2 curl = curlish(suv, t * 0.04);
  vec2 uvD = suv + curl * 12.0;
  float f = fluidNoise(uvD, t);
  float swirl = snoise(vec3(uvD * 0.8 + f * 1.5, t * 0.035)) * 0.5 + 0.5;
  float n = f * 0.5 + 0.5;
  vec3 col = mix(u_c1, u_c2, smoothstep(0.2, 0.5, n));
  col = mix(col, u_c3, smoothstep(0.35, 0.65, n + swirl * 0.25));
  col = mix(col, u_c4, smoothstep(0.6, 0.85, swirl) * 0.55);
  col = mix(col, u_c5, smoothstep(0.5, 0.8, n * swirl) * 0.35);

  // Mouse proximity color shift: 3-color glow
  float glow = smoothstep(0.0, 0.8, influence);
  float glowNoise = snoise(vec3(uvD * 1.5, t * 0.08)) * 0.5 + 0.5;
  float glowDist = smoothstep(0.0, 1.0, influence);
  vec3 glowMix = mix(u_glowColor3, u_glowColor2, glowDist);
  glowMix = mix(glowMix, u_glowColor1, glowDist * glowNoise);
  col = mix(col, glowMix, glow * u_glowIntensity);

  if (u_grain > 0.0) {
    vec2 flowOffset = (uvD - suv) * u_resolution.y;
    vec2 gp = floor((gl_FragCoord.xy + flowOffset) / 5.0);
    float gr = hash(gp) * 2.0 - 1.0;
    col += gr * u_grain;
  }

  // Self-luminance bloom: bright fluid regions become their own light spots
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  float bloom = smoothstep(u_bloomThreshold - u_bloomRange, u_bloomThreshold + u_bloomRange, luma);
  col += (col * 0.85 + vec3(0.15, 0.145, 0.13)) * bloom * u_bloomStrength;

  // Virtual light source: soft warm core + cool halo, follows the pointer
  float ld = length((uv - u_lightPos) * vec2(aspect, 1.0));
  float core = exp(-ld * ld * 4.5);
  float halo = exp(-ld * 1.8);
  col += vec3(1.0, 0.97, 0.9) * core * u_lightCore + vec3(0.72, 0.8, 1.0) * halo * u_lightHalo;

  float vig = 1.0 - smoothstep(0.35, 0.75, length(uv - 0.5));
  col = mix(col * (1.0 - u_vignette), col, vig);
  fragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('shader compile:', gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

function program(gl, fragSrc) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return null;
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('link:', gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

export default function AuroraBackground({ className = 'hero__aurora' }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false });
    if (!gl) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = !window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const isWindows = navigator.userAgentData
      ? navigator.userAgentData.platform === 'Windows'
      : navigator.userAgent.includes('Windows');
    const mouseEnabled = hasHover && !isWindows;

    const brushProg = program(gl, BRUSH_FRAG);
    const lightProg = program(gl, LIGHT_FRAG);
    if (!brushProg || !lightProg) return;

    // Fullscreen triangle-strip quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const bindQuad = (p) => {
      const loc = gl.getAttribLocation(p, 'a_position');
      gl.enableVertexAttribArray(loc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    };

    const brushU = {
      prev: gl.getUniformLocation(brushProg, 'u_prev'),
      mouse: gl.getUniformLocation(brushProg, 'u_mouse'),
      velocity: gl.getUniformLocation(brushProg, 'u_velocity'),
      brushRadius: gl.getUniformLocation(brushProg, 'u_brushRadius'),
      brushStrength: gl.getUniformLocation(brushProg, 'u_brushStrength'),
      decay: gl.getUniformLocation(brushProg, 'u_decay'),
    };
    const lightU = {
      time: gl.getUniformLocation(lightProg, 'u_time'),
      resolution: gl.getUniformLocation(lightProg, 'u_resolution'),
      c1: gl.getUniformLocation(lightProg, 'u_c1'),
      c2: gl.getUniformLocation(lightProg, 'u_c2'),
      c3: gl.getUniformLocation(lightProg, 'u_c3'),
      c4: gl.getUniformLocation(lightProg, 'u_c4'),
      c5: gl.getUniformLocation(lightProg, 'u_c5'),
      scale: gl.getUniformLocation(lightProg, 'u_scale'),
      offset: gl.getUniformLocation(lightProg, 'u_offset'),
      grain: gl.getUniformLocation(lightProg, 'u_grain'),
      flowmap: gl.getUniformLocation(lightProg, 'u_flowmap'),
      distortBoost: gl.getUniformLocation(lightProg, 'u_distortBoost'),
      swirlBoost: gl.getUniformLocation(lightProg, 'u_swirlBoost'),
      glowIntensity: gl.getUniformLocation(lightProg, 'u_glowIntensity'),
      glowColor1: gl.getUniformLocation(lightProg, 'u_glowColor1'),
      glowColor2: gl.getUniformLocation(lightProg, 'u_glowColor2'),
      glowColor3: gl.getUniformLocation(lightProg, 'u_glowColor3'),
      lightPos: gl.getUniformLocation(lightProg, 'u_lightPos'),
      lightCore: gl.getUniformLocation(lightProg, 'u_lightCore'),
      lightHalo: gl.getUniformLocation(lightProg, 'u_lightHalo'),
      vignette: gl.getUniformLocation(lightProg, 'u_vignette'),
      bloomThreshold: gl.getUniformLocation(lightProg, 'u_bloomThreshold'),
      bloomRange: gl.getUniformLocation(lightProg, 'u_bloomRange'),
      bloomStrength: gl.getUniformLocation(lightProg, 'u_bloomStrength'),
    };

    // Ping-pong quarter-resolution velocity field (r = influence, gb = direction)
    let simW = 0;
    let simH = 0;
    let flip = false;
    let texA = null;
    let texB = null;
    let fboA = null;
    let fboB = null;

    const makeTarget = (w, h, data) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return { fbo, tex };
    };

    const clearField = (w, h) => {
      const data = new Uint8Array(w * h * 4);
      for (let i = 0; i < w * h; i++) {
        data[4 * i] = 0;
        data[4 * i + 1] = 128;
        data[4 * i + 2] = 128;
        data[4 * i + 3] = 255;
      }
      return data;
    };

    let W = 0;
    let H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = Math.round(canvas.clientWidth * dpr);
      H = Math.round(canvas.clientHeight * dpr);
      canvas.width = W;
      canvas.height = H;
      simW = Math.round(W / 4);
      simH = Math.round(H / 4);
      const data = clearField(simW, simH);
      texA = makeTarget(simW, simH, data);
      texB = makeTarget(simW, simH, data);
    };
    resize();

    // starts at field center, like the reference (constant soft disturbance before first move)
    const mouse = { x: 0.5, y: 0.5, smoothX: 0.5, smoothY: 0.5, svx: 0, svy: 0 };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    if (mouseEnabled) window.addEventListener('mousemove', onMove);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let raf = 0;
    let running = true;
    const startTime = performance.now();
    let last = 0;
    const cadence = 1000 / 30;

    const frame = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!visible || now - last < cadence) return;
      last = now - ((now - last) % cadence);

      // keep backing store in sync with layout size
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const cw = Math.round(canvas.clientWidth * dpr);
      const ch = Math.round(canvas.clientHeight * dpr);
      if (cw !== W || ch !== H) resize();

      // smoothed pointer + pointer velocity
      mouse.smoothX += (mouse.x - mouse.smoothX) * PARAMS.mouseSmoothing;
      mouse.smoothY += (mouse.y - mouse.smoothY) * PARAMS.mouseSmoothing;
      mouse.svx += ((mouse.x - mouse.smoothX) * 0.5 - mouse.svx) * PARAMS.mouseVelocity;
      mouse.svy += ((mouse.y - mouse.smoothY) * 0.5 - mouse.svy) * PARAMS.mouseVelocity;

      const prev = flip ? texA : texB;
      const next = flip ? texB : texA;
      flip = !flip;

      // 1 — brush pass into the next field texture
      gl.bindFramebuffer(gl.FRAMEBUFFER, next.fbo);
      gl.viewport(0, 0, simW, simH);
      gl.useProgram(brushProg);
      bindQuad(brushProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, prev.tex);
      gl.uniform1i(brushU.prev, 0);
      gl.uniform2f(brushU.mouse, mouse.smoothX, mouse.smoothY);
      gl.uniform2f(brushU.velocity, mouse.svx, mouse.svy);
      gl.uniform1f(brushU.brushRadius, PARAMS.mouseRadius);
      gl.uniform1f(brushU.brushStrength, mouseEnabled ? PARAMS.mouseStrength : 0);
      gl.uniform1f(brushU.decay, PARAMS.decay);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // 2 — light render pass to screen
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, W, H);
      gl.useProgram(lightProg);
      bindQuad(lightProg);

      const t = (now - startTime) * 0.001 * (PARAMS.speed / 100);
      const follow = mouseEnabled ? PARAMS.lightFollow : 0;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, next.tex);
      gl.uniform1i(lightU.flowmap, 0);
      gl.uniform1f(lightU.time, t);
      gl.uniform2f(lightU.resolution, W, H);
      gl.uniform1f(lightU.scale, PARAMS.scale);
      gl.uniform2f(lightU.offset, PARAMS.offsetX / 100, PARAMS.offsetY / 100);
      gl.uniform1f(lightU.grain, PARAMS.grain);
      gl.uniform1f(lightU.distortBoost, PARAMS.distortBoost);
      gl.uniform1f(lightU.swirlBoost, PARAMS.swirlBoost);
      gl.uniform2f(
        lightU.lightPos,
        PARAMS.lightX + (mouse.smoothX - PARAMS.lightX) * follow,
        PARAMS.lightY
      );
      gl.uniform1f(lightU.lightCore, hasHover ? PARAMS.lightCore : 0);
      gl.uniform1f(lightU.lightHalo, hasHover ? PARAMS.lightHalo : 0);
      gl.uniform1f(lightU.vignette, PARAMS.vignette);
      gl.uniform1f(lightU.bloomThreshold, PARAMS.bloomThreshold);
      gl.uniform1f(lightU.bloomRange, PARAMS.bloomRange);
      gl.uniform1f(lightU.bloomStrength, PARAMS.bloomStrength);
      gl.uniform1f(lightU.glowIntensity, PARAMS.glowIntensity);
      const g1 = hexToRgb(PARAMS.glowColors[0]);
      const g2 = hexToRgb(PARAMS.glowColors[1]);
      const g3 = hexToRgb(PARAMS.glowColors[2]);
      gl.uniform3f(lightU.glowColor1, g1[0], g1[1], g1[2]);
      gl.uniform3f(lightU.glowColor2, g2[0], g2[1], g2[2]);
      gl.uniform3f(lightU.glowColor3, g3[0], g3[1], g3[2]);
      const colors = [lightU.c1, lightU.c2, lightU.c3, lightU.c4, lightU.c5];
      for (let i = 0; i < 5; i++) {
        const c = hexToRgb(PARAMS.colors[i] || PARAMS.colors[PARAMS.colors.length - 1]);
        gl.uniform3f(colors[i], c[0], c[1], c[2]);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const paintStatic = () => {
      // single static frame (reduced motion): render once with zero flow
      const t = 0;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, W, H);
      gl.useProgram(lightProg);
      bindQuad(lightProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA.tex);
      gl.uniform1i(lightU.flowmap, 0);
      gl.uniform1f(lightU.time, t);
      gl.uniform2f(lightU.resolution, W, H);
      gl.uniform1f(lightU.scale, PARAMS.scale);
      gl.uniform2f(lightU.offset, PARAMS.offsetX / 100, PARAMS.offsetY / 100);
      gl.uniform1f(lightU.grain, PARAMS.grain);
      gl.uniform1f(lightU.distortBoost, PARAMS.distortBoost);
      gl.uniform1f(lightU.swirlBoost, PARAMS.swirlBoost);
      gl.uniform2f(lightU.lightPos, PARAMS.lightX, PARAMS.lightY);
      gl.uniform1f(lightU.lightCore, hasHover ? PARAMS.lightCore : 0);
      gl.uniform1f(lightU.lightHalo, hasHover ? PARAMS.lightHalo : 0);
      gl.uniform1f(lightU.vignette, PARAMS.vignette);
      gl.uniform1f(lightU.bloomThreshold, PARAMS.bloomThreshold);
      gl.uniform1f(lightU.bloomRange, PARAMS.bloomRange);
      gl.uniform1f(lightU.bloomStrength, PARAMS.bloomStrength);
      gl.uniform1f(lightU.glowIntensity, PARAMS.glowIntensity);
      const g1 = hexToRgb(PARAMS.glowColors[0]);
      const g2 = hexToRgb(PARAMS.glowColors[1]);
      const g3 = hexToRgb(PARAMS.glowColors[2]);
      gl.uniform3f(lightU.glowColor1, g1[0], g1[1], g1[2]);
      gl.uniform3f(lightU.glowColor2, g2[0], g2[1], g2[2]);
      gl.uniform3f(lightU.glowColor3, g3[0], g3[1], g3[2]);
      const colors = [lightU.c1, lightU.c2, lightU.c3, lightU.c4, lightU.c5];
      for (let i = 0; i < 5; i++) {
        const c = hexToRgb(PARAMS.colors[i] || PARAMS.colors[PARAMS.colors.length - 1]);
        gl.uniform3f(colors[i], c[0], c[1], c[2]);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    if (reduceMotion) {
      paintStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    // Entrance: opacity 0 + blur(20px) → opacity 1 + blur(0) over 1.8s;
    // as the hero scrolls away the layer blurs back up to 20px (instant).
    wrap.style.opacity = '0';
    wrap.style.filter = 'blur(20px)';
    wrap.style.transition = 'opacity 1.8s ease-out, filter 1.8s ease-out';
    const show = requestAnimationFrame(() => {
      wrap.style.opacity = '1';
      wrap.style.filter = 'blur(0px)';
    });

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (0.6 * rect.height)));
      const blurPx = 20 * progress;
      // instant once blurred, eased only on the way back to fully sharp
      wrap.style.transition = `opacity 1.8s ease-out, filter ${blurPx > 0 ? '0s' : '1.8s'} ease-out`;
      wrap.style.filter = `blur(${blurPx}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(show);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div className={className} ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
