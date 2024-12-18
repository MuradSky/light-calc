import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js';

RectAreaLightUniformsLib.init();


export const useReactLigth = (scene) => {
    // Shadow light
    const shadowLight = new THREE.DirectionalLight(0xffffff, 1);
    shadowLight.position.set(.5, 3, .5);
    shadowLight.castShadow = true;
    scene.add(shadowLight);

    const rectLight = new THREE.RectAreaLight(0xffffff, 10, 3, 3);
    rectLight.castShadow = true;
    rectLight.receiveShadow = true;
    rectLight.position.set(0, 3, 0);
    rectLight.lookAt(0, 0, 0);

    rectLight.rotation.x = -Math.PI / 2;
    rectLight.intensity = 1;

    scene.add(rectLight);
    let sepX = 2;
    let sepZ = 2;

    const updatePosY = (y) => {
        shadowLight.position.y = y
    }

    const updateDirectional = (lux) => {
        shadowLight.intensity = lux / (1000 / 2);
    }

    const updateSize = (x, z, y) => {
        if (x <= 5) sepX = 2;
        if (z <= 5) sepZ = 2;
        if (x > 5) sepX = sepX + (x / 100);
        if (z > 5) sepZ = sepZ + (z / 100);

        rectLight.width = x - 2;
        rectLight.height = z - 2;
        rectLight.position.y = y;

        updatePosY(y);
    };

    // Функция для расчёта интенсивности света
    function calculateNormalizedIntensity(lux, baseArea, newWidth, newHeight) {
        const newArea = newWidth * newHeight;
        // Ограничиваем компенсацию при уменьшении размеров
        const scaleFactor = Math.max(1, Math.sqrt(newArea / baseArea));

        const int = newArea > 5000 ? 1 : newArea > 2000 ? 1.5 : newArea >= 500 ? 3 : 5;
        // const int = 10;
        // Рассчитываем интенсивность
        const rawIntensity = (lux) / (int * newArea);
        console.log(rawIntensity);
        return (rawIntensity * scaleFactor) + 1;
    }

    const updateIntensity = ({
        lux,
        width,
        deph,
    }) => {
        const newInt = calculateNormalizedIntensity(lux, 25, width, deph);
        rectLight.intensity = newInt;
        updateDirectional(lux);
    }

    return {
        updateSize,
        updateIntensity,
    }
};