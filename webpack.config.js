const path = require('path');
// 6. Специальный плагин, который удалит при сборке ненужные локали
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
// 2. Установка пакетов style-loader и css-loader
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }
    ]
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};
