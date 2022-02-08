<template>
	<div
			:id="'card-' + card.id"
			class="card-container m3"
			:class="{'selected': selected, 'minimized': minimized}"
			@contextmenu="handleContextMenu"
			@click="handleCardClick"
			v-show="isFiltered">

		<div class="overlay"></div>

		<div class="card" v-if="card.id" :title="card.name">
			<img class="image md-shadow-1 md-shadow-hover" v-show="imageLoaded" :src="imageUrl" :alt="card.name" @load="handleImageLoad"/>
			<div class="placeholder md-shadow-1 md-shadow-hover" v-if="!imageLoaded" :alt="card.name" :class="colorIdentityClass">
				<div class="header">
					<div class="name">
						{{ card.name }}
					</div>
					<mana-cost :cost="card.manacost"></mana-cost>
				</div>
				<div class="type">
					{{ card.type }}
				</div>
				<div class="text-area">

					<div class="text">
						<div class="content analysis" v-if="analysis">

						</div>
						<div class="content" v-html="cardText">
						</div>
					</div>
					<div class="flavortext">
						{{ card.flavortext }}
					</div>
				</div>

				<div class="analysis" v-if="true && analysis">
					<div class="tags">
						<div class="tag" :class="{'selected': !!selectedTags[tag]}" v-for="(num, tag) in analysis.tags" :key="card.id + '-' + tag" @click="handleTagClick(tag)">
							{{ tag }}
						</div>
					</div>
				</div>

				<div class="footer">
					<div class="power-toughness" v-if="card.power !== null">
						{{card.power}}/{{card.toughness}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "src/assets/sass/vars";

.card-container {
	position: relative;
	display: flex;
	height: 300px;

	transition: height 0.1s;


	&.minimized {
		height: 25px;
	}

	&.selected {
		.overlay {
			box-sizing: border-box;
			border-radius: 8px;
			outline: 4px solid #da00fd;
		}
	}


	.synergy-web {
		position: fixed;
		pointer-events: none;
		z-index: 1;
		top: 0;
		left: 0;
	}


	.overlay {
		pointer-events: none;
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}

	.analysis {

		.tags {
			display: flex;
			flex-wrap: wrap;

			margin-left: 4px;

			.tag {
				color: white;

				cursor: pointer;
				margin-left: 2px;
				margin-bottom: 2px;
				background: #858585;
				border: 1px solid #be72bb;
				padding: 2px 4px;
				border-radius: 4px;
				font-size: 10px;

				&:hover {
					background: darken(#858585, 20%);
				}

				&.selected {
					background: darken(#858585, 30%);
				}
			}
		}
	}

	.card {
		font-size: 13px;

		.text {
			position: relative;

			.overlay {
				position: absolute;
			}
		}

		.image {
			width: 223px;
			height: 310px;
		}

		.placeholder {
			display: flex;
			flex-direction: column;

			background: #b6b6b6;
			width: 223px;
			height: 310px;

			box-sizing: border-box;
			border: 11px solid #000000;
			border-radius: 8px;
			outline: 1px solid #726f6f;

			&.color-identity-gold {
				background: #e3c115;
			}

			&.color-identity-W {
				background: $color-plains;
			}

			&.color-identity-U {
				background: $color-island;
				color: white;
			}

			&.color-identity-B {
				background: $color-swamp;
				color: white;
			}

			&.color-identity-R {
				background: $color-mountain;
				color: white;
			}

			&.color-identity-G {
				background: $color-forest;
				color: white;
			}


			.header {
				display: flex;
				justify-content: space-between;
				padding: 5px 8px;
				border-bottom: 1px solid #757575;
			}


			.footer {
				margin-top: auto;

				.power-toughness {
					text-align: right;
					padding: 4px 8px;
					font-size: 14px;
				}
			}

			.type {
				padding: 8px;
			}

			.text-area {
				margin-left: 8px;
				margin-right: 8px;

				padding: 4px;

				font-size: 11px;

				.text {
					margin-bottom: 8px;
				}

				.flavortext {
					font-weight: 300;
					font-style: italic;
				}
			}

		}

	}

}
</style>


<script>
import backendMixin from "@/mixins/backendMixin";
import ManaCost from "@/components/ManaCost";
import _, {isArray} from "lodash";
import {mapState, mapGetters} from "vuex";


export default {
	components: {
		ManaCost,
	},
	mixins: [
		backendMixin
	],
	props: {
		id: {
			type: Number,
			required: true
		}
	},
	data: () => {
		return {
			imageLoaded: false,
			selected: false,
		}
	},
	computed: {
		...mapState('deckEditor', {
			card: function (state) {
				return state.cards[this.id]
			},
			analysis: function (state) {
				return state.cardAnalysis[this.id]
			},
			minimized: function (state) {
				return state.minimized[this.id]
			},
			contextMenu: state => state.contextMenu,
			synergyWeb: state => state.synergyWeb,
			selectedTags: state => state.filters.tags
		}),

		...mapGetters('deckEditor', {
			filteredCards: 'filteredCards',
			invertedTagGraph: 'invertedTagGraph'
		}),

		isFiltered() {
			return !!this.filteredCards[this.id]
		},

		cardText() {
			return this.card?.text?.replaceAll('\n', '<br/>')
		},
		imageUrl() {
			return null
			return `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this.card.multiverseid}&type=card`
		},
		colorIdentityClass() {

			if (!this.card) {
				return null
			}

			if (!this.card.coloridentity) {
				return null
			}

			const prefix = 'color-identity-'
			if (this.card.coloridentity.split(',').length > 1) {
				return prefix + 'gold';
			}

			const replaced = this.card.coloridentity.replaceAll(',', '_')
			return prefix + replaced
		},

	},
	methods: {

		handleTagClick(tag) {
			this.$store.commit('deckEditor/toggleFilter', {
				filterSelect: (filters) => filters.tags,
				filterKey: tag
			})
		},

		handleContextMenuClickAway(e) {
			if (this.contextMenu.disabled) {
				return
			}

			const contextMenuElement = document.querySelector('#context-menu')
			if (!contextMenuElement.contains(e.target)) {
				this.contextMenu.show = false
				e.preventDefault()
				window.removeEventListener('click', this.handleContextMenuClickAway)
			}
		},

		handleContextMenu(e) {
			if (this.contextMenu.disabled) {
				return
			}

			this.contextMenu.pos = {
				x: e.pageX,
				y: e.pageY,
			}
			this.contextMenu.show = true
			this.contextMenu.options = [
				{
					label: "Reload Analysis",
					callback: () => {
						this.contextMenu.show = false
						this.$store.dispatch('deckEditor/loadCardAnalysis', this.card.id)
						window.removeEventListener('click', this.handleContextMenuClickAway)
					}
				},
				{
					label: "Show Synergy Web",
					callback: () => {
						this.contextMenu.show = false
						this.synergyWeb.cardId = this.card.id
						this.synergyWeb.show = !this.synergyWeb.show
						window.removeEventListener('click', this.handleContextMenuClickAway)
					}
				},
			]

			window.addEventListener('click', this.handleContextMenuClickAway)

			e.preventDefault()
		},
		handleCardClick() {
			//this.selected = !this.selected
			//this.$store.commit('deckEditor/toggleMinimized', this.id)
		},
		handleImageLoad(e) {
			this.imageLoaded = true
		},
	},
	watch: {

	},
	mounted() {
	}
}
</script>
