<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps(['value', 'name', 'min']);
    const emit = defineEmits(['onChange']);
    const value = ref(props.value);
        
    watch(()=> props.value, (newValue)=> {
        value.value = newValue;
    });

    const onInput = e => {
       const changeValue = e.target.value;

        const inputValue = (changeValue[1] === '.' && !changeValue[2]) ? changeValue
            : changeValue.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, '$1');
        e.target.value = inputValue;
        value.value = +inputValue;
    }

    const onChange = (e) => {
        const changeValue = e.target.value;

        const inputValue = (changeValue[1] === '.' && !changeValue[2]) ? changeValue
            : changeValue.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, '$1');
        e.target.value = inputValue;
        if (+inputValue < props.min || isNaN(e.target.value)) {
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
            @input="onInput"
            @change="onChange"
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
            text-align: center !important;
            transition: all .1s linear;
            &:hover,
            &:focus {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px;
            }
        }
    }

    input[type="number"] {
  -moz-appearance: textfield; /* For Firefox */
  -webkit-appearance: none; /* For Chrome, Safari, and Opera */
  appearance: none; /* Standard property */

  /* Optionally, add custom styles here */
}

/* Hide spinners in Chrome, Safari, and Opera */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>