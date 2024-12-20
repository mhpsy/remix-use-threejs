import { useEffect, useRef } from "react"
import * as THREE from "three"

import { FontLoader } from "three/examples/jsm/Addons.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"

export default function ConcertsNew() {

    const mountRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const currentMount = mountRef.current; // 将 mountRef.current 赋值给局部变量
        if (currentMount) {
            currentMount.appendChild(renderer.domElement);
        }
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);

        const scene = new THREE.Scene();

        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

        const points = [];
        points.push(new THREE.Vector3(- 10, 0, 0));
        points.push(new THREE.Vector3(0, 10, 0));
        points.push(new THREE.Vector3(10, 0, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const line = new THREE.Line(geometry, material);

        scene.add(line);


        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };

    }, [])

    return (
        <div>
            <div ref={mountRef}></div>
        </div>
    )
}

