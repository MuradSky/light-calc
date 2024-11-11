import { watch } from 'vue';
import { store } from '@/store';
import { MeshStandardMaterial, Mesh, PointLight } from 'three';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
let saveScene = null;
let pointLight = null;
let textMesh;

function calculateTotalArea(width, height, length) {
    const floorArea = width * length; 
    const wallArea = 2 * (height * width + height * length); 
    const totalArea = floorArea + wallArea;
    return totalArea;
}

function createAreaSum(scene) {
    saveScene = scene || saveScene;
    const { width, length, install_height } = store.room;
    const m2 = calculateTotalArea(width, install_height, length);
    return
    const loader = new FontLoader();
    loader.load('/Onest_Bold.json', function (font) {
        if (textMesh) {
            scene.remove(textMesh);
        }

        const textGeometry = new TextGeometry(m2+' м2', {
            font: font,
            size: .7,
            height: 0,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 1,
        });

        const textMaterial = new MeshStandardMaterial({ color: '#fff' });
        textMesh = new Mesh(textGeometry, textMaterial);
        textMesh.position.set(-2.5, 0, ((length + (length / 2)) + 3));
        textMesh.rotation.x = -.6;
        console.log(textMesh);
        
        saveScene.add(textMesh);

        // addPointLight(textMesh.position);
    });
}

function addPointLight(position) {
    if (pointLight) {
        saveScene.remove(pointLight);
    }
    pointLight = new PointLight(0xffffff, 20, 1000); 
    pointLight.position.copy(position);
    pointLight.position.y = 2;
    pointLight.position.z = 7;
    pointLight.position.x = -1;
    pointLight.castShadow = true;
    saveScene.add(pointLight);
}

watch(store, () => {
    createAreaSum(saveScene);
});

export { createAreaSum };