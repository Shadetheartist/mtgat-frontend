<template>
	<div class="deck-editor">
		<div class="deck-summary-container" v-if="!loading">
			<deck-summary></deck-summary>
		</div>

		<div class="card-viewer-container" v-if="!loading">
			<card-viewer></card-viewer>
		</div>

		<div class="deck-import-container" v-if="!loading">
			<deck-importer @import="handleImport"></deck-importer>
		</div>

		<context-menu></context-menu>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.deck-editor {
	display: flex;
	.card-viewer-container {
	}
}
</style>


<script>
import CardViewer from "./CardViewer/Index";
import DeckSummary from "./DeckSummary/Index";
import ContextMenu from "./ContextMenu";
import {mapState} from 'vuex'

import _ from "lodash";
import DeckImporter from "@/components/deckEditor/DeckImporter";

export default {
	components: {
		DeckImporter,
		CardViewer,
		DeckSummary,
		ContextMenu
	},
	props: {
		msg: String
	},
	data: () => {
		return {
			loading: true,
		}
	},
	computed: {
		...mapState('deckEditor', {
			cards: state => state.cards,
			contextMenu: state => state.contextMenu
		}),
	},
	methods: {
		getSelectedText() {
			if (typeof window.getSelection != "undefined") {
				return window.getSelection().toString();
			}

			if (typeof document.selection != "undefined" && document.selection.type == "Text") {
				return document.selection.createRange().text;
			}

			return null
		},
		handleMouseUp(e) {
			const selectedText = this.getSelectedText();
			this.contextMenu.disabled = !!selectedText
		},
		handleImport(cardData){
			const promises = []
			this.$store.commit('deckEditor/reset')

			for (const cardName in cardData) {
				promises.push(this.$store.dispatch('deckEditor/loadCardByName', cardName).then(e => {
					if(e?.data?.id){
						this.$store.dispatch('deckEditor/loadCardAnalysis', e.data.id)
					}
				}))
			}

			Promise.all(promises).then(e => {
				this.loading = false
			}).catch(e => {
				console.error('Server error', e)
			})
		}
	},
	mounted() {
		window.addEventListener('mouseup', this.handleMouseUp)

		const maxId = 60000
		const promises = []
		this.$store.commit('deckEditor/reset')


		for (let i = 0; i < 50; i++) {
			const randomId = Math.floor(Math.random() * maxId)
			promises.push(this.$store.dispatch('deckEditor/loadCard', randomId))
			promises.push(this.$store.dispatch('deckEditor/loadCardAnalysis', randomId))
		}

		Promise.all(promises).then(e => {
			this.loading = false
		}).catch(e => {
			console.error('Server error', e)
		})
	}
}
</script>

















































