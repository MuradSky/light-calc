<script setup>
	import Layout from './components/Layout.vue';
	// console.log(import.meta.env.DEV)
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
