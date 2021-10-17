module.exports = {
  transpileDependencies: [
    'vuetify'
  ]
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
    configureWebpack: {
        //plugins: [new BundleAnalyzerPlugin()]
    }
};