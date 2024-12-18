import * as THREE from 'three';

export const useScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#e2e2e2');
    scene.fog = new THREE.Fog(scene.background, 1, 3000);
    scene.castShadow = true;
    scene.receiveShadow = true;
    return scene
}