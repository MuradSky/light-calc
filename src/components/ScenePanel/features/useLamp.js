import * as THREE from 'three';
import { store } from '../../../store';

const useLamp = (scene) => {
    const width = .4;
    const deph = .4;
    let lampsTop = null;
    let lampsBottom = null;
    // Геометрия для светильников
    const lampGeometry = new THREE.BoxGeometry(width, 0.05, deph); // Размеры светильника
    const glasGeometry = new THREE.BoxGeometry(width-.1, 0.05, deph-.1); // Размеры светильника

    // Создаем материалы для верхней и нижней стороны
    const lampMaterialTop = new THREE.MeshStandardMaterial({
        color: 'grey', // Желтый для верхней стороны
        emissive: 'grey', // Светящийся материал
        emissiveIntensity: 1,
        side: THREE.FrontSide,  // Применяется только для верхней стороны
    });

    const lampMaterialBottom = new THREE.MeshStandardMaterial({
        color: 0xffffff, // Белый для нижней стороны
        emissive: 0xffffff, // Светящийся материал
        emissiveIntensity: 1,
        side: THREE.FrontSide, // Применяется только для нижней стороны
    });

    // Функция для обновления светильников
    function updateLamps(
        roomWidth,
        lampHeight,
        roomDepth,
        lampCount,
        margin = 0
    ) {
        // Рассчитываем доступные размеры с учетом отступа
        const usableWidth = roomWidth - 2 * margin;
        const usableDepth = roomDepth - 2 * margin;

        // Определяем количество рядов и колонок
        const lampsPerRow = Math.ceil(Math.sqrt(lampCount * (usableWidth / usableDepth)));
        const lampsPerColumn = Math.ceil(lampCount / lampsPerRow);

        // Пересчитываем итоговое количество светильников
        const totalLamps = lampsPerRow * lampsPerColumn;

        // Если количество светильников изменилось, пересоздаем InstancedMesh
        if (!lampsTop || lampsTop.count !== totalLamps) {
            if (lampsTop) scene.remove(lampsTop); // Удаляем предыдущий InstancedMesh верхних сторон
            lampsTop = new THREE.InstancedMesh(lampGeometry, lampMaterialTop, totalLamps); // Создаем для верхней стороны
            scene.add(lampsTop);
        }

        if (!lampsBottom || lampsBottom.count !== totalLamps) {
            if (lampsBottom) scene.remove(lampsBottom); // Удаляем предыдущий InstancedMesh нижних сторон
            lampsBottom = new THREE.InstancedMesh(glasGeometry, lampMaterialBottom, totalLamps); // Создаем для нижней стороны
            scene.add(lampsBottom);
        }

        // Рассчитываем шаги между светильниками
        const xStep = usableWidth / (lampsPerRow + 1); // +1 для учета отступов от стен
        const zStep = usableDepth / (lampsPerColumn + 1); // +1 для учета отступов от стен

        let index = 0;
        for (let row = 0; row < lampsPerRow; row++) {
            for (let col = 0; col < lampsPerColumn; col++) {
                if (index >= totalLamps) break;

                // Рассчитываем позиции
                const x = -roomWidth / 2 + margin + (row + 1) * xStep; // Сдвигаем на 1 шаг, чтобы отступы были от стен
                const z = -roomDepth / 2 + margin + (col + 1) * zStep; // Сдвигаем на 1 шаг, чтобы отступы были от стен

                // Центрируем светильники для одного ряда или одной колонки
                const adjustedX = lampsPerRow === 1 ? 0 : x; // По центру по оси X, если один ряд
                const adjustedZ = lampsPerColumn === 1 ? 0 : z; // По центру по оси Z, если одна колонка

                // Устанавливаем матрицы для верхнего и нижнего экземпляров
                const matrixTop = new THREE.Matrix4();
                matrixTop.setPosition(adjustedX, lampHeight, adjustedZ);
                lampsTop.setMatrixAt(index, matrixTop); // Для верхней стороны

                const matrixBottom = new THREE.Matrix4();
                matrixBottom.setPosition(adjustedX, lampHeight - 0.03, adjustedZ); // Нижний светильник чуть ниже
                lampsBottom.setMatrixAt(index, matrixBottom); // Для нижней стороны

                index++;
            }
        }

        store.lightCountFromScene = index;
        // Обновляем матрицы для верхнего и нижнего светильников
        lampsTop.instanceMatrix.needsUpdate = true;
        lampsBottom.instanceMatrix.needsUpdate = true;
    }

    return {
        updateLamps,
    };
};

export { useLamp };