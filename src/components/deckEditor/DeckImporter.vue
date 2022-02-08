<template>
	<div class="deck-importer">
		<input class="imported-file" type="file" @input="handleInput">
		<p>
			{{fileContent}}
		</p>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "/src/assets/sass/material-design";
.deck-importer {

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
			fileContent: null
		}
	},
	computed: {
		...mapState('deckEditor', {
		}),
	},
	methods: {
		handleFileRead(e){
			console.log('reading file')
			const text = e.target.result
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(text, "text/xml");
			const cards = xmlDoc.querySelectorAll('zone[name="main"] card')
			this.$store.commit('deckEditor/reset')

			const cardData = {}

			for(const card of cards){
				const number = card.attributes.getNamedItem('number').value
				const name = card.attributes.getNamedItem('name').value

				cardData[name] = number
			}

			this.$emit('import', cardData)
		},
		handleFileReadErr(e){

			console.log('error reading file')

		},
		handleInput(e){
			const file = e.target.files[0];
			if (file) {
				console.log('file found')
				const reader = new FileReader();
				reader.readAsText(file, "UTF-8");
				reader.onload =  this.handleFileRead
				reader.onerror =  this.handleFileReadErr
			}
		}
	},
	mounted() {

	}
}
</script>
