<template>
	<div class="card-viewer">

		<div class="synergy-web" v-if="synergyWeb.show">
			<svg height="100%" width="100%">
				<line v-for="(line, index) in synergyWeb.lines" :key="'web-line-' + index" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" :style="'stroke:' + line.color + ';stroke-width:2'"/>
			</svg>
		</div>

		<div class="actions">
			<button @click="handleMinimizeAllClick">Minimize All</button>
			<button @click="handleMaximizeAllClick">Maximize All</button>
		</div>
		<div class="view">
			<div class="groups">
				<div class="group-container" v-for="groupKey in groupKeys" :key="groupKey">
					<card-viewer-group :group-key="groupKey" :group="groups[groupKey]"></card-viewer-group>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card-viewer {
	position: relative;
	width: calc(100vw - 245px);
	height: 100%;

	::-webkit-scrollbar {
		display: none;
	}

	.synergy-web  {
		position: absolute;
		z-index: 1;
		pointer-events: none;
		width: 100%;
		height: 100%;
	}

	.view {
		overflow: scroll;
		height: 100%;
		padding: 8px;
		padding-bottom: 120px;
	}
	.groups {
		display: flex;

		.group-container {
			margin-left: 4px;
			margin-right: 4px;
		}
	}
}
</style>


<script>
import MagicCard from "@/components/MagicCard";
import CardViewerGroup from "./Group";
import _ from "lodash";
import {mapState, mapGetters} from "vuex";

export default {
	components: {
		//MagicCard,
		CardViewerGroup
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
			cards: state => state.cards,
			cardAnalysis: state => state.cardAnalysis,
			selectedTags: state => state.filters.tags,
			synergyWeb: state => state.synergyWeb,
		}),

		...mapGetters('deckEditor', {
			filteredCards: 'filteredCards',
			invertedTagGraph: 'invertedTagGraph'
		}),
		groups(){
			return _.groupBy(this.cards, e => e.manavalue)
		},
		groupKeys(){
			return Object.keys(this.groups)
		}
	},
	methods: {
		buildWebLines() {
			const cardId = this.synergyWeb.cardId
			const web = []
			const containerCardRect = this.$el.getBoundingClientRect()
			const cardElem = document.getElementById('card-' + cardId)
			const cardRect = cardElem.getBoundingClientRect()
			const cardAnalysis = this.cardAnalysis[cardId]

			for (const t in cardAnalysis.tags) {
				const cards = this.invertedTagGraph[t]

				for (const otherCardId in cards) {
					if (cardId == otherCardId) {
						continue
					}

					const otherCardElem = document.getElementById('card-' + otherCardId)
					const otherCardRect = otherCardElem.getBoundingClientRect()
					web.push({
						cardId1: cardId,
						cardId2: parseInt(otherCardId),
						x1: cardRect.x + cardRect.width / 2 - containerCardRect.x,
						y1: cardRect.y + cardRect.height / 2 - containerCardRect.y,
						x2: otherCardRect.x + otherCardRect.width / 2 - containerCardRect.x,
						y2: otherCardRect.y + otherCardRect.height / 2 - containerCardRect.y,
						color: 'red'
					})
				}
			}

			this.synergyWeb.lines = web
		},
		handleMinimizeAllClick(){
			for(const c in this.cards){
				this.$store.commit('deckEditor/minimize', c)
			}
		},
		handleMaximizeAllClick(){
			for(const c in this.cards){
				this.$store.commit('deckEditor/maximize', c)
			}
		}
	},
	watch: {
		'synergyWeb.show'(newVal){
			if(newVal){
				this.buildWebLines()
			}
		}
	},
	mounted() {

	}
}
</script>
