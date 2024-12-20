import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ConcertsNew() {
    // 使用一个 ref 来获取 DOM 容器
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // 创建场景、相机和渲染器
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // 将渲染器的 DOM 元素挂载到 ref 容器中
        const currentMount = mountRef.current; // 将 mountRef.current 赋值给局部变量
        if (currentMount) {
            currentMount.appendChild(renderer.domElement);
        }

        // 创建一个立方体作为示例
        const geometry = new THREE.BoxGeometry(1, 2);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // 设置相机位置
        camera.position.z = 5;

        // 动画循环
        const animate = () => {
            // requestAnimationFrame(animate);

            // // 旋转立方体
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        // animate();
        renderer.setAnimationLoop(animate)

        // 窗口大小变化时更新渲染器和相机
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        // 清理函数
        return () => {
            window.removeEventListener("resize", handleResize);

            // 使用局部变量 currentMount 清理渲染器 DOM
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);


    return (
        <div>
            <h1>concerts.new.new-test</h1>
            {/* 渲染器会挂载到这个 div 中 */}
            <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
        </div>
    )
}

