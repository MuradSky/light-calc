import { reactive, watch } from "vue";
import { config } from './config';

export const store = reactive({
    ...config,
    room: {},
    illumination: {
        lk: 200,
        premises: 1.15,
    },
    coefficients: {},
    lightCount: 1,
    totalLightCount: 1,
    luminous_flux: 1650,
    lightCountFromScene: 0,
    usage_coef: 0,
});

export const matrix = {
    "0/0/0": { "1.25": "55", "1.0": "47", "2.0": "68", "3.0": "79", "4.0": "83", "5.0": "86", "0.8": "39", "0.6": "30", "2.5": "74", "1.5": "61" },
    "30/30/10": { "1.25": "62", "1.0": "53", "2.0": "74", "3.0": "84", "4.0": "88", "5.0": "91", "0.8": "46", "0.6": "37", "2.5": "80", "1.5": "67" },
    "50/30/10": { "1.25": "63", "1.0": "54", "2.0": "76", "3.0": "86", "4.0": "89", "5.0": "93", "0.8": "47", "0.6": "37", "2.5": "81", "1.5": "68" },
    "50/50/10": { "1.25": "69", "1.0": "61", "2.0": "80", "3.0": "89", "4.0": "92", "5.0": "95", "0.8": "54", "0.6": "44", "2.5": "85", "1.5": "74" },
    "70/50/20": { "1.25": "73", "1.0": "64", "2.0": "86", "3.0": "96", "4.0": "100", "5.0": "104", "0.8": "56", "0.6": "46", "2.5": "92", "1.5": "79" },
    "80/30/10": { "1.25": "64", "1.0": "55", "2.0": "78", "3.0": "88", "4.0": "92", "5.0": "95", "0.8": "48", "0.6": "38", "2.5": "83", "1.5": "70" },
    "80/50/30": { "1.25": "78", "1.0": "68", "2.0": "93", "3.0": "105", "4.0": "111", "5.0": "115", "0.8": "59", "0.6": "48", "2.5": "100", "1.5": "85" },
    "80/80/30": { "1.25": "100", "1.0": "92", "2.0": "111", "3.0": "118", "4.0": "121", "5.0": "123", "0.8": "85", "0.6": "74", "2.5": "115", "1.5": "105" }
}

export const params = {
    length: 5,
    width: 5,
    room_height: 3,
    working_plane: 0.8,
    reflection_coefficient: '80/80/30',
    reserve_coefficient: 1.4,
    illumination_lk: 25,
    luminous_flux: 1650,
}

const findClosest = (array, target) => {
    let closest = null;
    array.forEach(array => {
        let number = Number(array);
        if (closest == null || Math.abs(number - target) < Math.abs(closest - target)) {
            closest = number;
        }
    });
    return closest;
}

const space = (p) => {
    return p.width * p.length;
}

export function calculate(params) {
    let _space = space(params);
    let lamp_reflection = matrix[params.reflection_coefficient];
    let room_index = _space / ((params.room_height - params.working_plane) * (params.width + params.length));
    let closest_room_index = findClosest(Object.keys(lamp_reflection), room_index);

    if (closest_room_index % 1 === 0) {
        closest_room_index = closest_room_index.toFixed(1);
    }

    let usage_coef = lamp_reflection[closest_room_index] / 100;
    let qty = Math.ceil(params.illumination_lk * _space * params.reserve_coefficient / (params.luminous_flux * usage_coef));
    qty = qty === Infinity ? 0 : qty;
    
    store.usage_coef = usage_coef;
    store.lightCount = qty;
}

let timeOut = null;

watch(store, store => {    
    params.length = store.room.length;
    params.width = store.room.width;
    params.room_height = store.room.room_height;
    params.working_plane = store.room.working_plane;
    params.illumination_lk = store.illumination.lk;
    params.reserve_coefficient = store.illumination.premises;
    params.reflection_coefficient = store.coefficients.ceiling + '/' + store.coefficients.wall + '/' + store.coefficients.floor;
    params.luminous_flux = +store.luminous_flux;

    timeOut && clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        calculate(params);
    }, 100);
});