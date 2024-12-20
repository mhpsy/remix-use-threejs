import { useEffect, useRef } from "react"
import * as THREE from "three"
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

export default function ConcertsNew() {

    const mountRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';

        const currentMount = mountRef.current; // 将 mountRef.current 赋值给局部变量
        if (currentMount) {
            currentMount.appendChild(renderer.domElement);
            currentMount.appendChild(labelRenderer.domElement);
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

        const div = document.createElement('div');
        div.className = 'label';
        div.textContent = 'Hello';
        div.style.backgroundColor = 'transparent';
        div.style.color = 'white';
        
        const label = new CSS2DObject(div);
        label.position.set(0, 10, 0); // 将标签放在三角形顶部
        scene.add(label);

        function animate() {
            requestAnimationFrame(animate);
            label.rotation.y += 1;
            label.rotation.x += 1;
            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);
        }
        animate();

        return () => {
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
                currentMount.removeChild(labelRenderer.domElement);
            }
        };

    }, [])

    return (
        <div>
            <div ref={mountRef} style={{ position: 'relative' }}></div>
        </div>
    )
}
