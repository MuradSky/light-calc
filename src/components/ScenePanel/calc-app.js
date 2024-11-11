import * as THREE from 'three';
import { createLamp, groundMaterial, glbLoader } from './materials';

import { useCamera, useHelpers, useRender, useScene, useSceneLights } from './hooks';
import { store } from '@/store';
import { watch } from 'vue';

const fac = num => (num * 0.01) + 0.2;

const app = {
    scene: null,
    camera: null,
    renderer: null,
    lampGroup: new THREE.Group(),

    clearLamps() {
        while (this.lampGroup.children.length > 0) {
            const lamp = this.lampGroup.children[0];
            this.lampGroup.remove(lamp);
            lamp.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });
        }
    },
    lightCountCalc({ x, z }, lightCount) {
        this.clearLamps();

        const roomWidth =(x * 1);
        const roomDepth = (z * 1);
        let minSpacing = 2.5;
        
        let lightWidth = 1.2;
        let lightDepth = 0.35;
        const lampsPerRow = Math.ceil(Math.sqrt((lightCount)));
        const lampsPerColumn = Math.ceil(lightCount / lampsPerRow); // Количество колонок, если ряды не заполняют все

        this.scene.add(this.lampGroup);
        const lamp = createLamp(this.lampGroup);
        const yPosition = store.room.install_height;

        function adjustRoomAndLights() {
        // Расчет количества светильников в ряду и колонке с учетом отступов
            const lampsPerRow = Math.ceil(Math.sqrt(lightCount)); 
            const lampsPerColumn = Math.ceil(lightCount / lampsPerRow);

            // Проверяем, помещаются ли светильники в комнату
            let totalWidth = lampsPerRow * (lightWidth + minSpacing);
            let totalDepth = lampsPerColumn * (lightDepth + minSpacing);

            // Если не помещаются, уменьшаем размеры светильников или отступы
            if (totalWidth > roomWidth || totalDepth > roomDepth) {
                // Уменьшаем размер светильников и отступы
                const scaleFactorX = roomWidth / totalWidth;
                const scaleFactorZ = roomDepth / totalDepth;
                const scaleFactor = Math.min(scaleFactorX, scaleFactorZ); // Меньший коэффициент, чтобы все влезло

                lightWidth *= scaleFactor;
                lightDepth *= scaleFactor;
                minSpacing *= scaleFactor;
            }
        }

        adjustRoomAndLights();

        for (let i = 0; i < lightCount; i++) {
            const row = Math.floor(i / lampsPerRow);
            const col = i % lampsPerRow;
            
            const x = (col - (lampsPerRow - 1) / 2) * (lightWidth + minSpacing);
            const z = (row - (lampsPerColumn - 1) / 2) * (lightDepth + minSpacing);

            if (Math.abs(x) > roomWidth / 2) {
                continue;
            }
            if (Math.abs(z) > roomDepth / 2) {
                continue;
            }

            lamp(
                { x, z, y: yPosition },
                { width: lightWidth, depth: lightDepth }
            );
        } 
    },

    async start(canvas) {
        const { width, height } = canvas.getBoundingClientRect();

        this.scene = useScene();
        useHelpers(this.scene)
        useSceneLights(this.scene);
        this.renderer = useRender({ canvas, width, height});
        this.camera = useCamera({ renderer: this.renderer, width, height, });
        
        const model = await glbLoader(this.scene);
        const ground = groundMaterial();
        this.scene.add(ground);
        this.lightCountCalc(ground.scale);

        const setting = (room, lightCount) => {
            const { width, room_height, length } = room;
            ground.scale.set(width, room_height, length);
            ground.position.y = (ground.position.y + Math.abs(room_height - ground.position.y)) / 2;
            this.lightCountCalc(ground.scale, lightCount);

            model.traverse(function (child) {
                if (child.isMesh) {
                    if (child.material.name.includes('Wall') || child.material.name.includes('Ceiling') || child.material.name.includes('Floor')) {
                        child.scale.set(width / 3, room_height / 2, length / 3);
                    }
                }
            });
        }

        setting(store.room, store.lightCount);

        watch(store, newVal => {
            setting(newVal.room, store.lightCount);
        });

        watch(store.coefficients, newVal => {
            model.traverse(function (child) {
                if (child.isMesh) {
                    if (child.material.name.includes('Ceiling')) {
                        const koef =  fac(newVal.ceiling)
                        child.material.color.setRGB(0.5263266 * koef, 0.5263266 * koef, 0.5263266 * koef);
                    }

                    if (child.material.name.includes('Wall')) {
                        const koef = fac(newVal.wall);
                        child.material.color.setRGB(0.461456865 * koef, 0.428446 * koef, 0.3664102 * koef);
                    }

                    if (child.material.name.includes('Floor')) {
                        const koef = newVal.floor === 30 ? 1 : newVal.floor == 20 ?  .5 : 0.1
                        child.material.color.setRGB(0.0511220545 * koef, 0.0220129937 * koef, 0.004116177 * koef);
                    }                    
                }
            });
        });
        
        this.animated();
    },
    animated() {
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    },
    onWindowResize(canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    },
    destroy() {
        this.renderer.dispose();
    }
};

export default app;