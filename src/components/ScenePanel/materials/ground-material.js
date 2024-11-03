import * as THREE from 'three';

const groundMaterial = (is) => {
    const groundMat = new THREE.MeshStandardMaterial({
        roughness: 0.4,
        color: 0xffffff,
        metalness: .1,
        transparent: !is && true,
        opacity: is ? 1 : 0,
        bumpScale: 1,
        side: !is && THREE.BackSide,
    });

    const groundGeometry = new THREE.BoxGeometry(1, 1, 1);
    const groundMesh = new THREE.Mesh(groundGeometry, groundMat);

    groundGeometry.translate(0, 0, 0);
    // groundMesh.castShadow = true;
    // groundMesh.receiveShadow = true;
    return groundMesh;
};

export { groundMaterial };