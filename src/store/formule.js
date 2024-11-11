export const matrix = {
    "0/0/0": { "1.25": "44", "1.0": "36", "2.0": "55", "3.0": "65", "4.0": "70", "5.0": "73", "0.8": "30", "0.6": "23", "2.5": "61", "1.5": "49" },
    "30/30/10": { "1.25": "51", "1.0": "43", "2.0": "63", "3.0": "72", "4.0": "76", "5.0": "80", "0.8": "37", "0.6": "29", "2.5": "68", "1.5": "56" },
    "50/30/10": { "1.25": "51", "1.0": "44", "2.0": "64", "3.0": "74", "4.0": "79", "5.0": "82", "0.8": "38", "0.6": "29", "2.5": "70", "1.5": "57" },
    "50/50/10": { "1.25": "58", "1.0": "51", "2.0": "70", "3.0": "79", "4.0": "83", "5.0": "86", "0.8": "44", "0.6": "36", "2.5": "75", "1.5": "63" },
    "70/50/20": { "1.25": "61", "1.0": "53", "2.0": "75", "3.0": "85", "4.0": "90", "5.0": "94", "0.8": "46", "0.6": "37", "2.5": "81", "1.5": "67" },
    "80/30/10": { "1.25": "53", "1.0": "45", "2.0": "66", "3.0": "77", "4.0": "82", "5.0": "86", "0.8": "38", "0.6": "30", "2.5": "72", "1.5": "58" },
    "80/50/30": { "1.25": "64", "1.0": "55", "2.0": "80", "3.0": "93", "4.0": "99", "5.0": "104", "0.8": "48", "0.6": "38", "2.5": "87", "1.5": "71" },
    "80/80/30": { "1.25": "89", "1.0": "81", "2.0": "101", "3.0": "110", "4.0": "114", "5.0": "116", "0.8": "73", "0.6": "63", "2.5": "106", "1.5": "94" }
}

export const params = {
    length: 5,
    width: 5,
    room_height: 3,
    working_plane: 0.8,
    reflection_coefficient: '80/80/30',
    reserve_coefficient: 1.4,
    illumination_lk: 25,
    luminous_flux: 3000,
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

const space = () => {
    return params.width * params.length;
}

export function calculate() {
    let _space = space();
    let lamp_reflection = matrix[params.reflection_coefficient];
    let room_index = _space / ((params.height - params.working_plane) * (params.width + params.length));
    let closest_room_index = findClosest(Object.keys(lamp_reflection), room_index);

    if (closest_room_index % 1 === 0) {
        closest_room_index = closest_room_index.toFixed(1);
    }

    let usage_coef = lamp_reflection[closest_room_index] / 100;
    let qty = Math.ceil(params.illumination_lk * _space * params.reserve_coefficient / (params.luminous_flux * usage_coef));
    qty = qty === Infinity ? 0 : qty;

    console.log(qty);
}