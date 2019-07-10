module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/demo/'
    : '/',
  // 全域sass變數
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "~@/assets/scss/customer/utilty";`
      }
    }
  },
  devServer: {
    proxy: {
      '/apiPathProxy':{
        target : 'http://localhost:3004/', // 測試機
        changeOrigin: true,
        pathRewrite: {
          '^/apiPathProxy': ''
        }
      }
    }
  }
}
