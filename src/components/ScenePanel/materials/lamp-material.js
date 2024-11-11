import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
RectAreaLightUniformsLib.init();

const createLamp = (lampGroup) => {
    return (position, size) => {
        const lampM = new THREE.MeshStandardMaterial({ color: '#fff', emissive: 'gray' });
        const boxGeometry = new THREE.BoxGeometry(size.width, 0.01, size.depth);
        const lamp = new THREE.Mesh(boxGeometry, lampM);
        const localLampGroup = new THREE.Group();
        lamp.position.set(
            position.x, 
            position.y,
            position.z,
        );
        localLampGroup.add(lamp);

        const glasM = new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#fff' });
        const glasGeometry = new THREE.BoxGeometry(size.width-0.1, 0.01, size.depth-0.07);
        const glas = new THREE.Mesh(glasGeometry, glasM);
        glas.position.y = -0.01
        lamp.add(glas);


        const color = new THREE.Color(0x808080); // Начальный серый цвет
        color.lerp(new THREE.Color(0xffffff), 0.3); 
        const topM = new THREE.MeshStandardMaterial({ color: color, emissive: '#000' });
        const topGeometry = new THREE.BoxGeometry(size.width, 0.01, size.depth);
        const top = new THREE.Mesh(topGeometry, topM);
        top.position.y = .01
        lamp.add(top);

        const rectLight = new THREE.RectAreaLight(0xffffff, 10, 1, 0.3);
        rectLight.position.set(0, 0, 0);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.intensity = 100;
    
        lamp.add(rectLight);
        lampGroup.add(localLampGroup);
    }
};

export { createLamp };