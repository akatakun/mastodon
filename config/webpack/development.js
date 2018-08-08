// Note: You must restart bin/webpack-dev-server for changes to take effect
// 共通のWebpack設定。環境ごとの設定はそれぞれのファイルで行う。

// WebpackerではRails Webpackerが吐き出す値(config/)を初期値として使う？が、
// Mastodonでは全部自分たちで書いているみたい。

// require(#{module_name}): JavaScriptモジュールを読み込む。
// ブラウザ以外でJavaScriptを読み込む手段として用意された。

// なんかよくわからんけどもとの設定とマージするためのもの？
const merge = require('webpack-merge');
// Railsの作る設定は無視し、ここに記載したものを使う。
const sharedConfig = require('./shared.js');
// 呼び出し側で特定の値のみを使う場合はこうやって受け取る。
const { settings, output } = require('./configuration.js');

const watchOptions = {
  ignored: /node_modules/,
};

if (process.env.VAGRANT) {
  // If we are in Vagrant, we can't rely on inotify to update us with changed
  // files, so we must poll instead. Here, we poll every second to see if
  // anything has changed.
  watchOptions.poll = 1000;
}

module.exports = merge(sharedConfig, {
  devtool: 'cheap-module-eval-source-map',

  stats: {
    errorDetails: true,
  },

  output: {
    pathinfo: true,
  },

  devServer: {
    clientLogLevel: 'none',
    https: settings.dev_server.https,
    host: settings.dev_server.host,
    port: settings.dev_server.port,
    contentBase: output.path,
    publicPath: output.publicPath,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    disableHostCheck: true,
    watchOptions: watchOptions,
  },
});
