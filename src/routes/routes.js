import NotFound from "@/components/NotFound";

import publicRoutes from './public'
import authorizedRoutes from './authorized'
import AuthorizedLayout from "@/components/authorized/Layout";
import PublicLayout from "@/components/public/Layout";

const routes = [
	{
		path: '/',
		component: AuthorizedLayout,
		children: authorizedRoutes,
	},
	{
		path: '/public',
		component: PublicLayout,
		children: publicRoutes
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: NotFound
	},
];

export default routes