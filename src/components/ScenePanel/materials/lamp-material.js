import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
RectAreaLightUniformsLib.init();

const createLamp = (lampGroup) => {
    return (xPosition, yPosition, zPosition) => {
        const lampM = new THREE.MeshStandardMaterial({ color: '#fff', emissive: 'gray' });
        const boxGeometry = new THREE.BoxGeometry(1.4, 0.01, 0.35);
        const lamp = new THREE.Mesh(boxGeometry, lampM);
        const localLampGroup = new THREE.Group();
        lamp.position.set(
            xPosition, 
            yPosition,
            zPosition
        );
        localLampGroup.add(lamp);

        const glasM = new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#fff' });
        const glasGeometry = new THREE.BoxGeometry(1.2, 0.01, 0.25);
        const glas = new THREE.Mesh(glasGeometry, glasM);
        glas.position.y = -0.01
        lamp.add(glas);

        const topM = new THREE.MeshStandardMaterial({ color: '#000', emissive: '#000' });
        const topGeometry = new THREE.BoxGeometry(1.4, 0.01, 0.35);
        const top = new THREE.Mesh(topGeometry, topM);
        top.position.y = .01
        lamp.add(top);

        const rectLight = new THREE.RectAreaLight(0xffffff, 10, 1, 0.3);
        rectLight.position.set(0, 0, 0);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.intensity = 50;
    
        lamp.add(rectLight);
        lampGroup.add(localLampGroup);
    }
};

export { createLamp };