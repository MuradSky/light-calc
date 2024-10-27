<script setup>
    import RoomParams from './RoomParams.vue';
    import Illumination from './Illumination.vue';
    import Coefficients from './Coefficients.vue';
</script>

<template>
    <div :class="cn.panel">
        <RoomParams />
        <Illumination />
        <Coefficients />
    </div>
</template>

<style scoped lang="scss" module="cn">
    .panel {
        background-color: #fff;
        box-shadow: 0px 4px 40px -10px #00000026;
        border-radius: 6px;
        padding: 15px 20px;

        max-width: 354px;
    }

    .block {
        
    }
</style>