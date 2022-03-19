import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

function renderVueApp(props) {
  new Vue({
    render: h => h(App, {props}),
  }).$mount('#vue-sub-app')
}

window.renderVueApp = renderVueApp;
