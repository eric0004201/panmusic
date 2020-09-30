import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import animated from 'animate.css' 

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
	MenuItem,
	Form,
	FormItem,
	Backtop
} from 'element-ui';

Vue.use(animated)
Vue.use(Loading.directive);
Vue.use(Backtop)
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
Vue.use(Form)
Vue.use(FormItem)

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
