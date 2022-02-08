<template>
	<ul id="context-menu" class="md-shadow-2" v-show="!contextMenu.disabled && contextMenu.show" :style="`top: ${ contextMenu.pos.y }px; left: ${ contextMenu.pos.x}px;`">
		<li v-for="option in contextMenu.options" :key="option.label" @click="option.callback">{{ option.label }}</li>
	</ul>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "/src/assets/sass/material-design";
#context-menu {

	position: absolute;
	z-index: 100;
	background-color: white;
	margin: 0;
	padding: 2px 0;
	list-style: none;
	font-size: 12px;
	color: black;
	li {
		cursor: pointer;
		padding: 4px 16px 4px 16px;
		&:hover {
			background-color: #e5e5e5;
		}
	}
}
</style>


<script>
import {mapState} from 'vuex'

import _ from "lodash";

export default {
	components: {
	},
	props: {
		msg: String
	},
	data: () => {
		return {

		}
	},
	computed: {
		...mapState('deckEditor', {
			contextMenu: state => state.contextMenu
		}),
	},
	methods: {

	},
	mounted() {

	}
}
</script>
