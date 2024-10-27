<script setup>
    defineProps(['type'])
    const emit = defineEmits(['click']);
</script>

<template>
    <button :class="cn.btn" @click="emit('click')">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="type === 'minus'">
            <path d="M3.98047 8H13.3138" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="type === 'plus'">
            <path d="M8 3.33337V12.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.33398 8H12.6673" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
</template>

<style scoped lang="scss" module="cn">
    .btn {
        width: 26px;
        height: 26px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: var(--c-gray);
        color: var(--c-gray3);
        transition: all .1s linear;

        &:hover {
            color: var(--c-dark);
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1) ;
        }
        &:active {
            transform: scale(.95);

            -webkit-box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
            -moz-box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
            box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
        }
    }
</style>