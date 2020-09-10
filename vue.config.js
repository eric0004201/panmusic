module.exports = {
  publicPath: '/',
	configureWebpack:{
		resolve:{
			alias:{
				'assets':'@/assets',
				'common':'@/common',
				'components':'@/components',
				'network':'@/network',
				'views':'@/views',
			}
		}
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: 
				`
					@import "~assets/css/base.scss";
				`
			}
		}
	},
	pwa: {
		iconPaths: {
			favicon32: 'favicon.ico',
			favicon16: 'favicon.ico',
			appleTouchIcon: 'favicon.ico',
			maskIcon: 'favicon.ico',
			msTileImage: 'favicon.ico'
		}
	}

}