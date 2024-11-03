import * as THREE from 'three';

export const useSceneLights = (scene) => {
    // Общий свет (Ambient Light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Цвет и интенсивность
    scene.add(ambientLight);

    // Точечные источники света (Point Lights) со всех сторон
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100); // Цвет, интенсивность, расстояние
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight3.position.set(10, -10, -10);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight4.position.set(-10, 10, -10);
    scene.add(pointLight4);
}