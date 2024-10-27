<script setup>
    defineProps(['text'])
</script>

<template>
    <div :class="cn.label">
        {{ text }}
    </div>
</template>

<style scoped lang="scss" module="cn">
    .label {
        font-size: 13px;
        line-height: 15.6px;
        color: var(--c-gray2);
    }
</style>