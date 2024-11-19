import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
RectAreaLightUniformsLib.init();

const createLamp = (lampGroup) => {
    const width = .4;
    const deph = .4;
    return (x, y, z) => {
        const lampM = new THREE.MeshStandardMaterial({ color: '#fff', emissive: 'gray' });
        const boxGeometry = new THREE.BoxGeometry(width, 0.01, deph);
        const lamp = new THREE.Mesh(boxGeometry, lampM);
        const localLampGroup = new THREE.Group();
        lamp.position.set(x, y, z);
        localLampGroup.add(lamp);

        const glasM = new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#fff' });
        const glasGeometry = new THREE.BoxGeometry(width-0.1, 0.01, deph-0.07);
        const glas = new THREE.Mesh(glasGeometry, glasM);
        glas.position.y = -0.01
        lamp.add(glas);


        // const color = new THREE.Color(0x808080); // Начальный серый цвет
        // color.lerp(new THREE.Color(0xffffff), 0.3); 
        // const topM = new THREE.MeshStandardMaterial({ color: color, emissive: '#000' });
        // const topGeometry = new THREE.BoxGeometry(width, 0.01, deph);
        // const top = new THREE.Mesh(topGeometry, topM);
        // top.position.y = .01
        // lamp.add(top);

        lampGroup.add(localLampGroup);
    }
};

export { createLamp };