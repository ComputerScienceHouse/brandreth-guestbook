const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

require('dotenv').config()

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|pdf|mp4|jpeg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        resourceQuery: /url/,
        test: /\.svg$/i,
        type: 'asset'
      },
      {
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        test: /\.svg$/i,
        use: ['@svgr/webpack']
      }
    ]
  },
  output: {
    path: path.join(__dirname, '/dist')
  },
  performance: {
    hints: false,
    maxAssetSize: 600000,
    maxEntrypointSize: 600000
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      inject: false,
      name: 'index.html',
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
}
