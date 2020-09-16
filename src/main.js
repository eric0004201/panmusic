import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import 'element-ui/lib/theme-chalk/index.css';
import {
	Loading,
	MessageBox,
	Message,
	Notification,
	Button,
	Input,
	Icon,
	Carousel,
	CarouselItem,
	Slider,
	Autocomplete,
	Table,
	TableColumn,
	Tabs,
	TabPane,
	Pagination,
	Menu,
	MenuItem
} from 'element-ui';

Vue.use(Loading.directive);

Vue.use(Button)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Slider)
Vue.use(Autocomplete)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Menu)
Vue.use(MenuItem)

Vue.use(VueLazyload, {
  error: require('assets/images/timg.jpg'),
  loading: require('assets/images/loading.gif')
  
})

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
