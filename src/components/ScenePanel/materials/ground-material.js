import * as THREE from 'three';

const groundMaterial = () => {
    const groundMat = new THREE.MeshStandardMaterial({
        roughness: 0.4,
        color: 0xffffff,
        metalness: .1,
        bumpScale: 1,
        side: THREE.BackSide,
    });

    const groundGeometry = new THREE.BoxGeometry(10, 3, 10);
    const groundMesh = new THREE.Mesh(groundGeometry, groundMat);

    groundMesh.position.set(0, 0, 0);
    groundMesh.receiveShadow = true;

    return groundMesh;
};

export { groundMaterial };