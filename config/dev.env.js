'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  /*接口地址nginx代理的地址*/
  VUE_APP_BASE_API : '"http://www.shooturbrain.top:8083"'
})
