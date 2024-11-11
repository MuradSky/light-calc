<script setup>
    import { ref, reactive, watch } from 'vue';
    import TitleControl from '../common/TitleControl.vue';
    import LabelControl from '../common/LabelControl.vue';
    import ButtonControl from '../common/ButtonControl.vue';
    import InputControl from '../common/InputControl.vue';
    import SelectControl from '../common/SelectControl.vue';
    import { store } from '@/store';
    
    const controlPanel = {...store.controlPanel.second};
    const params = reactive(controlPanel.params);
    const illuminationValue = ref(0);
    
    const decriment = () => {
        if (illuminationValue.value > 5) {
            illuminationValue.value--;
        }
    }

    const incriment = () => {
        illuminationValue.value++;
    }

    const onChange = ([value])=> {
        illuminationValue.value = +value;
    }

    const updateSelect = ([name, value]) => {
            
        if (name === 'type-of-premises') {
            illuminationValue.value = value;
        }
        if (name === 'cleanliness-of-the-premises') {
            store.illumination.premises = value;
        }
    }

    watch(illuminationValue, newVal => {
        store.illumination.lk = newVal;
    });
</script>

<template>
     <div :class="cn.block">
        <div :class="cn.head">
            <TitleControl :text="controlPanel.title" />
        </div>
        <div :class="cn.body">
            <div 
                :class="[cn.row, item.type === 'select' && cn.row_sec ]" 
                v-for="item,  in params" 
                :key="item.id"
            >
                <LabelControl :text="item.label" />
                <div :class="cn.control" v-if="item.type !== 'select'">
                    <ButtonControl :type="'minus'" @click="decriment(item.id)" />
                    <InputControl 
                        :value="illuminationValue" 
                        :min="5"
                        @onChange="onChange" 
                    />
                    <ButtonControl :type="'plus'" @click="incriment(item.id)" />
                </div>
                <div :class="cn.control" v-if="item.type === 'select'">
                    <SelectControl 
                        @update:modelValue="updateSelect"
                        :modelValue="item.defaultValue"
                        :options="item.options"
                        :name="item.name"
                        :isWithTitles="item.isWithTitle"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss" module="cn">
    .block {
        margin-bottom: 16px;
    }

    .head {
        margin-bottom: 8px;
    }
    .body {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .control,
    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .row {
        gap: 4px;
    }

    .row_sec {
        align-items: flex-start;
        flex-direction: column;

        .control {
            width: 100%;
            display: block;
        }
    }

    .control {
        gap: 6px;
    }
</style>