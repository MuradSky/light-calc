import * as THREE from 'three';
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { store as globalStore } from '../../../store';

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
    const textGeometry = new TextGeometry(number+' лк', {
        font: font,
        size: .3, // Размер текста
        height: 0.01, // Глубина текста
        curveSegments: 12, // Качество кривых
    });

    const textMaterial = new THREE.MeshStandardMaterial({ color: '#fff' });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(-2.25, 0.5, -0.7); // Расположение текста на полу
    textMesh.rotation.x = -Math.PI / 2; // Разворачиваем текст, чтобы он был горизонтально
    textMesh.rotation.z = -Math.PI / 2; // Разворачиваем текст, чтобы он был горизонтально
    scene.add(textMesh);
    return textMesh;
}

const renderLabel = (scene, font) => {
    const textGeometryLabel = new TextGeometry('Освещенность рабочей поверхности', {
        font: font,
        size: .12, // Размер текста
        height: 0.01, // Глубина текста
        curveSegments: 12, // Качество кривых
    });

    const labelMaterial = new THREE.MeshStandardMaterial({ color: '#fff' });
    const labelMesh = new THREE.Mesh(textGeometryLabel, labelMaterial);

    labelMesh.position.set(-1.85, 0.5, -1.6); // Расположение текста на полу
    labelMesh.rotation.x = -Math.PI / 2; // Разворачиваем текст, чтобы он был горизонтально
    labelMesh.rotation.z = -Math.PI / 2; // Разворачиваем текст, чтобы он был горизонтально
    scene.add(labelMesh);
}

export const useText = async (scene) => {
    const font = await promise(scene);
    let textMesh = null;
    renderLabel(scene, font);

    const updateText = async (store) => {
        const flux_real = (
            (store?.usage_coef * store?.luminous_flux * store?.lightCountFromScene)
            / (store.room?.width * store.room?.length) / store?.illumination?.premises
        );

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
        globalStore.flux_real = +(flux_real.toFixed(0));
        if (!isNaN(flux_real)) textMesh = renderLM(scene, font, flux_real.toFixed(0));
    };

    return updateText;
};