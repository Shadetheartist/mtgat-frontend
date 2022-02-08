<template>
		<div class="deck-summary">
			<div class="tags">
				<div class="title">Tags</div>
				<div class="list">
					<summary-item v-for="kv in tagSummary" :key="kv.key" :kv="kv" :filter-data="filters.tags" @select="handleTagClick"></summary-item>
				</div>
			</div>

			<div class="types">
				<div class="title">Types</div>
				<div class="list">
					<summary-item v-for="kv in typeSummary" :key="kv.key" :kv="kv" :filter-data="filters.types" @select="handleTypeClick"></summary-item>
				</div>
			</div>

			<div class="subtypes" v-show="showSubtypes">
				<div class="title">Subtypes</div>
				<div class="list">
					<summary-item v-for="kv in subtypeSummary" :key="kv.key" :kv="kv" :filter-data="filters.subtypes" @select="handleSubtypeClick" ></summary-item>
				</div>
			</div>

			<div class="keyword-abilities">
				<div class="title">Keyword Abilities</div>
				<div class="list">
					<summary-item v-for="kv in keywordSummary" :key="kv.key" :kv="kv" :filter-data="filters.keywords" @select="handleKeywordClick"></summary-item>
				</div>
			</div>
		</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.deck-summary {
	background-color: #ffd5d5;

	.tags {
		white-space: nowrap;
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>


<script>
import SummaryItem from "@/components/deckEditor/DeckSummary/SummaryItem";
import _ from "lodash";
import {mapGetters, mapState} from "vuex";

export default {
	components: {
		SummaryItem,
	},
	props: {
		msg: String
	},
	data: () => {
		return {
			graph: {}
		}
	},
	computed: {
		...mapState('deckEditor', {
			cards: state => state.cards,
			cardAnalysis: state => state.cardAnalysis,
			filters: state => state.filters
		}),
		...mapGetters('deckEditor', {
			filteredCards: 'filteredCards',
		}),

		tagSummary() {
			return this.summarize(this.$store.getters['deckEditor/invertedTagGraph'])
		},

		keywordSummary() {
			return this.summarize(this.$store.getters['deckEditor/invertedKeywordGraph'])
		},

		typeSummary() {
			return this.summarize(this.$store.getters['deckEditor/invertedTypeGraph'])
		},
		subtypeSummary() {
			return _.filter(this.summarize(this.$store.getters['deckEditor/invertedSubtypeGraph']), e => e.value > 0)
		},
		showSubtypes(){
			return (_.size(this.filters.types) > 0 || _.size(this.filters.subtypes)) && _.sum(_.map(this.subtypeSummary, e => e.value)) > 0
		}
	},
	methods: {
		handleTagClick(kv){
			console.log('select tag', kv)
			this.$store.commit('deckEditor/toggleFilter', {
				filterSelect: (filters) => filters.tags,
				filterKey: kv.key
			})
		},
		handleTypeClick(kv){
			this.$store.commit('deckEditor/toggleFilter', {
				filterSelect: (filters) => filters.types,
				filterKey: kv.key
			})
		},
		handleSubtypeClick(kv){
			this.$store.commit('deckEditor/toggleFilter', {
				filterSelect: (filters) => filters.subtypes,
				filterKey: kv.key
			})
		},
		handleKeywordClick(kv){
			this.$store.commit('deckEditor/toggleFilter', {
				filterSelect: (filters) => filters.keywords,
				filterKey: kv.key
			})
		},

		summarize(data){
			const kv = _.map(data, (e, k) => {
				return {key: k, value: _.sum(_.map(e, (f, id) => {
						if(!this.filteredCards[id]){
							return 0
						}

						return f
					}))}
			})

			return _.orderBy(kv, e => e.key, 'desc')
		}
	},
	mounted() {

	}
}
</script>
