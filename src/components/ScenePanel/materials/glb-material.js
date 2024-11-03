import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/Addons.js"

export const glbLoader = async (scene) => {
    const loader = new GLTFLoader();
    const model = await new Promise((resove, reject) => {
        loader.load(
            '/Int_glb-001.glb',
            (glb) => {
                const model = glb.scene;
                model.traverse(function (child) {
                    model.scale.set(.6, .67, .6)
                    model.position.x = 0
                    if (child.isMesh) {

                        child.material.side = THREE.DoubleSide;
                        child.material.needsUpdate = true;

                        if (child.material.name.includes('Wall') || child.material.name.includes('Ceiling') || child.material.name.includes('Floor')) {
                            child.material.side = THREE.FrontSide;
                            child.material.needsUpdate = true;
                        }
                    }
                })
                scene.add(glb.scene);
                resove(model)
            },
            (xhr) => {
                // console.log((xhr.loaded / xhr.total * 100) + '% загружено');
            },
            (error) => {
                console.error('Ошибка загрузки GLB:', error);
            }
        );
    });
    
    return model;
}