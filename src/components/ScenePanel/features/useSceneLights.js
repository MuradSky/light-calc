import * as THREE from 'three';

export const useSceneLights = (scene) => {
    const ambientLight = new THREE.AmbientLight(0xffffff, .5); // Цвет и интенсивность
    ambientLight.castShadow = true;
    scene.add(ambientLight);
}