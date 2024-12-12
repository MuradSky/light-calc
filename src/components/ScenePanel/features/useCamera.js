import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const useCamera = ({
    renderer,
    width,
    height,
    scene,
}) => {
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 100;
    
    camera.position.set( 
        -4.177739671461607,
        5.032033307134937,
        -1.526997158066082175
    );
    
    camera.rotation.set(
        -0.4728302987398233,
        -0.33304622530015354,
        -0.16569833991525817,
    );
    
    // Устанавливаем целевую точку камеры
    controls.target.set(0, 0.75, 0); // Сдвигаем точку смотрения вверх на 1

    // Обновляем контроллер, чтобы он знал о новых настройках
    controls.update();

    return camera;
}