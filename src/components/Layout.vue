<script setup>
    import ControlPanel from './ControlPanel/ControlPanel.vue';
    import ScenePanel from './ScenePanel/ScenePanel.vue';
</script>

<template>
    <div :class="cn.container">
        <ControlPanel />
        <ScenePanel />
    </div>
</template>

<style scoped lang="scss" module="cn">
    .container {
        width: 100%;
        max-width: 1283px;
        margin: 0 auto;
        
        display: flex;
        align-items: stretch;
        gap: 20px;

        padding-top: 100px;
    }
</style>