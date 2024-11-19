<script setup>
    import { onMounted, reactive } from 'vue';
    import TitleControl from '../common/TitleControl.vue';
    import LabelControl from '../common/LabelControl.vue';
    import ButtonControl from '../common/ButtonControl.vue';
    import InputControl from '../common/InputControl.vue';
    import { store } from '@/store';
    const controlPanel = {...store.controlPanel.first};
    const params = reactive(controlPanel.params);
    
    onMounted(()=> {
        initParams(params);
    });

    function initParams(params) {
        params?.forEach(item => {
            store.room[item.name] = item.defaultValue;
        });
    }

    function updateParam(name, value) {
        store.room[name] = value;
    }

    function updateBind(id, name,  value) {
        const light = params.find(item => item.id === id);
        light.defaultValue = value;
        updateParam(name, light.defaultValue);
    }

    const decriment = (id) => {
        const item = params.find(item => item.id === id);
        if (+item.defaultValue <= item.min) return;
        item.defaultValue = +Number.parseFloat(item.defaultValue - 0.1).toFixed(1);
        updateParam(item.name, item.defaultValue);
        if (id == 4) {
            updateBind(5, 'install_height', item.defaultValue);
        } 
       
    }

    const incriment = (id) => {
        const item = params.find(item => item.id === id);
        if (+item.defaultValue >= item.max) return;
        item.defaultValue = +Number.parseFloat(item.defaultValue + 0.1).toFixed(1);
        updateParam(item.name, item.defaultValue);
        if (id == 4) {
            updateBind(5, 'install_height', item.defaultValue);
        }
         if (id == 5 && item.defaultValue > store.room.room_height) {
            updateBind(4, 'room_height', item.defaultValue);
        }
    }   

    const onChange = ([value, name])=> {
        const item = params.find(item => item.name === name);
        item.defaultValue = value;
        updateParam(item.name, item.defaultValue);
        if (name == 'room_height') {
            updateBind(5, 'install_height', item.defaultValue);
        }
        if (name == 'install_height' && item.defaultValue > store.room.room_height) {
            updateBind(4, 'room_height', item.defaultValue);
        }
    }
</script>

<template>
    <div :class="cn.block">
        <div :class="cn.head">
            <TitleControl :text="controlPanel.title" />
        </div>
        <div :class="cn.body">
            <div :class="cn.row" v-for="item,  in params" :key="item.id">
                <LabelControl :text="item.label" />
                <div :class="cn.control">
                    <ButtonControl :type="'minus'" @click="decriment(item.id)" />
                    <InputControl 
                        :name="item.name"
                        :min="item.min"
                        :max="item.max"
                        :value="item.defaultValue"
                        @onChange="onChange"  
                    />
                    <ButtonControl :type="'plus'" @click="incriment(item.id)" />
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
        gap: 24px;
    }

    .control {
        gap: 6px;
    }
</style>