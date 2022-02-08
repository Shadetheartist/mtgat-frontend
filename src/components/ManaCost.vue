<template>
	<div class="mana-cost" title="thanks to https://www.slightlymagic.net/forum/viewtopic.php?t=4430">
		<div class="symbols">
			<cost-symbol v-for="(symbol, i) in symbols" :symbol="symbol" :key="i"></cost-symbol>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mana-cost {
	display: flex;
	align-items: center;
	.symbols {
		display: flex;

		.cost-symbol {
			margin-right: 1px;
		}
	}
}
</style>


<script>


import _ from "lodash";
import CostSymbol from "./CostSymbol";

export default {
	components: {
		CostSymbol
	},
	props: {
		cost: {
			type: String
		}
	},
	data: () => {
		return {

		}
	},
	computed: {
		symbols(){
			return _.filter(_.split(this.cost, /(.*?})/g), e => e !== '')
		},
	},
	methods: {

	},
	mounted() {

	}
}
</script>
