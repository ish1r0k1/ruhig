const path = require('path')
const autoprefixer = require('autoprefixer')
const webpackMarge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const paths = {
  src: path.join(__dirname, 'src'),
  compiled: path.join(__dirname, 'dist')
}

const env = process.env.NODE_ENV || 'development'

let isProduction = false

if (env === 'production') {
  isProduction = true
}

console.log('[env]', env, '[isProduction]', isProduction)

module.exports = () => {
  const common = {
    entry: { app: [path.join(paths.src, 'app', 'index.js')] },
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

  const dev = webpackMarge(common, {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(paths.src, 'index.html'),
        filename: 'index.html'
      })
    ]
  })

  const prod = webpackMarge(common, {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  minimize: true,
                  sourceMap: true,
                  importLoaders: 2,
                  localIdentName: '[name]__[local]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: (loader) => [
                    autoprefixer({ browsers: ['last 2 versions', 'ie >= 11'] })
                  ],
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded',
                  sourceMap: true,
                  sourceMapContents: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(paths.src, 'index.html'),
        filename: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      new CleanWebpackPlugin(paths.compiled, {
        exclude: '.gitignore'
      }),
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
      new ExtractTextPlugin('[name].css')
    ]
  })

  return isProduction ? prod : dev
}
