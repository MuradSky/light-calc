<script setup>
    defineProps(['text'])
</script>

<template>
    <div :class="cn.title">
        {{ text }}
    </div>
</template>

<style scoped lang="scss" module="cn">
    .title {
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
        color: var(--c-dark);
        padding-bottom: 6px;
        border-bottom: 1px solid var(--c-gray3);
    }
</style>