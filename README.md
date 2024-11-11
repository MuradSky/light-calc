# Vue 3 + Vite

## Стек

```bash
    Vue 3
    Three.js
    Scss
```

## Зависимости, установка и запуск

```bash
    npm i <установка>
    npm run dev <Запуск проекта в режиме разработки>
    npm run build <Сборка продакшн бандла в prod окружении>
    npm run preview <апуск продакшн сборки>
```

## Инструкция по интеграции на сайт

1. запускаем команду сборки бандла `npm run build`
2. на саые там где хотим интегрировать калк пишет разметку для привязки скирптов пример:

```html
<body>
  <div id="light-calc-app"></div>
</body>
```

3. снизу привязываем скрипты и стили, которые собрались по команде `npm run build` в папке dist/assets

```html
<link
  rel="stylesheet"
  crossorigin
  href="{you-root}/3d-calc-app/dist/assets/index-DChfiRgA.css"
/>
<script
  type="module"
  crossorigin
  src="{you-root}/3d-calc-app/dist/assets/index-CkKvcd2o.js"
></script>
```

## Сборка продакшен подключается как обычный скрипт
