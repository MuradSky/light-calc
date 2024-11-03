import * as THREE from 'three';

export const useHelpers = (scene) => {
     if (import.meta.env.DEV) {
        const axesHelper = new THREE.AxesHelper(30);
        scene.add(axesHelper);
    }
}