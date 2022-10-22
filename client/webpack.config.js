const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

require('dotenv').config()

module.exports = {
  entry: './src/index.tsx',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
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
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js',
  },
  performance: {
    hints: false,
    maxAssetSize: 600000,
    maxEntrypointSize: 600000
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: 'index.html',
      favicon: './public/favicon.ico',
      template: './public/index.html',
      inject: false,
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
}
