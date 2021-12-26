<template>
	<div id="app">
		<the-header />
		<router-view />
		<the-footer />
	</div>
</template>

<script>
import TheHeader from "./components/Header.vue";
import TheFooter from "./components/Footer.vue";

export default {
	name: "App",
	components: {
		TheHeader,
		TheFooter,
	},
};
</script>

<style>

</style>