export const config = {
    "controlPanel": {
        "first": {
            "title": "Параметры помещения",
            "params": [
                { "id": 1, "min": 0.5, "max": 100, "name": "length", "styleType": "subtext", "label": "Длина, м", "defaultValue": 5 },
                { "id": 2, "min": 0.5, "max": 100, "name": "width", "styleType": "subtext", "label": "Ширина, м", "defaultValue": 5 },
                { "id": 4, "min": 0.5, "max": 20, "name": "room_height", "styleType": "subtext", "label": "Высота помещения, м", "defaultValue": 3 },
                { "id": 5, "min": 0.5, "max": 20, "name": "install_height", "styleType": "subtext", "label": "Высота установки, м", "defaultValue": 3  },
                { "id": 6, "min": 0, "max": 20, "name": "working_plane", "styleType": "subtext", "label": "Рабочая поверхность, м", "defaultValue": 0.8 }
            ]
        },
        "second": {
            "title": "Освещенность",
            "params": [
                { 
                    "id": 1, 
                    "name": "type-of-premises", 
                    "label": "Тип помещения", 
                    "type": "select",
                    "defaultValue": 0,
                    "isWithTitle": true,
                    "options": [
                        {
                            "id": 1,
                            "title": "ЖИЛЫЕ ЗДАНИЯ",
                            "list": [
                                { "id": 1, "value": 25, "label": "Лестницы (25 лк)" },
                                { "id": 2, "value": 75, "label": "Подземные паркинги (75 лк)" },
                                { "id": 3, "value": 100, "label": "Места общего пользования (100 лк)" }
                            ]
                        },
                        {
                            "id": 2,
                            "title": "ДЕТСКИЕ\/ОБРАЗОВАТЕЛЬНЫХ УЧРЕЖДЕНИЙ",
                            "list": [
                                { "id": 4, "value": 150, "label": "Фойе  и рекреации (150 лк)" },
                                { "id": 5, "value": 150, "label": "Бассейн (150 лк)" },
                                { "id": 6, "value": 200, "label": "Спортивные залы (200 лк)" },
                                { "id": 7, "value": 200, "label": "Актовый зал (200 лк)" },
                                { "id": 8, "value": 200, "label": "Столовая (200 лк)" },
                                { "id": 9231, "value": 500, "label": "Учебные аудитории (500 лк)" }
                            ]
                        }, 
                        {
                            "id": 3,
                            "title": "МЕДЕЦИНСКИЕ УЧРЕЖДЕНИЯ",
                            "list": [
                                { "id": 9, "value": 75, "label": "Вспомогательные помещения  (75 лк)" },
                                { "id": 10, "value": 100, "label": "Фойе, лестничные клетки (100 лк)" },
                                { "id": 11, "value": 150, "label": "Помещения хранения лекарственных средств (150 лк)" },
                                { "id": 12, "value": 150, "label": "Ожидальные помещения, палаты (150 лк)" },
                                { "id": 13, "value": 200, "label": "Регистратура (200 лк)" },
                                { "id": 14, "value": 500, "label": "Кабинеты врачей (500 лк)" },
                                { "id": 15, "value": 500, "label": "Лаболатории (500 лк)" },
                                { "id": 16, "value": 1000, "label": "Операционные помещения (1000 лк)" }
                            ] 
                        },
                        {
                            "id": 4,
                            "title": "РИТЕЙЛ",
                            "list": [
                                { "id": 17, "value": 75, "label": "Подземные паркинги (75 лк)" },
                                { "id": 18, "value": 75, "label": "Склад напольного хранения (75 лк)" },
                                { "id": 19, "value": 200, "label": "Склад стеллажного хранения (200 лк)" },
                                { "id": 20, "value": 300, "label": "Кассовая зона (300 лк)" },
                                { "id": 21, "value": 300, "label": "Димонстрационный зал (300 лк)" },
                                { "id": 22, "value": 500, "label": "Торговые залы (500 лк)" }
                            ]
                        },
                        {
                            "id": 5,
                            "title": "ОФИС \/ АДМИНИСТРАТИВНЫЕ ПОМЕЩЕНИЯ",
                            "list": [
                                { "id": 23, "value": 75, "label": "Подземные паркинги (75 лк)" },
                                { "id": 24, "value": 100, "label": "Архив (100 лк)" },
                                { "id": 25, "value": 200, "label": "Конференц-залы, переговорки (200 лк) " },
                                { "id": 26, "value": 200, "label": "Ресепшн (200 лк) " },
                                { "id": 27, "value": 300, "label": "Офисы (300 лк)" },
                                { "id": 28, "value": 400, "label": "Серверная (400 лк)" }
                            ]
                        },

                        {
                            "id": 6,
                            "title": "СФЕРА УСЛУГ",
                            "list": [
                                { "id": 29, "value": 75, "label": "Подземные паркинги (75 лк)" },
                                { "id": 30, "value": 75, "label": "Кладовые (75 лк) " },
                                { "id": 31, "value": 150, "label": "Фойе (150 лк)" },
                                { "id": 32, "value": 200, "label": "Зрительные залы (200 лк)" },
                                { "id": 33, "value": 300, "label": "Игровой зал (300 лк)" },
                                { "id": 34, "value": 300, "label": "Обеденная зона (300 лк)" },
                                { "id": 35, "value": 300, "label": "Кухни (300 лк)" },
                                { "id": 36, "value": 300, "label": "Прачечные (300 лк)" },
                                { "id": 37, "value": 500, "label": "Косметический кабинет (барбер шоп, салоны красоты) (500 лк)" },
                                { "id": 38, "value": 750, "label": "Ателье (750 лк)" }
                            ]
                        },

                        {
                            "id": 7,
                            "title": "ПРОИЗВОДСТВЕННЫЕ ОБЬЕКТЫ",
                            "list": [
                                { "id": 39, "value": 75, "label": "Склад напольного хранения (75 лк)" },
                                { "id": 40, "value": 200, "label": "Склад стеллажного хранения (200 лк)" },
                                { "id": 41, "value": 300, "label": "Зоны упаковки и комплектации (300 лк)" },
                                { "id": 42, "value": 300, "label": "Цех ручной сборки (300 лк)" },
                                { "id": 43, "value": 500, "label": "Слесарный цех (500 лк)" },
                                { "id": 44, "value": 750, "label": "Цех точных работ (шлифовка, ОТК, покраска, раскрой) (750 лк)" }
                            ]
                        }
                    ]
                },
                { 
                    "id": 2,
                    "name": "illumination-lk",
                    "label": "Освещенность, ЛК",
                    "styleType": "subtext",
                    "defaultValue": 200
                },
                { 
                    "id": 3, 
                    "name": "cleanliness-of-the-premises", 
                    "label": "Чистота помещения", 
                    "type": "select",
                    "defaultValue": 1.15,
                    "isWithTitle": false,
                    "options": [
                        { "id": 1, "value": 1.15, "label": "Очень чистое (коэф. запаса 1.15)" },
                        { "id": 2, "value": 1.3, "label": "Чистое (коэф. запаса 1.3)" },
                        { "id": 3, "value": 1.4, "label": "Нормальное (коэф. запаса 1.4)" },
                        { "id": 4, "value": 1.5, "label": "Грязное (коэф. запаса 1.5)" },
                        { "id": 5, "value": 1.75, "label": "Очень загрязненное (коэф. запаса 1.75)" }
                    ]
                }
            ]
        },
        "third": {
            "title": "Коэффициенты отражения",
            "disableds": {
                "ceiling": [
                    { "value": 80, "ids": [] },
                    { "value": 70, "ids": ["6083082A", "3336896IP"] },
                    { "value": 50, "ids": ["6083082A"] },
                    { "value": 30, "ids": ["6083082A", "6901577J"] }
                ],
                "wall": [
                    { "bind": 80, "value": 80,  "ids": ["6853589D", "9820190NC"] },
                    { "bind": 80, "value": 50,  "ids": ["6853589D", "9820190NC"] },
                    { "bind": 80, "value": 30, "ids": ["4554212QW", "6853589D"] },
                    { "bind": 70, "value": 50, "ids": ["4554212QW", "9820190NC"] },
                    { "bind": 50, "value": 50, "ids": ["4554212QW", "6853589D"] },
                    { "bind": 50, "value": 30, "ids": ["4554212QW", "6853589D"] },
                    { "bind": 30, "value": 30, "ids": ["4554212QW", "6853589D"] }
                ]
            },
            "params": [
                { 
                    "id": "2409167J", 
                    "name": "ceiling",
                    "label": "Тон потолка",
                    "options": [
                        { 
                            "id": "2424842ET", 
                            "item": "ceiling",
                            "label": "Белый / 80", 
                            "value": 80
                        },
                        { 
                            "id": "4942628N", 
                            "item": "ceiling",
                            "label": "Оч. светлый / 70", 
                            "value": 70
                        },
                        { 
                            "id": "7673090CU", 
                            "item": "ceiling",
                            "label": "Светлый / 50", 
                            "value": 50
                        },
                        { 
                            "id": "9982598C", 
                            "item": "ceiling",
                            "label": "Темный / 30", 
                            "value": 30
                        }
                    ] 
                },
                { 
                    "id": "1665515JZ", 
                    "label": "Тон стен",
                    "name": "wall",
                    "options": [
                        { 
                            "id": "6083082A", 
                            "item": "wall",
                            "label": "Белый / 80", 
                            "value": 80
                        },
                        { 
                            "id": "6901577J", 
                            "item": "wall",
                            "label": "Светлый / 50", 
                            "value": 50
                        },
                        { 
                            "id": "3336896IP", 
                            "item": "wall",
                            "label": "Темный / 30", 
                            "value": 30
                        }
                    ] 
                },
                {
                    "id": "3985755F", 
                    "name": "floor",
                    "label": "Тон пола",
                    "options": [
                        { 
                            "id": "4554212QW",
                            "item": "floor", 
                            "label": "Tемный / 30", 
                            "value": 30
                        },
                        { 
                            "id": "6853589D", 
                            "item": "floor", 
                            "label": "Оч. темный / 20", 
                            "value": 20
                        },
                        { 
                            "id": "9820190NC", 
                            "item": "floor", 
                            "label": "Черный / 10", 
                            "value": 10
                        }
                    ] 
                }
            ]
        }
    }
}