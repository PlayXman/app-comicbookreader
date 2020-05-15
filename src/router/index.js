import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Comics from "../pages/Comics";

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/comics/:title',
			name: ':title',
			component: Comics
		}
	]
})