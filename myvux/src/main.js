// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import App from './App'
// import Home from './components/HelloFromVux'
import './assets/font-awesome/css/font-awesome.min.css'
import router from './router';

import { AjaxPlugin } from 'vux';

Vue.use(AjaxPlugin);

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 可以通过el属性，将vue实例挂载在原DOM上
// 也可以通过new Vue().$mount('#app')，手动将实例挂载在DOM上
