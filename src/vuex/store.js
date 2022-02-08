import { createStore } from 'vuex'
import deckEditorModule from './deckEditor.module'


export const store = createStore({
	state () {
		return {
			count: 1,
			loadedCards: {}
		}
	},
	modules: {
		deckEditor: deckEditorModule
	}
})