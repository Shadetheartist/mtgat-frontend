<template>

	<div class="m2 p2 md-paper md-shadow-1">
		Public Home
	</div>

	<deck-editor></deck-editor>

</template>

<style scoped>

</style>


<script>

import TestArea from "@/components/TestArea";
import DeckEditor from "@/components/deckEditor/Index";

export default {
	name: 'PubHome',
	components: {
		DeckEditor
	},
	props: {
		msg: String
	}
}
</script>
