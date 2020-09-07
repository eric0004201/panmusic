<template>
	<div class="nav">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name:"NavBar"
	}
</script>

<style lang="scss" scoped>
	.nav{
		position: fixed;
		left: 0;
		top: 60px;
		width: 250px;
		bottom: 60px;
		background: #f5f3f8;
		overflow: auto;
		padding-top: 20px;
	}
</style>
