const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const GlobalStyle = require('./ClientApp/globalStyle/GlobalStyle');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
  const isDevBuild = env === 'Development';
  const sharedConfig = () => ({
    stats: { modules: false },
    resolve: {
      alias: {
        Root: path.resolve(__dirname, 'ClientApp'),
        Icons: path.resolve(
          __dirname,
          'ClientApp/components/Shared/Assets/Icons'
        ),
        Utils: path.resolve(__dirname, 'ClientApp/utils')
      },
      extensions: ['.js', '.jsx']
    },
    output: {
      filename: '[name].js',
      publicPath: 'ssrBase/dist/'
    },
    module: {
      rules: [
        {
          test: /\.(js|.jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: [{ loader: 'babel-loader' }]
        },
        {
          test: /\.(pdf|png|jpg|jpeg|gif|svg)$/,
          use: 'file-loader'
        }
      ]
    },
    mode: isDevBuild ? 'development' : 'production'
  });

  // Configuration for client-side bundle suitable for running in browsers
  const bundleOutputDir = '/ssrBase/dist';

  const minCssExtractPlugin = new MiniCssExtractPlugin({
    filename: '[name]-[chunkhash]-lib.css'
  });

  const webpackDefinPlugin = new webpack.DefinePlugin({
    ENV: JSON.stringify(env),
    GS: JSON.stringify(GlobalStyle),
    CLIENT: JSON.stringify(true),
    ISPRODUCTION: JSON.stringify(!isDevBuild)
  });

  const clientBundleConfig = merge(sharedConfig(), {
    entry: {
      'main-client': ['./ClientApp/Client.js']
    },
    resolve: { extensions: ['.css', '.scss'] },
    output: {
      filename: '[name]-[chunkhash].js',
      path: path.join(__dirname, bundleOutputDir)
    },
    devtool: isDevBuild ? 'eval-source-map' : '',
    module: {
      rules: [
        {
          test: [/\.css$/, /\.scss$/],
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
            { loader: 'postcss-loader' }
          ]
        }
      ]
    },
    optimization: {
      minimize: !isDevBuild ? true : false,
      minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        chunks: 'all',
        minSize: 3000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors_react: {
            test: /[\\/]node_modules[\\/]((react|react-dom).*)[\\/]/, //If webpack comes up any library from node_modules, it will be split out to venors bundle.
            name: 'vendors-react',
            chunks: 'all'
          },
          vendors_others: {
            test: /[\\/]node_modules[\\/](?!(react|react-dom).*)[\\/]/, //If webpack comes up any library from node_modules, it will be split out to venors bundle.
            name: 'vendors-others-[chunkhash]',
            chunks: 'all'
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    target: 'web',
    plugins: [webpackDefinPlugin, minCssExtractPlugin].concat(
      isDevBuild
        ? []
        : [
            // new BundleAnalyzerPlugin()
          ]
    )
  });

  // Configuration for server-side (prerendering) bundle suitable for running in Node
  const serverBundleConfig = merge(sharedConfig(), {
    resolve: { mainFields: ['main'] },
    entry: {
      'main-server': ['./ClientApp/Server.js']
    },
    plugins: [
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env),
        GS: JSON.stringify(GlobalStyle),
        CLIENT: JSON.stringify(false)
      })
    ],
    output: {
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, bundleOutputDir)
    },
    target: 'node',
    module: {
      rules: [
        {
          test: [/\.css$/, /\.scss$/],
          use: 'ignore-loader'
        }
      ]
    }
  });

  return [clientBundleConfig, serverBundleConfig];
};
