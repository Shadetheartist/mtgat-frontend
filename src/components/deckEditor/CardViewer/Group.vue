<template>
	<div class="card-viewer-group" v-show="showGroup">
		<div class="group-header">Mana Value: {{groupKey}}</div>
		<magic-card v-for="card in orderedGroup" :id="card.id" :key="card.id"></magic-card>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card-viewer-group {
	.group-header {
		padding: 8px;
		background: white;
		text-align: center;
	}
}
</style>


<script>
import MagicCard from "@/components/MagicCard";
import _ from "lodash";
import {mapGetters, mapState} from "vuex";

export default {
	components: {
		MagicCard
	},
	props: {
		groupKey: String,
		group: Array
	},
	data: () => {
		return {
		}
	},
	computed: {
		...mapState('deckEditor', {
			cards: state => state.cards
		}),
		...mapGetters('deckEditor', {
			filteredCards: 'filteredCards',
		}),
		orderedGroup(){
			return _.orderBy(this.group, e => e.name)
		},
		showGroup(){
			return _.size(_.filter(this.group, e => {
				return !!this.filteredCards[e.id]
			})) > 0
		}
	},
	methods: {

	},
	mounted() {

	}
}
</script>
