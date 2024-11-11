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
        console.log(count);

        this.clearLamps();
        this.scene.add(this.lampGroup);
        const lamp = createLamp(this.lampGroup);
        const yPosition = store.room.install_height;

        const roomWidth = x; // ширина комнаты
        const roomHeight = z; // длина комнаты
        const lightSize = 0.3; // размер светильника
        let numLights = count; // начальное количество светильников

        // Определяем размер сетки для покрытия всей комнаты
        const gridCols = Math.ceil(Math.sqrt(numLights));
        const gridRows = Math.ceil(numLights / gridCols);

        // Рассчитываем общее количество ячеек в сетке
        const totalCells = gridCols * gridRows;

        // Если светильников меньше, чем ячеек, дополняем их количество
        if (numLights < totalCells) {
            numLights = totalCells;
        }

        // Рассчитываем размеры ячеек
        const cellWidth = roomWidth / gridCols;
        const cellHeight = roomHeight / gridRows;

        // Начальная позиция для центрирования сетки в комнате
        const startX = -roomWidth / 2 + cellWidth / 2;
        const startZ = -roomHeight / 2 + cellHeight / 2;

        // Добавляем светильники в матрицу, заполняя все ячейки
        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
                if (numLights <= 0) break; // Если все светильники добавлены, выходим

                // Позиция светильника в текущей ячейке
                const x = startX + col * cellWidth;
                const z = startZ + row * cellHeight;

                lamp(x, yPosition, z); // Высота размещения y = 2
                numLights--;
            }
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