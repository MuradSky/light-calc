
<script setup>
    import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

    const props = defineProps({
        name: String,
        modelValue: [String, Number],
        options: {
            type: Array,
            required: false,
        },
        placeholder: {
            type: String,
            default: 'Select an option',
        },
    });
    const emit = defineEmits(['update:modelValue']);

    const selectRef = ref(null);
    const listRef = ref(null);
    const isOpen = ref(false);
    const selectedValue = ref(props.modelValue);

    const selectedLabel = computed(() => {
        const selectedOption = props.options.find(option => option.value === selectedValue.value);
        return selectedOption ? selectedOption.label : null;
    });

    const toggleDropdown = () => {
        isOpen.value = !isOpen.value;
    };

    const selectOption = (option) => {
        selectedValue.value = option.value;
        isOpen.value = false;
        emit('update:modelValue', [props.name, option.value]);
    };

    const onClose = (e) => {
        if (selectRef.value && !selectRef.value.contains(e.target)) {
            isOpen.value = false;
        }
    }

    onMounted(()=> {
        emit('update:modelValue', [props.name, props.modelValue])
        window.addEventListener('click', onClose);
    });

    onUnmounted(()=> {
        window.removeEventListener('click', onClose);
    });

    watch(() => props.modelValue, (newVal) => {
        selectedValue.value = newVal;
    });


    watch(isOpen, (newVal) => {
        const timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            const element = listRef.value?.querySelector('li[data-active="true"]');
            if (element) {
                element.scrollIntoView({
                    block: 'center',
                });
            }
        }, 0);
    });

    const extractValue = (string) => string.replace(/.*\((.*?)\).*/, '$1');
    const extractLabel = (string) => string.split('(')[0];
</script>

<template>
    <div ref="selectRef" :class="cn.dropdown" @click="toggleDropdown">
        <div :class="cn.selected">
            <div :class="cn.label" v-if="selectedLabel">
                {{ extractLabel(selectedLabel) }}
                <span>({{ extractValue(selectedLabel) }})</span>
            </div>
            <div :class="cn.label" v-else>
                {{ placeholder }}
            </div>
            <div :class="[cn.arrow, isOpen && cn.is_open ]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7L10 12L15 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        </div>
        <div v-if="isOpen" :class="cn.dropdown_list">
            <ul :class="cn.dropdown_menu" ref="listRef">
                <li 
                    v-for="(option, index) in options" 
                    :key="index" 
                    @click="selectOption(option)"
                    :class="[option.label === selectedLabel && cn.active]"
                    :data-active="option.label === selectedLabel"
                >
                    {{ extractLabel(option.label) }}
                    <span>({{ extractValue(option.label) }})</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss" module="cn">
    .dropdown {
        position: relative;
        width: 200px;
        cursor: pointer;
        width: 100%;
    }
    
    .selected {
        padding: 5px 8px;
        border-radius: 6px;
        background-color: #f9f9f9;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all .1s linear;
        &:hover {
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1) ;
        }
    }
    
    .label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        font-size: 14px;
        font-weight: 500;
        line-height: 18px;

        span {
            font-weight: 400 !important;
        }
    }
    .arrow {
        width: 20px;
        height: 20px;
        svg {
            color: var(--c-gray3);
            transition: all .1s linear;
        }
        &.is_open {
            svg {
                transform: rotate(180deg);
            }
        }
    }

    .dropdown_list {
        width: 100%;

        position: absolute;
        z-index: 1000;
        border-radius: 4px;
        background-color: white;
        margin-top: 6px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .dropdown_menu {
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        list-style-type: none;
        padding: 0;
        margin: 0;

       /* Стилизация скроллбара */
        &::-webkit-scrollbar {
            width: 6px; /* Ширина скроллбара */
        }

        /* Цвет фона скроллбара */
        &::-webkit-scrollbar-track {
            background-color: #f0f0f0;
        }

        /* Цвет ползунка скроллбара */
        &::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 6px; /* Скругление краёв ползунка */
            border: 1px solid #f0f0f0; /* Пустое пространство вокруг ползунка */
        }

        /* Цвет ползунка при наведении */
        /* ::-webkit-scrollbar-thumb:hover {
            background-color: #555;
        } */
    }
    
    .dropdown_menu li {
        padding: 5px 8px;
        cursor: pointer;

        font-size: 14px;
        font-weight: 500;
        line-height: 18px;

        span {
            font-weight: 400 !important;
        }
    }
    
    .dropdown_menu li:hover {
        background-color: #F8F9F9;
    }
    
    .dropdown_menu li.active {
        background-color: #f5f5f3;
    }
</style>
  