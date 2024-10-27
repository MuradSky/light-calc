<script setup>
    import { watch, onBeforeMount, ref } from 'vue';
    const props = defineProps(['options', 'name', 'params', 'active', 'disables']);
    const emit = defineEmits(['selectTone']);
 
    onBeforeMount(() => {
        const fl = props.options.find(item => !props.disables[item.id]);
        if (fl) {
            emit('selectTone', {
                name: fl.item,
                value: fl.value,
            });
        }
    });

    // console.log(props);

    watch(()=> props.disables, disables => {
        const fl = props.options.find(item => item.item !== 'ceiling' && !disables.includes(item.id));
    
        if (!!fl) {
            emit('selectTone', {
                name: fl.item,
                value: fl.value,
            });
        }
    });

    const isDisabled = (id) => {
        return props.disables.includes(id);
    }

    const onClick = (name, value) => {
        emit('selectTone', {
            name,
            value,
        });
    }
</script>

<template>
    <div :class="cn.tags">
        <button 
            v-for="item in options" 
            :class="[cn.btn, (active === item.value) && cn.is_active]" 
            :key="item.id"
            :disabled="isDisabled(item.id)"
            @click="onClick(item.item, item.value)"    
        >   
            {{ item.label }}
        </button>
    </div>
</template>

<style scoped lang="scss" module="cn">
    .tags {
       display: flex;
       flex-wrap: wrap;
       gap: 2px 15px;
    }

    .btn {
        white-space: nowrap;
        position: relative;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        text-align: left;
        color: var(--c-gray3);
        transition: all .1s linear;

        &:hover {
            color: var(--c-dark);
            opacity: .7;
        }

        &.is_active {
            color: var(--c-dark);
            opacity: 1;
            &::after {
                opacity: 1;
            }
        }

        &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 2px;
            z-index: 10;
            height: 1px;
            width: 100%;
            transition: all .1s linear;
            background-color: var(--c-dark);
            opacity: 0;
        }
    }
</style>