import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js';
RectAreaLightUniformsLib.init();

export const useReactLigth = (scene) => {
    const rectLight = new THREE.RectAreaLight(0xffffff, 10, 3 , 3);
    rectLight.position.set(0, 3, 0);
    rectLight.lookAt(0, 0, 0);
    
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.intensity = 2;
        
    scene.add(rectLight);

    const updateSize = (x, z, y) => {
        rectLight.width = x - 2;
        rectLight.height = z - 2;
        rectLight.position.y = y;
    };

    const updateIntensity = (flux, lk) => {
        console.log(flux, lk);
        const int = flux / 1000 + lk / 100;
        rectLight.intensity = int;
    }

    return {
        updateSize,
        updateIntensity,
    }
};