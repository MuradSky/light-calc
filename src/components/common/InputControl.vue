<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps(['value', 'name', 'min']);
    const emit = defineEmits(['onChange']);
    const value = ref(props.value);
        
    watch(()=> props.value, (newValue)=> {
        value.value = newValue;
    });

    const onChange = (e) => {
        const inputValue = e.target.value.replace(/[^0-9.]/g, "");
        e.target.value = +inputValue;
        if (+inputValue < props.min) {
            value.value = props.min;
            emit('onChange', [props.min, e.target.name]);
        } else {
            value.value = +inputValue;
            emit('onChange', [value.value, e.target.name]);
        }
    };

    const onBlur = (e) => {
        if (e.target.value === '') {
            e.target.value = props.min;
            value.value = props.min;
            emit('onChange', [props.min, e.target.name]);
        } else {
            const inputValue = Number.parseFloat(e.target.value.replace(/[^0-9.]/g, "")).toFixed(1);
            value.value = +inputValue;
            e.target.value = +inputValue;
            emit('onChange', [+inputValue, e.target.name]);
        }
    }
</script>

<template>
    <label :class="cn.input"> 
        <input 
            type="text"
            :name="name"
            :value="value"
            @input="onChange"
            @blur="onBlur"
        >
    </label>
</template>

<style scoped lang="scss" module="cn">
    .input {
        input {
            width: 64px;
            height: 26px;
            border-radius: 6px;

            font-size: 14px;
            font-weight: 500;
            line-height: 18px;

            background-color: var(--c-gray);
            color: var(--c-dark);
            text-align: center;
            transition: all .1s linear;
            &:hover,
            &:focus {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px;
            }
        }
    }
</style>