import { reactive, watch } from "vue";
import config from './config.json';

export const store = reactive({
    ...config,
    room: {},
    illumination: {},
});


watch(store, store => {
    console.log(store);
});