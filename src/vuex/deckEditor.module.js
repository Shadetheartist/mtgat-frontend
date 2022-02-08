import backend from "@/backendAxiosInstance";
import _ from "lodash";


function invert(graph, id, map){
	for (const key in map) {
		if (graph.hasOwnProperty(key)) {
			graph[key][id] = map[key]
		} else {
			graph[key] = {[id]: map[key]}
		}
	}
}

export default {
	namespaced: true,
	state() {
		return {
			contextMenu: {
				disabled: true,
				show: false,
				pos: {
					x: 0,
					y: 0
				},
				items: [
					{
						label: "hello"
					}
				],
			},
			cards: {},
			cardAnalysis: {},
			minimized: {},
			filters: {
				tags: {},
				types: {},
				subtypes: {},
				keywords: {},
			},
			synergyWeb: {
				show: false,
				cardId: null,
				lines: []
			}
		}
	},
	
	mutations: {
		reset(state, payload) {
			state.cards = {}
			state.cardAnalysis = {}
			state.minimized = {}
			state.filters = {
				tags: {},
				types: {},
				subtags: {},
				subtypes: {},
				keywords: {}
			}
			state.synergyWeb = {
				show: false,
				cardId: null,
				lines: []
			}
			state.contextMenu = {
				disabled: true,
					show: false,
					pos: {
					x: 0,
						y: 0
				},
				items: [
					{
						label: "hello"
					}
				],
			}
		},
		addCard(state, payload) {
			state.cards[payload.id] = payload
		},
		addCardAnalysis(state, payload) {
			state.cardAnalysis[payload.cardId] = payload.analysis
		},
		toggleMinimized(state, id) {
			state.minimized[id] = !state.minimized[id]
		},
		minimize(state, id) {
			state.minimized[id] = true
		},
		maximize(state, id) {
			state.minimized[id] = false
		},
		
		toggleFilter(state, payload){
			const filter = payload.filterSelect(state.filters)
			if(filter[payload.filterKey]){
				delete filter[payload.filterKey]
				return
			}
			filter[payload.filterKey] = {}
		}
	},
	
	actions: {
		loadCard(context, id) {
			return backend.get('/cards/id/' + id)
				.then(e => {
					context.commit('addCard', e.data)
					return e
					
				})
		},
	
		loadCardAnalysis(context, id) {
			return backend.get('/cards/id/' + id + '/analyze')
				.then(e => {
					context.commit('addCardAnalysis', { cardId: id, analysis: e.data })
					return e
					
				})
		},
		
		loadCardByName(context, name) {
			return backend.get('/cards/name/' + name)
				.then(e => {
					context.commit('addCard', e.data)
					return e
				})
		},
	},
	getters: {
		filteredCards(state){
			return _.pickBy(state.cards, e => {
				const analysis = state.cardAnalysis[e.id]
				
				if(!analysis){
					return false
				}
				
				for(const key in state.filters.tags) {
					if (!analysis.tags.hasOwnProperty(key)) {
						return false
					}
					
					if(!analysis.sub_tags.hasOwnProperty(key)){
						continue
					}
					
					for (const subkey in state.filters.tags[key]) {
						if (!analysis.sub_tags[key].hasOwnProperty(subkey)) {
							return false
						}
					}
				}
				
				for(const key in state.filters.types){
					if(!analysis.types.hasOwnProperty(key)){
						return false
					}
				}
				
				for(const key in state.filters.subtypes){
					if(!analysis.subtypes.hasOwnProperty(key)){
						return false
					}
				}
				
				for(const key in state.filters.keywords){
					if(!analysis.abilities.keyword.hasOwnProperty(key)){
						return false
					}
				}
				
				return true
			})
		},
		invertedTagGraph(state, getters){
			const graph = {}
			
			for (const id in state.cards) {
				const ca = state.cardAnalysis[id]
				
				if(!ca){
					continue
				}
				
				invert(graph, id, ca.tags)
			}
			
			return graph
		},
		
		invertedSubtagGraph: (state) => (tag) => {
			const graph = {}
			
			for (const id in state.cards) {
				const ca = state.cardAnalysis[id]
				
				if(!ca){
					continue
				}
				
				invert(graph, id, ca.sub_tags[tag])
			}
			
			return graph
		},
		
		invertedKeywordGraph(state, getters){
			const graph = {}
			
			for (const id in state.cards) {
				const ca = state.cardAnalysis[id]
				
				if(!ca){
					continue
				}
			
				invert(graph, id, ca.abilities.keyword)
			}
			
			return graph
		},
		
		invertedTypeGraph(state, getters){
			const graph = {}
			
			for (const id in state.cards) {
				const ca = state.cardAnalysis[id]
				
				if(!ca){
					continue
				}
				
				invert(graph, id, ca.types)
			}
			
			return graph
		},
		
		invertedSubtypeGraph(state, getters){
			const graph = {}
			
			for (const id in state.cards) {
				const ca = state.cardAnalysis[id]
				
				if(!ca){
					continue
				}
				
				invert(graph, id, ca.subtypes)
			}
			
			return graph
		},
	}
}