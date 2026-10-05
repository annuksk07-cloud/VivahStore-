import { useEffect, useRef } from 'react';

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res; uniform float u_time; uniform vec3 u_t[6]; uniform vec4 u_swirl[4];
#define TAU 6.28318530718
float caustic(vec2 uv, float time){
  vec2 p = mod(uv*TAU, TAU) - 250.0;
  vec2 i = p; float c = 1.0; float inten = .005;
  for (int n = 0; n < 5; n++) {
    float t = time * (1.0 - (3.5 / float(n+1)));
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten), p.y / (cos(i.y+t)/inten)));
  }
  c /= 5.0; c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 8.0);
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 asp = vec2(u_res.x/u_res.y, 1.0);
  vec2 q = uv*asp;
  float h = 0.0; vec2 disp = vec2(0.0);

  // Swirl circular vortex calculations
  for(int s=0; s<4; s++){
    float age = u_time - u_swirl[s].z;
    if(age >= 0.0 && age < 4.5){
      vec2 s_pos = u_swirl[s].xy * asp;
      vec2 dv = q - s_pos;
      float d = length(dv);
      float radius = 0.45;
      if(d < radius){
        float fade = exp(-age * 0.85) * smoothstep(4.5, 0.0, age);
        float falloff = (1.0 - d / radius);
        falloff = falloff * falloff;

        // Circular rotation around touch point
        float spinSpeed = u_swirl[s].w * (2.8 + sin(u_time * 2.2) * 0.35);
        float angle = spinSpeed * falloff * fade;
        float sa = sin(angle);
        float ca = cos(angle);
        vec2 rot_dv = vec2(dv.x * ca - dv.y * sa, dv.x * sa + dv.y * ca);
        disp += (rot_dv - dv);

        // Gentle central eye depression and radiating spiral ripple waves
        float eye = exp(-d * 14.0) * fade * 0.25;
        h -= eye;
        float spiral = sin(d * 32.0 - angle * 2.4 - age * 3.6) * falloff * fade * 0.09;
        h += spiral;
      }
    }
  }

  // Ripple drop rings
  for(int i=0;i<6;i++){
    vec2 dv = q - u_t[i].xy*asp;
    float d = length(dv);
    float age = u_time - u_t[i].z;
    float r = age*0.45;
    float ring = sin((d-r)*45.0) * exp(-abs(d-r)*10.0) * exp(-age*1.1);
    h += ring;
    disp += normalize(dv + vec2(1e-4)) * ring * 0.012;
  }

  vec2 w = q + disp;
  w += 0.015*vec2(sin(q.y*6.0+u_time*0.6), cos(q.x*5.0+u_time*0.5));
  float c = caustic(w*0.9, u_time*0.35);
  float depth = 1.0 - uv.y;
  vec3 top = vec3(0.87,0.96,0.98);
  vec3 mid = vec3(0.62,0.87,0.92);
  vec3 deep = vec3(0.37,0.72,0.85);
  vec3 base = mix(top, mid, smoothstep(0.0,0.6,depth));
  base = mix(base, deep, smoothstep(0.55,1.0,depth)*0.6);
  vec3 col = base + vec3(c)*0.55 + vec3(h*0.12);
  gl_FragColor = vec4(clamp(col,0.0,1.0),1.0);
}`;

export default function WaterBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const gl = cv.getContext('webgl'); if (!gl) return;
    const mk = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, mk(gl.VERTEX_SHADER, VERT));
    gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(pr, 'u_res');
    const uTime = gl.getUniformLocation(pr, 'u_time');
    const uT = gl.getUniformLocation(pr, 'u_t');
    const uSwirl = gl.getUniformLocation(pr, 'u_swirl');

    const drops = new Float32Array(18);
    for (let i = 0; i < 6; i++) drops[i*3+2] = -100;

    const swirls = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
      swirls[i*4 + 2] = -100;
      swirls[i*4 + 3] = 1.0;
    }

    let n = 0;
    let sIdx = 0;
    let isDown = false;
    let prevX = 0;
    let prevY = 0;
    const start = performance.now();

    const addDrop = (x: number, y: number) => {
      drops[n*3] = x / innerWidth; drops[n*3+1] = 1 - y / innerHeight;
      drops[n*3+2] = (performance.now() - start) / 1000; n = (n + 1) % 6;
    };

    const startSwirl = (x: number, y: number) => {
      sIdx = (sIdx + 1) % 4;
      const curTime = (performance.now() - start) / 1000;
      swirls[sIdx*4] = x / innerWidth;
      swirls[sIdx*4 + 1] = 1 - y / innerHeight;
      swirls[sIdx*4 + 2] = curTime;
      // Gentle alternating clockwise / counter-clockwise natural spin
      swirls[sIdx*4 + 3] = sIdx % 2 === 0 ? 1.35 : -1.35;
      prevX = x;
      prevY = y;
    };

    const updateSwirl = (x: number, y: number) => {
      const curTime = (performance.now() - start) / 1000;
      const dx = x - prevX;
      const dy = y - prevY;
      const dist = Math.hypot(dx, dy);

      // Swirl vortex follows the touch point in real time
      swirls[sIdx*4] = x / innerWidth;
      swirls[sIdx*4 + 1] = 1 - y / innerHeight;
      // Keep age at 0 while touch is actively dragging so vortex stays strong
      swirls[sIdx*4 + 2] = curTime;

      // React to movement speed and direction
      if (dist > 2) {
        const dir = (dx - dy);
        const strength = Math.sign(dir || 1) * Math.min(2.4, Math.max(1.1, dist * 0.07));
        swirls[sIdx*4 + 3] = strength;
      }
      prevX = x;
      prevY = y;
    };

    const resize = () => {
      const s = Math.min(devicePixelRatio, 1.5) * 0.6;
      cv.width = innerWidth * s; cv.height = innerHeight * s;
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize();

    let last = 0;
    const onDown = (e: PointerEvent) => {
      isDown = true;
      startSwirl(e.clientX, e.clientY);
      addDrop(e.clientX, e.clientY);
    };

    const onMove = (e: PointerEvent) => {
      const t = performance.now();
      if (isDown) {
        updateSwirl(e.clientX, e.clientY);
      }
      if (t - last > 100) {
        last = t;
        addDrop(e.clientX, e.clientY);
      }
    };

    const onUp = () => {
      if (isDown) {
        isDown = false;
        // Mark release time so the circular vortex continues spinning and gently decays for ~4 seconds
        swirls[sIdx*4 + 2] = (performance.now() - start) / 1000;
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    const auto = setInterval(() => addDrop(Math.random()*innerWidth, Math.random()*innerHeight), 3000);
    addDrop(innerWidth*0.5, innerHeight*0.3);

    let raf = 0;
    const loop = () => {
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform3fv(uT, drops);
      gl.uniform4fv(uSwirl, swirls);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf); clearInterval(auto);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);
  return <canvas ref={ref} style={{ position:'fixed', inset:0, width:'100%', height:'100%', zIndex:-1, pointerEvents:'none', background:'linear-gradient(#DDF6FB,#9FDDEB,#5FB8D9)' }} />;
}
