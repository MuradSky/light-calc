import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { createLamp, groundMaterial } from './materials';

import { store } from '@/store';
import { watch } from 'vue';

const app = {
    scene: null,
    camera: null,
    renderer: null,
    cube: null,
    lampGroup: new THREE.Group(),
    roomHeight: 1, 
    updateLampHeight(roomHeight) {
        const lampOffsetFromCeiling = store.room.install_height;
        this.lampGroup.children.forEach(lamp => {
            lamp.position.y = (roomHeight + (roomHeight / 2)) - lampOffsetFromCeiling; 
        });
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
        const roomWidth =(x * 10);
        const roomDepth = (z * 10);
        let minSpacing = 10;
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
                lamp(xPosition, yPosition,  zPosition);
            }
        }
    },

    start(canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#e2e2e2');
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        canvas.appendChild(this.renderer.domElement);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.minDistance = 1;
        controls.maxDistance = 100;
        // controls.enableZoom = true; 
        // controls.zoomSpeed = 1.2;

        // this.camera.zoom -= 10;
        // this.camera.updateProjectionMatrix();
        
        const ground = groundMaterial();
        this.scene.add(ground);
        this.lightCountCalc(ground.scale);
        this.roomHeight = ground.scale.y;

        this.camera.position.set(-10, 10, 23);
        this.camera.lookAt(0, 0, 0);
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const setting = (room) => {
            const { width, room_height, length } = room;
            ground.scale.set(width, room_height, length);
            this.lightCountCalc(ground.scale);
            this.updateLampHeight(ground.scale.y);
        }

        setting(store.room);

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