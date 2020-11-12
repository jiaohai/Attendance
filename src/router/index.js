import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

const check = r => require.ensure([], () => r(require('../attendance/check')), 'check')
const checkrecord = r => require.ensure([], () => r(require('../attendance/checkrecord')), 'checkrecord')
const checkrule = r => require.ensure([], () => r(require('../attendance/checkrule')), 'checkrule')
const checksetting = r => require.ensure([], () => r(require('../attendance/checksetting')), 'checksetting')
const checkreminder = r => require.ensure([], () => r(require('../attendance/checkreminder')), 'checkreminder')
const application = r => require.ensure([], () => r(require('../attendance/application')), 'application')
const singlereport = r => require.ensure([], () => r(require('../attendance/singlereport')), 'singlereport')
const device = r => require.ensure([], () => r(require('../attendance/device')), 'device')
const login = r => require.ensure([], () => r(require('../attendance/login')), 'login')

const statistics = r => require.ensure([], () => r(require('../statistics/statistics')), 'statistics')
const allreport = r => require.ensure([], () => r(require('../statistics/allreport')), 'allreport')

const rule = r => require.ensure([], () => r(require('../rule/rule')), 'rule')
const addrule = r => require.ensure([], () => r(require('../rule/addrule')), 'addrule')
const morerule = r => require.ensure([], () => r(require('../rule/morerule')), 'morerule')
const search = r => require.ensure([], () => r(require('../rule/search')), 'search')
// const morerule = r => require.ensure([], () => r(require('../rule/morerule')), 'morerule')

const addadmin = r => require.ensure([], () => r(require('../addadmin/addadmin')), 'addadmin')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/check'
    // },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/check',
      name: 'check',
      component: check
    },
    {
      path: '/checkrecord',
      name: 'checkrecord',
      component: checkrecord
    },
    {
      path: '/checkrule',
      name: 'checkrule',
      component: checkrule
    },
    {
      path: '/checksetting',
      name: 'checksetting',
      component: checksetting
    },
    {
      path: '/checkreminder',
      name: 'checkreminder',
      component: checkreminder
    },
    {
      path: '/application',
      name: 'application',
      component: application
    },
    {
      path: '/singlereport',
      name: 'singlereport',
      component: singlereport
    },
    {
      path: '/device',
      name: 'device',
      component: device
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: statistics
    },
    {
      path: '/allreport',
      name: 'allreport',
      component: allreport
    },
    {
      path: '/rule',
      name: 'rule',
      component: rule
    },
    {
      path: '/addrule',
      name: 'addrule',
      component: addrule
    },
    {
      path: '/morerule',
      name: 'morerule',
      component: morerule
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/addadmin',
      name: 'addadmin',
      component: addadmin
    }
    // {
    //   path: '/',
    //   name: 'Attendance',
    //   component: Attendance
    // },
    // {
    //   path: '/HelloWorld',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
