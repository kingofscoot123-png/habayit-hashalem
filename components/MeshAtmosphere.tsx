"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a;
void main(){ gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_t;
void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = u_t * 0.07;

  vec2 a = vec2((0.26 + 0.20 * sin(t * 0.63)) * aspect, 0.40 + 0.18 * cos(t * 0.41));
  vec2 b = vec2((0.80 + 0.16 * cos(t * 0.37)) * aspect, 0.72 + 0.14 * sin(t * 0.52));
  vec2 c = vec2((0.50 + 0.18 * sin(t * 0.29 + 1.4)) * aspect, 0.16 + 0.12 * cos(t * 0.71));
  vec2 d = vec2((0.12 + 0.10 * cos(t * 0.22)) * aspect, 0.82 + 0.10 * sin(t * 0.33));

  float d1 = 0.82 / (0.14 + length(p - a) * 1.35);
  float d2 = 0.70 / (0.16 + length(p - b) * 1.25);
  float d3 = 0.58 / (0.18 + length(p - c) * 1.45);
  float d4 = 0.50 / (0.20 + length(p - d) * 1.55);

  vec3 navy  = vec3(0.045, 0.095, 0.175);
  vec3 steel = vec3(0.160, 0.280, 0.460);
  vec3 coal  = vec3(0.080, 0.075, 0.095);
  vec3 metal = vec3(0.280, 0.320, 0.380);
  vec3 teal  = vec3(0.090, 0.220, 0.250);

  vec3 col = navy;
  col = mix(col, steel, clamp(d1 * 0.48, 0.0, 1.0));
  col = mix(col, coal,  clamp(d2 * 0.34, 0.0, 1.0));
  col = mix(col, metal, clamp(d3 * 0.26, 0.0, 1.0));
  col = mix(col, teal,  clamp(d4 * 0.22, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function MeshAtmosphere() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uT = gl.getUniformLocation(prog, "u_t");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.4);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let start = performance.now();
    let visible = !document.hidden;

    const draw = (now: number) => {
      if (!visible) return;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, reduced ? 0 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onVis = () => {
      visible = !document.hidden;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={ref} className="mesh-atmosphere" aria-hidden="true" />;
}
