<template>
	<div id="app">
		<Fav />
		<router-view />
	</div>
</template>

<script>
	import HelloWorld from './components/HelloWorld.vue';
	import Fav from "./components/fav/Fav";

	export default {
		name: 'App',
		components: {
			Fav,
			HelloWorld,
		}
	}
</script>

<style>
	html,
	body {
		margin: 0;
	}

	body {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

	#app {
		position: relative;
	}
</style>
