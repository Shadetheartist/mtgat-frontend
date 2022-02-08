<template>
	<div
			class="summary-tag"
			:class="{'selected': isSelected, 'clickable': isClickable}"
			v-if="kv"
			>
		<div @click="handleClick">
			{{kv.key}} {{kv.value}}
		</div>

		<div class="sub-items" v-if="isSelected">
			<summary-item v-for="skv in subItems" :kv="skv" :key="kv.key + '-' + skv.key" :filter-data="subFilterData" @select="handleSubSelect"></summary-item>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.summary-tag {
		cursor: pointer;
		padding: 4px 8px;
		margin-bottom: 4px;

		&.selected {
			background: rgba(0, 0, 0, 0.2);
		}

		&.clickable {
			pointer-events: none;
			opacity: 0.5;
		}
	}
</style>


<script>
import _ from "lodash";
import SummaryItem from "./SummaryItem"
import {mapGetters, mapState} from "vuex";

export default {
	components: {
		SummaryItem
	},
	props: {
		kv: Object,
		filterData: Object,
	},
	data: () => {
		return {
		}
	},
	computed: {
		...mapState('deckEditor', {
			subFilterData: function (state) {
				return this.filterData[this.kv.key]
			}
		}),
		...mapGetters('deckEditor', {
			filteredCards: 'filteredCards',
		}),
		isSelected(){
			if(!this.filterData){
				return false
			}
			return this.filterData[this.kv.key]
		},
		isClickable(){
			return this.kv.value === 0
		},
		subItems(){
			const graph = this.$store.getters['deckEditor/invertedSubtagGraph'](this.kv.key)
			return this.summarize(graph)
		}
	},
	methods: {
		handleSubSelect(kv){
			console.log('sub-select', kv)
			this.$store.commit('deckEditor/toggleFilter', {
				filterSelect: (filters) => {
					return filters.tags[this.kv.key]
				},
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
		},
		handleClick(){
			this.$emit('select', this.kv)
		}
	},
	mounted() {

	}
}
</script>
