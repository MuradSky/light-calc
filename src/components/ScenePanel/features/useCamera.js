import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const useCamera = ({
    renderer,
    width,
    height,
}) => {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 100;
    
    camera.position.set( 
        -4.177739671461607,
        5.032033307134937,
        -0.026997158066082175
    );
    
    camera.rotation.set(
        -0.4728302987398233,
        -0.33304622530015354,
        -0.16569833991525817,
    );
    
    camera.lookAt(0, 0, 0)

    return camera;
}