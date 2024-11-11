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
    lightCountCalc({ x, z }, count) {
        this.clearLamps();
        this.scene.add(this.lampGroup);
        const lamp = createLamp(this.lampGroup);
        const yPosition = store.room.install_height;

        const roomWidth = x;  // ширина комнаты в метрах
        const roomHeight = z; // длина комнаты в метрах
        const lightSize = 0.3; // размер светильника
        let numLights = count;    // количество светильников

        // Создаем сцену
        const scene = new THREE.Scene();

        // Определяем размер сетки для покрытия всей комнаты
        const gridCols = Math.ceil(Math.sqrt(numLights));  // количество колонок
        const gridRows = Math.ceil(numLights / gridCols);  // количество строк

        // Рассчитываем общее количество ячеек в сетке
        const totalCells = gridCols * gridRows;

        // Если светильников меньше, чем ячеек, увеличиваем количество для заполнения
        if (numLights < totalCells) {
            numLights = totalCells;
        }

        // Рассчитываем размеры ячеек (расстояние между светильниками)
        const spacingX = (roomWidth - lightSize) / (gridCols + 1); // отступ по X
        const spacingZ = (roomHeight - lightSize) / (gridRows + 1); // отступ по Z

        // Начальная позиция, чтобы сетка была центрирована
        const startX = -roomWidth / 2 + spacingX + lightSize / 2;
        const startZ = -roomHeight / 2 + spacingZ + lightSize / 2;

        let lightCount = 0;
        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
                if (lightCount >= numLights) break;  // Выход, если все светильники размещены

                // Рассчитываем позицию светильника в сетке
                const x = startX + col * spacingX;
                const z = startZ + row * spacingZ;

                // Создаем светильник и задаем его позицию
                lamp(x, yPosition, z);
                lightCount++;
            }
        }

        store.totalLightCount = numLights;
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