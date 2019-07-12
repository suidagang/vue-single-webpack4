import Vue from 'vue';
import App from './App';
import router from './router'
import './less/reset.less'
import store from './store'
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
});



// axios.get('aaa')