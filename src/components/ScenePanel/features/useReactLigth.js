import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js';

RectAreaLightUniformsLib.init();


export const useReactLigth = (scene) => {
    const rectLight = new THREE.RectAreaLight(0xffffff, 10, 3, 3);
    rectLight.position.set(0, 3, 0);
    rectLight.lookAt(0, 0, 0);

    rectLight.rotation.x = -Math.PI / 2;
    rectLight.intensity = 2;

    scene.add(rectLight);

    let sepX = 2;
    let sepZ = 2;

    const updateSize = (x, z, y) => {
        if (x <= 5) sepX = 2;
        if (z <= 5) sepZ = 2;
        if (x > 5) sepX = sepX + (x / 100);
        if (z > 5) sepZ = sepZ + (z / 100);

        rectLight.width = x - 2;
        rectLight.height = z - 2;
        rectLight.position.y = y;

    };

    // Функция для расчёта интенсивности света
    function calculateNormalizedIntensity(lux, baseArea, newWidth, newHeight) {
        const newArea = newWidth * newHeight;
        // Ограничиваем компенсацию при уменьшении размеров
        const scaleFactor = Math.max(1, Math.sqrt(newArea / baseArea));

        const int = newArea > 5000 ? .8 : newArea > 2000 ? 1.5 : newArea >= 500 ? 2 : 3;
        // Рассчитываем интенсивность
        const rawIntensity = (lux) / (int * newArea);
        return (rawIntensity * scaleFactor) + 1;
    }

    const updateIntensity = ({
        lux,
        width,
        deph,
    }) => {
        const newInt = calculateNormalizedIntensity(lux, 25, width, deph);
        rectLight.intensity = newInt;
    }

    return {
        updateSize,
        updateIntensity,
    }
};