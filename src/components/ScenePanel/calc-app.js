import { watch } from 'vue';
import { store } from '@/store';

import {
    useCamera,
    useGlbModel,
    useHelpers,
    useReactLigth,
    useRender,
    useScene,
    useSceneLights,
    useGround,
    useLamp,
    useText
} from './features';

const app = {
    scene: null,
    camera: null,
    renderer: null,
    async start(canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        this.scene = useScene();
        this.renderer = useRender({ canvas, width, height});
        this.camera = useCamera({ renderer: this.renderer, width, height, });
        const { updateSize, updateIntensity } = useReactLigth(this.scene);
        const model = await useGlbModel(this.scene);
        const ground = useGround(this.scene);
        useHelpers(this.scene)
        useSceneLights(this.scene);
        const { updateLamps } = useLamp(this.scene);
        const updateText = await useText(this.scene)
       
        updateText(store.lightCountFromScene);

        this.lightAndGroundRecalc(
            ground,
            updateSize,
            updateIntensity,
            updateLamps,
            model,
        );

        this.coefRecalc(model);

        updateText(store);


        watch(store, () => {
            updateText(store);
        });

        this.animated();
    },
    lightAndGroundRecalc(ground, updateSize, updateIntensity, updateLamps, model) {
        const setting = (room, lightCount) => {
            const { width, room_height, length } = room;
            ground.scale.set(width, room_height, length);
            ground.position.y = (ground.position.y + Math.abs(room_height - ground.position.y)) / 2;

            updateLamps(
                ground.scale.x,
                store.room.install_height,
                ground.scale.z,
                lightCount,
            );

            model.traverse(function (child) {
                if (child.isMesh) {
                    if (child.material.name.includes('Wall') || child.material.name.includes('Ceiling') || child.material.name.includes('Floor')) {
                        child.scale.set(width / 3, room_height / 2, length / 3);
                    }
                }
            });
        }

        setting(store.room, store.lightCount, store.luminous_flux);
        
        updateSize(
            store.room.width,
            store.room.length,
            store.room.install_height,
        );

        updateIntensity(
            store.luminous_flux,
            store.illumination.lk,
            store.room.install_height,
        );

        watch(store, () => {
            setting(
                store.room,
                store.lightCount,
                store.luminous_flux
            );
            updateSize(
                store.room.width,
                store.room.length,
                store.room.install_height,
            );
            updateIntensity(
                store.luminous_flux,
                store.illumination.lk,
                store.room.install_height,
            );
        });
    },
    coefRecalc(model) {
        const fac = num => (num * 0.01) + 0.2;

        watch(store.coefficients, newVal => {
            model.traverse(function (child) {
                if (child.isMesh) {
                    if (child.material.name.includes('Ceiling')) {
                        const koef =  fac(newVal.ceiling)
                        child.material.color.setRGB(0.5263266 * koef, 0.5263266 * koef, 0.5263266 * koef);
                    }

                    if (child.material.name.includes('Wall')) {
                        const koef = fac(newVal.wall);
                        child.material.color.setRGB(0.461456865 * koef, 0.428446 * koef, 0.3664102 * koef);
                    }

                    if (child.material.name.includes('Floor')) {
                        const koef = newVal.floor === 30 ? 1 : newVal.floor == 20 ?  .5 : 0.1
                        child.material.color.setRGB(0.0511220545 * koef, 0.0220129937 * koef, 0.004116177 * koef);
                    }                    
                }
            });
        });
    },
    animated() {
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    },
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
    },
    destroy() {
        this.renderer.dispose();
    }
};

export default app;