module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      // 为了设计稿量出来是多少px 在页面上就写多少px
      // rootValue: 37.5,

      rootValue: function ({ file }) {
        return file.indexOf('vant') > -1 ? 37.5 : 75
      },
      propList: ['*'],

      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
