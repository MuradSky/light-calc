<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import app from './calc-app';
const scene = ref(null);

onMounted(() => {
    app.start(scene.value);
    window.addEventListener('resize', ()=> app.onWindowResize(scene.value));
});
onUnmounted(() => {
    window.removeEventListener('resize', ()=> app.onWindowResize(scene.value));
    app.destroy();
});
</script>

<template>
    <div ref="scene" :class="cn.scene" />
</template>

<style scoped lang="scss" module="cn">
    .scene {
        flex: auto;
        max-width: 910px;
        border-radius: 6px;
        overflow: hidden;
    }
</style>