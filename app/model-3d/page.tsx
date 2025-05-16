'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Page() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    // Camera & renderer
    let width = mount.clientWidth;
    let height = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Contour rings
    const ringsGroup = new THREE.Group();
    const nRings = 24;
    const pointsPerRing = 200;
    const colorA = new THREE.Color('#cc231d');
    const colorB = new THREE.Color('#3b86a8');

    for (let r = 0; r < nRings; r++) {
      const phi = (r / (nRings - 1)) * Math.PI;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= pointsPerRing; i++) {
        const theta = (i / pointsPerRing) * 2 * Math.PI + (r / nRings) * 0.5;
        const noise = Math.sin((i / pointsPerRing) * 4 * Math.PI + phi) * 0.05 * (1 - r / nRings);
        const radius = 1 + noise;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(theta) * Math.sin(phi);
        pts.push(new THREE.Vector3(x, y, z));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(pts);
      const t = r / (nRings - 1);
      const color = colorA.clone().lerp(colorB, t);
      const material = new THREE.LineBasicMaterial({ color });
      ringsGroup.add(new THREE.Line(geometry, material));
    }
    scene.add(ringsGroup);

    // Animation
    const animate = () => {
      ringsGroup.rotation.y += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Responsive
    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Fullscreen container
  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    />
  );
}
