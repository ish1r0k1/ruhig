const path = require('path')
const webpack = require('webpack')
const webpackMarge = require('webpack-merge')

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

const paths = {
  src: path.join(__dirname, 'src'),
  compiled: path.join(__dirname, 'public')
}

module.exports = () => {
  const env = process.env.NODE_ENV || 'development'

  let isProduction = false

  if (env === 'production') {
    isProduction = true
  }

  console.log('[env]', env, '[isProduction]', isProduction)

  const defaultConfig = {
    entry: { app: [path.join(paths.src, 'index.js')] },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    output: {
      path: paths.compiled,
      filename: 'app.js'
    }
  }

  const prodConfig = webpackMarge(defaultConfig, {
    plugins: [
      new UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        },
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  })

  return !isProduction ? defaultConfig : prodConfig
}
