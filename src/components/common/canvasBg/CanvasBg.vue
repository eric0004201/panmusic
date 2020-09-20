<template>
	<div><canvas id="canvas" width="1400" height="600"></canvas></div>
</template>

<script>
	import { cinit } from './canvasBg.js'
	export default{
		name:"CanvasBg",
		mounted() {
			cinit()
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
