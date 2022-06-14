import Vue from 'vue'
import App from './App.vue'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import Icons from "v-svg-icons";

Vue.config.productionTip = false

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component("SvgIcons", Icons);

new Vue({
  render: h => h(App),
}).$mount('#app')
