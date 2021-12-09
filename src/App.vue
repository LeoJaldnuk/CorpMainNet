<template>
	<div id="app">
		<header />
		<router-view />
		<footer />
	</div>
</template>

<script>
import Header from "components/Header.vue";
import Footer from "components/Footer.vue";

export default {
	name: "App",
	components: {
		Header,
		Footer,
	},
};
</script>

<style>

</style>