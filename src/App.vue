<script setup>
	import { onMounted, watch } from 'vue';
	import Layout from './components/Layout.vue';
	import { store } from './store';

	window.setLuminousFlux = (value) => {
		store.luminous_flux = value;
	}

	onMounted(() => {
		const lightCount = document.querySelector('[data-selector="light.count"]');
		const lightCountScene = document.querySelector('[data-selector="light.count.scene"]');
		const roomArea = document.querySelector('[data-selector="room.area"]');

		lightCount.innerText = store.lightCount; 
		lightCountScene.innerText = store.lightCountFromScene; 
		roomArea.innerText = +Number.parseFloat(store.room.length * store.room.width).toFixed(1);

		window.dispatchEvent(new CustomEvent('light.count.scene', {
			detail: store.lightCountFromScene
		}))
	});

	watch(store, newVal => {
		const lightCount = document.querySelector('[data-selector="light.count"]');
		const roomArea = document.querySelector('[data-selector="room.area"]');
		const lightCountScene = document.querySelector('[data-selector="light.count.scene"]');

		lightCount.innerText = newVal.lightCount; 
		lightCountScene.innerText = store.lightCountFromScene; 
		roomArea.innerText = +Number.parseFloat(newVal.room.length * newVal.room.width).toFixed(1);

		window.dispatchEvent(new CustomEvent('light.count.scene', {
			detail: store.lightCountFromScene
		}))
	});
</script>

<template>
	<Layout />
</template>

<style global>
	:root {
		--c-gray: #F8F9F9;
		--c-dark: #3C3D3A;
		--c-gray2: #767775;
		--c-gray3: #B1B1B0;
	}

	*, *::before, *::after {
		box-sizing: border-box;
	}

	button {
		background: transparent;
		cursor: pointer;
		padding: 0;
		outline: none;
		border: 0;
	}

	input {
		background-color: transparent;
		border: 0;
		outline: none !important;
	}
</style>

<style scoped>

</style>
