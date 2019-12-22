module.exports = {
  "lintOnSave": false,
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devServer: {
      public: 'https://lvh.me:9443'
    }
  }
}
