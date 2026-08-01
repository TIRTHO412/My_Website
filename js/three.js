/* ===================================================================
   CHANDRA PAINTS - THREE.JS 3D HERO CANVAS ANIMATION
   =================================================================== */

const ThreeScene = {
    init: function() {
        const container = document.getElementById('three-canvas-container');
        if (!container || typeof THREE === 'undefined') return;

        // 1. Scene, Camera & WebGL Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60, 
            container.clientWidth / container.clientHeight, 
            0.1, 
            1000
        );
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 2. Color Swatch Palette for 3D Spheres
        const colors = [
            0xe11d48, // Berger Red
            0xf59e0b, // Asian Amber
            0x2563eb, // Dulux Royal Blue
            0x059669, // Nerolac Emerald Green
            0x06b6d4, // Cyan Accent
            0xec4899  // Magenta Accent
        ];

        const spheresGroup = new THREE.Group();
        scene.add(spheresGroup);

        const sphereCount = 28;
        const spheresData = [];
        const geometry = new THREE.SphereGeometry(1, 32, 32);

        for (let i = 0; i < sphereCount; i++) {
            const color = colors[i % colors.length];
            const material = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.15,
                shininess: 90,
                transparent: true,
                opacity: 0.85
            });

            const sphere = new THREE.Mesh(geometry, material);
            const scale = 0.4 + Math.random() * 1.2;
            sphere.scale.set(scale, scale, scale);

            const x = (Math.random() - 0.5) * 26;
            const y = (Math.random() - 0.5) * 16;
            const z = (Math.random() - 0.5) * 14;
            sphere.position.set(x, y, z);

            spheresGroup.add(sphere);

            spheresData.push({
                mesh: sphere,
                initialY: y,
                speed: 0.005 + Math.random() * 0.015,
                floatOffset: Math.random() * Math.PI * 2,
                rotSpeedX: (Math.random() - 0.5) * 0.02,
                rotSpeedY: (Math.random() - 0.5) * 0.02
            });
        }

        // 3. Lighting Setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x06b6d4, 1.5, 50);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff6b00, 1.2, 50);
        pointLight2.position.set(-10, -10, 10);
        scene.add(pointLight2);

        // 4. Mouse / Touch Pointer Interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        function onPointerMove(event) {
            mouseX = (event.clientX - windowHalfX) * 0.0015;
            mouseY = (event.clientY - windowHalfY) * 0.0015;
        }

        window.addEventListener('mousemove', onPointerMove, false);
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouseX = (e.touches[0].clientX - windowHalfX) * 0.0015;
                mouseY = (e.touches[0].clientY - windowHalfY) * 0.0015;
            }
        }, { passive: true });

        // 5. Window Resize Handler
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });

        // 6. Render Loop
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            spheresGroup.rotation.y = targetX * 0.8;
            spheresGroup.rotation.x = targetY * 0.8;

            spheresData.forEach(item => {
                item.mesh.position.y = item.initialY + Math.sin(elapsedTime * item.speed * 20 + item.floatOffset) * 0.6;
                item.mesh.rotation.x += item.rotSpeedX;
                item.mesh.rotation.y += item.rotSpeedY;
            });

            renderer.render(scene, camera);
        }

        animate();
    }
};

window.ThreeScene = ThreeScene;
