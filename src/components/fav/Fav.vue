<template>
	<div>
		<HomeFav v-if="!scrolled" />
		<ScrollTopFav v-else />
	</div>
</template>

<script>
	import HomeFav from "./HomeFav";
	import ScrollTopFav from "./ScrollTopFav";

	export default {
		name: "Fav",
		components: {ScrollTopFav, HomeFav},
		data: () => ({
			scrolled: false
		}),
		methods: {
			handleScroll() {
				this.scrolled = window.scrollY > 100;
			}
		},
		mounted() {
			document.addEventListener('scroll', this.handleScroll);
		},
		destroyed() {
			document.removeEventListener('scroll', this.handleScroll);
		},
	}
</script>

<style scoped>
div {
	position: fixed;
	top: 4vw;
	right: 4vw;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	background: #fbfbfb;
	box-shadow: 0 2px 8px #0000001f;
}
</style>