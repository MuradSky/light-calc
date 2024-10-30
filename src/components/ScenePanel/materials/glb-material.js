import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/Addons.js"

export const glbLoader = (scene) => {
    const loader = new GLTFLoader();
    loader.load(
        '/Int_glb-001.glb',
        (glb) => {
            const model = glb.scene;
            model.traverse(function (child) {
                model.scale.set(.6, .6, .6)
                model.position.x = .15
                if (child.isMesh === true) {
                    if (child.material.name.includes('Wall') || child.material.name.includes('Ceiling') || child.material.name.includes('Floor')) {
                        child.material.transparent = true;
                        child.material.opacity = 0;
                    }
                }
            })

            scene.add(glb.scene); // Добавляем загруженную сцену в основную сцену
        },
        (xhr) => {
            // Опционально: функция обратного вызова для отслеживания прогресса загрузки
            console.log((xhr.loaded / xhr.total * 100) + '% загружено');
        },
        (error) => {
            // Обработка ошибок загрузки
            console.error('Ошибка загрузки GLB:', error);
        }
    );
}