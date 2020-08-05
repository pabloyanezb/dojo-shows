import Vue from 'vue'
import VueFirestore from 'vue-firestore';
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueFirestore, {key: 'id'});

new Vue({
  render: h => h(App),
}).$mount('#app')
