import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { createLamp, groundMaterial, glbLoader } from './materials';

import { store } from '@/store';
import { watch } from 'vue';

const app = {
    scene: null,
    camera: null,
    renderer: null,
    cube: null,
    lampGroup: new THREE.Group(),
    roomHeight: 1, 
    updateLampHeightWihtCeiling(roomHeight) {
        console.log(roomHeight, 
            this.lampGroup,
        );
        const lampOffsetFromCeiling = store.room.install_height;
        // console.log(lampOffsetFromCeiling);
        // this.lampGroup.position.y = (roomHeight + (roomHeight / 2)) + lampOffsetFromCeiling;
        // const lampOffsetFromCeiling = store.room.install_height;
        // this.lampGroup.position.y 
        // this.lampGroup.children.forEach(lamp => {
        //     lamp.position.y = lampOffsetFromCeiling; 
        // });
    },
    updateInstalLHeight(val) {
        // this.lampGroup.position.y = val;
    },
    clearLamps() {
        while (this.lampGroup.children.length > 0) {
            const lamp = this.lampGroup.children[0];
            this.lampGroup.remove(lamp);
            lamp.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });
        }
    },
    lightCountCalc({ x, z }) {
        this.clearLamps();
        const roomWidth =(x * 1);
        const roomDepth = (z * 1);
        let minSpacing = 2;
        const lampsX = Math.floor(roomWidth / minSpacing);
        const lampsZ = Math.floor(roomDepth / minSpacing);

        this.scene.add(this.lampGroup);
        const lamp = createLamp(this.lampGroup);

        const spacingX = roomWidth / (lampsX + 1);
        const spacingZ = roomDepth / (lampsZ + 1);

        const yPosition = store.room.install_height;

        for (let i = 1; i <= lampsX; i++) {
            for (let j = 1; j <= lampsZ; j++) {
                const xPosition = -roomWidth / 2 + i * spacingX;
                const zPosition = -roomDepth / 2 + j * spacingZ;
                lamp(xPosition, yPosition, zPosition);
            }
        }
    },

    start(canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#e2e2e2');
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(width, height);
        canvas.appendChild(this.renderer.domElement);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.minDistance = 1;
        controls.maxDistance = 100;
    
        this.scene.fog = new THREE.Fog(this.scene.background, 1, 300);
        
        const ground = groundMaterial();
        this.scene.add(ground);
        this.lightCountCalc(ground.scale);
        this.roomHeight = ground.scale.y;

        this.camera.position.set(
           -0.7554004290204507,
            2.1556343682933443,
            3.5155008482425636
        );

        this.camera.rotation.set(
            -0.4728302987398233,
            -0.33304622530015354,
            -0.16569833991525817,
        );
    
        this.camera.lookAt(0, 0, 0);
        // const ambientLight = new THREE.AmbientLight(0x404040);
        // this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( - 1, 1.75, 1 );
        dirLight.position.multiplyScalar( 30 );
        this.scene.add( dirLight );

        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        const d = 50;

        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = - 0.0001;

  

        const setting = (room) => {
            const { width, room_height, length } = room;
            ground.scale.set(width, room_height, length);
            ground.position.y = (ground.position.y + Math.abs(room_height - ground.position.y)) / 2;
            this.lightCountCalc(ground.scale);
        }

        setting(store.room);

        glbLoader(this.scene);

        if (import.meta.env.DEV) {
            const axesHelper = new THREE.AxesHelper(30);
            this.scene.add(axesHelper);
        }

        watch(() => store.room.install_height, newVal => {
            if (newVal < store.room.room_height) {
                this.updateInstalLHeight(newVal);
            }
        });

        watch(store, newVal => {
            setting(newVal.room);
        });

    
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    },
    onWindowResize(canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    },
    destroy() {
        this.renderer.dispose();
    }
};

export default app;