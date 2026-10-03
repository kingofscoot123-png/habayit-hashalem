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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.14;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
    camera.position.z = 2.15;

    const geo = new THREE.PlaneGeometry(2.2, 1.65, mobile ? 14 : 64, mobile ? 12 : 48);
    const tex = new THREE.TextureLoader().load(src);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = mobile ? 2 : 8;

    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.38,
      metalness: 0.36,
      envMapIntensity: 1.1,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const key = new THREE.PointLight(0xe8f1ff, mobile ? 18 : 28, 10);
    key.position.set(0.7, 0.45, 1.6);
    scene.add(key);
    const rim = new THREE.PointLight(0x86efac, mobile ? 6 : 10, 9);
    rim.position.set(-1.2, -0.1, 1.2);
    scene.add(rim);
    const fill = new THREE.PointLight(0x7dd3fc, 4, 8);
    fill.position.set(0, -0.8, 1.4);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x152033, 0.55));

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    if (!reduced) wrap.addEventListener("pointermove", onMove);

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
      const ride = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ride") || "0") || 0;
      if (!reduced) {
        if (mobile && Math.abs(pointer.tx) < 0.02) {
          pointer.tx = Math.sin(t * 0.00045) * 0.4;
          pointer.ty = Math.cos(t * 0.00032) * 0.24;
        }
        pointer.x += (pointer.tx - pointer.x) * 0.08;
        pointer.y += (pointer.ty - pointer.y) * 0.08;
        mesh.rotation.y = pointer.x * 0.32 + ride * 0.85;
        mesh.rotation.x = pointer.y * 0.18 + Math.sin(ride * 6.2) * 0.06;
        mesh.position.z = Math.sin(ride * 8) * 0.08;
        camera.position.z = 2.15 - ride * 0.18;
        const dof = Math.abs(pointer.x) * (mobile ? 0.2 : 0.55);
        wrap.style.filter = `blur(${dof}px)`;
        key.position.x = 0.55 + pointer.x * 1.05;
        key.position.y = 0.4 + pointer.y * 0.6;
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.style.filter = "";
      geo.dispose();
      mat.dispose();
      tex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src]);

  return <div ref={wrapRef} className="root-scene" role="img" aria-label={alt} />;
}
