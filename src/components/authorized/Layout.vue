<template>
	<div class="layout authorized-layout">
		<router-view></router-view>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


<script>
export default {
	props: {
		msg: String
	}
}
</script>
