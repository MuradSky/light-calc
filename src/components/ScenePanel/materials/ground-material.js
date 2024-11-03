import * as THREE from 'three';

const groundMaterial = () => {
    const groundMat = new THREE.MeshStandardMaterial({
        roughness: 0.4,
        color: 0xffffff,
        metalness: .1,
        transparent: true,
        opacity: 0,
        bumpScale: 1,
        side: THREE.BackSide,
    });

    const groundGeometry = new THREE.BoxGeometry(1, 1, 1);
    const groundMesh = new THREE.Mesh(groundGeometry, groundMat);

    groundGeometry.translate(0, 0, 0);
    // groundMesh.castShadow = true;
    // groundMesh.receiveShadow = true;
    return groundMesh;
};

export { groundMaterial };