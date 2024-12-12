<script setup>
    defineProps(['text', 'styleType']);
</script>

<template>
    <div :class="[cn.label, styleType === 'subtext' ? cn.subtext : '']">
        {{ text }}
    </div>
</template>

<style scoped lang="scss" module="cn">
    .label {
        font-size: 11px;
        line-height: 15.6px;
        color: var(--c-gray3);
    }
    .subtext {
        font-size: 14px;
        color: var(--c-dark);
    }
</style>