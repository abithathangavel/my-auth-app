const webpack = require('webpack');

module.exports = {
  outputDir: 'server/dist',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.GOOGLE_CLIENT_ID': JSON.stringify('529640845422-umlott9an2md5d71hd58thetta9e857e.apps.googleusercontent.com'),
      }),
    ],
  },
};
