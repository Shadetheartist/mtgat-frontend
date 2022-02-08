import routes from '@/routes/routes'
import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: routes
})

export default router