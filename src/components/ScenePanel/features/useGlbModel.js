import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const useGlbModel = async (scene) => {
    const loader = new GLTFLoader();
    
    const createMaterial = (child) => {
        return new THREE.MeshStandardMaterial({
            map: child.material.map || null,  // Проверка на наличие текстуры
            color: child.material.color || new THREE.Color(0xffffff),  // Цвет по умолчанию
            side: THREE.FrontSide,
        });
    };

    const model = await new Promise((resolve, reject) => {
        loader.load(
            '/calc/Int_glb-001.glb',
            (glb) => {
                const model = glb.scene;
                model.scale.set(0.6, 0.67, 0.6);
                model.position.set(0, 0, 0);  // Установка позиции модели

                model.traverse((child) => {
                    if (child.isMesh) {
                        // Применение материала на основе имени
                        if (
                            child.material.name.includes('Desk') || 
                            child.material.name.includes('Material') ||
                            child.material.name.includes('metal-white') || 
                            child.material.name.includes('Sit') ||
                            child.material.name.includes('table_base')
                        ) {
                            child.geometry.computeVertexNormals();  // Пересчет нормалей
                            child.material = createMaterial(child);
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }

                        // Обработка материалов для стен, потолков и пола
                        if (
                            child.material.name.includes('Wall') ||
                            child.material.name.includes('Ceiling') ||
                            child.material.name.includes('Floor')
                        ) {
                            child.material.side = THREE.FrontSide;
                            child.material.needsUpdate = true;
                        }
                    }
                });

                scene.add(model);
                resolve(model);  // Завершаем промис
            },
            (xhr) => {
                // Можно добавить логику прогресса
                // console.log((xhr.loaded / xhr.total * 100) + '% загружено');
            },
            (error) => {
                console.error(error);
                reject(error);  // Завершаем промис с ошибкой
            }
        );
    });

    return model;
};
