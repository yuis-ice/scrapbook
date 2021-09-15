
import Vue from 'vue'
import App from './App.vue'

import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(VueViewer)

new Vue({
    el: '#app',
    
    render: (h) => {
      return h(App);
    }
})
