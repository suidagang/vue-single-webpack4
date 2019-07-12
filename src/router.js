import Vue from 'vue'
import VueRouter from 'vue-router'

const Map = r => require.ensure([], () => r(require('@/page/map')), 'Map')
const Comprehensive = r => require.ensure([], () => r(require('@/components/comprehensive')), 'Comprehensive')
const Room = r => require.ensure([], () => r(require('@/components/room')), 'Room')
const Visitor = r => require.ensure([], () => r(require('@/components/visitor')), 'Visitor')
const Security = r => require.ensure([], () => r(require('@/components/security')), 'Security')
Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/comprehensive',
    },
    {
        path: '/',
        name: 'map',
        component: Map,
        children: [{
                path: "comprehensive",
                name: 'comprehensive',
                component: Comprehensive,
            },
            {
                path: "room",
                name: 'room',
                component: Room,
            },
            {
                path: "visitor",
                name: 'visitor',
                component: Visitor,
            },
            {
                path: "security",
                name: 'security',
                component: Security,
            },
        ]
    }
]

export default new VueRouter({
    routes: routes
})
