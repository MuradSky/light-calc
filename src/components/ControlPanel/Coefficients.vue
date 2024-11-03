<script setup>
    import { reactive, onMounted } from 'vue';
    import TitleControl from '../common/TitleControl.vue';
    import LabelControl from '../common/LabelControl.vue';
    import TagsControl from '../common/TagsControl.vue';
    import { store } from '@/store';
    
    const controlPanel = {...store.controlPanel.third};
    const params = reactive({
        ceiling: 80,
        wall: 80,
        floor: 30,
        
        wallDisabled: [],
        floorDisabled: [],
    });
     
    onMounted(()=> {
        setCeiling(params.ceiling);
        setWall(params.ceiling, params.wall);
    });

    const selectTone = ({ name, value }) => {
        params[name] = value;
        setCeiling(params.ceiling);
        setWall(params.ceiling, params.wall);
    };

    function setCeiling(ceiling) {
        controlPanel.disableds.ceiling.forEach(item => {
            if (ceiling === item.value) {
                params.wallDisabled = item.ids;
            }
        });
    }

    function setWall(ceiling, wall) {
        controlPanel.disableds.wall.forEach(item => {
            if (ceiling === item.bind && wall === item.value) {
                params.floorDisabled = item.ids;
            }
        });
    }

</script>

<template>
    <div :class="cn.block">
        <div :class="cn.head">
            <TitleControl :text="controlPanel.title" />
        </div>
        <div :class="cn.body">
            <div :class="cn.row" v-for="item,  in controlPanel.params" :key="item.id">
                <LabelControl :cssClass="cn.label" :text="item.label" />
                <div :class="cn.control">
                    <TagsControl
                        :options="item.options"
                        :params="params"
                        :name="item.name"
                        :active="params[item.name]"
                        :disables="params[item.name+'Disabled'] || []"
                        @selectTone="selectTone"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss" module="cn">
    .block {
        margin-bottom: 11px;
    }

    .label {
        margin-bottom: 6px;
    }

    .head {
        margin-bottom: 6px;
    }

    .body {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>