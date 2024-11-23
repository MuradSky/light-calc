import * as THREE from 'three';
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

const promise = () => new Promise((resolve, reject) => {
    const fontLoader = new FontLoader();
    try {
        fontLoader.load('/calc/Onest_Bold.json', font => {
            resolve(font);
        });
    } catch (err) {
        reject(err);
    }
});

const renderLM = (scene, font, number) => {
    const textGeometry = new TextGeometry(number+' ЛК', {
        font: font,
        size: .3, // Размер текста
        height: 0.02, // Глубина текста
        curveSegments: 12, // Качество кривых
    });

    const textMaterial = new THREE.MeshStandardMaterial({ color: '#fff' });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(-2.2, 0.01, -1); // Расположение текста на полу
    textMesh.rotation.x = -Math.PI / 2; // Разворачиваем текст, чтобы он был горизонтально
    textMesh.rotation.z = -Math.PI / 2; // Разворачиваем текст, чтобы он был горизонтально
    scene.add(textMesh);
    return textMesh;
}

const renderLabel = (scene, font) => {
    const textGeometryLabel = new TextGeometry('Освещенность', {
        font: font,
        size: .1, // Размер текста
        height: 0.02, // Глубина текста
        curveSegments: 12, // Качество кривых
    });

    const labelMaterial = new THREE.MeshStandardMaterial({ color: '#fff' });
    const labelMesh = new THREE.Mesh(textGeometryLabel, labelMaterial);

    labelMesh.position.set(-1.8, 0.01, -1); // Расположение текста на полу
    labelMesh.rotation.x = -Math.PI / 2; // Разворачиваем текст, чтобы он был горизонтально
    labelMesh.rotation.z = -Math.PI / 2; // Разворачиваем текст, чтобы он был горизонтально
    scene.add(labelMesh);
}

export const useText = async (scene) => {
    const font = await promise(scene);
    let textMesh = null;
    renderLabel(scene, font);

    const updateText = async (store) => {
        const flux_real = ((store?.usage_coef * store?.lightCountFromScene) / (store.room?.width * store.room?.length)) * 100 * 10;
        if (textMesh) {
            scene.remove(textMesh); // Удаляем текст из сцены
            if (textMesh.geometry) textMesh.geometry.dispose();
            if (textMesh.material) {
                if (Array.isArray(textMesh.material)) {
                    textMesh.material.forEach(mat => mat.dispose());
                } else {
                    textMesh.material.dispose();
                }
            }
            textMesh = null;
        }
        if (!isNaN(flux_real)) textMesh = renderLM(scene, font, flux_real.toFixed(0));
    };

    return updateText;
};