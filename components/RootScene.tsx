"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function RootScene({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !mobile,
      powerPreference: mobile ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.6));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 20);
    camera.position.z = 2.05;

    const geo = new THREE.PlaneGeometry(2.15, 1.62, mobile ? 12 : 40, mobile ? 10 : 30);
    const tex = new THREE.TextureLoader().load(src);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;

    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.48,
      metalness: 0.28,
      envMapIntensity: 0.9,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const key = new THREE.PointLight(0xd6e4f5, 22, 9);
    key.position.set(0.7, 0.45, 1.55);
    scene.add(key);
    const rim = new THREE.PointLight(0x86efac, 7, 8);
    rim.position.set(-1.15, -0.15, 1.15);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0x152033, 0.6));

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    if (!mobile && !reduced) wrap.addEventListener("pointermove", onMove);

    const fit = () => {
      const w = wrap.clientWidth || 320;
      const h = wrap.clientHeight || 240;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    let raf = 0;
    let live = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        live = entry.isIntersecting;
      },
      { threshold: 0.12 },
    );
    io.observe(wrap);

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!live) return;
      if (!reduced) {
        if (mobile) {
          pointer.tx = Math.sin(t * 0.00045) * 0.45;
          pointer.ty = Math.cos(t * 0.00032) * 0.28;
        }
        pointer.x += (pointer.tx - pointer.x) * 0.08;
        pointer.y += (pointer.ty - pointer.y) * 0.08;
        mesh.rotation.y = pointer.x * 0.28;
        mesh.rotation.x = pointer.y * 0.16;
        key.position.x = 0.55 + pointer.x * 0.9;
        key.position.y = 0.4 + pointer.y * 0.55;
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      tex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src]);

  return <div ref={wrapRef} className="root-scene" role="img" aria-label={alt} />;
}
