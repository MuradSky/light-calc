import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
RectAreaLightUniformsLib.init();

const createLamp = (lampGroup) => {
    return (xPosition, yPosition, zPosition) => {
        const lampM = new THREE.MeshStandardMaterial({ color: '#fff', emissive: 'gray' });
        const boxGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.3);
        const lamp = new THREE.Mesh(boxGeometry, lampM);
        const localLampGroup = new THREE.Group();
        lamp.position.set(xPosition, -yPosition || -0.1, zPosition);
        localLampGroup.add(lamp);
        localLampGroup.position.y = 1.5;

        const glasM = new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#fff' });
        const glasGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.25);
        const glas = new THREE.Mesh(glasGeometry, glasM);
        glas.position.set(0, -0.02, 0);

    
        lamp.add(glas);

        const rectLight = new THREE.RectAreaLight(0xffffff, 5, 2, 0.3);
        rectLight.position.set(0, 2, 0);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.intensity = 100;
     
    
        // const rectLight2 = new THREE.RectAreaLight(0xffffff, 5, 0.6, 0.3);
        // rectLight2.position.set(0, 2, 0);
        // rectLight2.rotation.y = -Math.PI / 2;
        // rectLight2.intensity = 1;

        // glas.add(rectLight2)

        lamp.add(rectLight);
        lampGroup.add(localLampGroup);
    }
};

export { createLamp };