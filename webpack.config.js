const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');

const SOURCE_PATH = path.resolve(__dirname, 'source');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
	watch: !isProduction,
	mode: process.env.NODE_ENV,
	devtool: isProduction ? false : 'inline-source-map',
	stats: 'minimal',

	entry: SOURCE_PATH + '/index.jsx',
	output: {
		path: BUILD_PATH,
		publicPath: isProduction ? './' : '',
		filename: isProduction ? 'static/scripts/app.[hash:8].js' : 'static/scripts/app.js',
		chunkFilename: isProduction ? 'static/scripts/[name].[chunkhash:8].js' : 'static/scripts/[name].chunk.js'
	},

	devServer: {
		open: true,
		contentBase: BUILD_PATH,
		stats: 'minimal',
		overlay: false,
		clientLogLevel: 'none',
		compress: true,
		port: 1337,
		hot: true,
		historyApiFallback: true
	},

	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		runtimeChunk: true,
		minimizer: [
			new TerserWebpackPlugin({
				sourceMap: true,
				extractComments: false,
				terserOptions: {
					compress: { booleans_as_integers: true },
					mangle: { safari10: true },
					output: { safari10: true }
				}
			})
		]
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				enforce: 'pre',
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					fix: false,
					cache: false,
					eslintPath: require.resolve('eslint')
				}
			}, {
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react'
					]
				}
			}, {
				test: /\.(sass|scss)$/,
				loader: 'sass-loader',
				enforce: 'pre',
				options: {
					sourceMap: !isProduction,
					includePaths: [ path.join(__dirname, 'node_modules') ]
				}
			}, {
				test: /\.(sass|scss|css)$/,
				use: [
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: !isProduction,
							modules: true,
							localIdentName: isProduction ? '[hash:base64:5]' : '[local]',
							camelCase: true,
							importLoaders: 1
						}
					}, {
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								require('postcss-preset-env'),
								require('cssnano')({
									autoprefixer: isProduction,
									discardUnused: isProduction,
									mergeIdents: isProduction,
									reduceIdents: isProduction,
									svgo: false,
									zindex: false
								})
							],
							sourceMap: !isProduction
						}
					}
				]
			}, {
				test: /\.(png|jpe?g|svg|gif)$/,
				use: [
					{
						loader: isProduction ? 'file-loader' : 'url-loader',
						options: {
							outputPath: 'static/images/',
							name: '[hash:8].[ext]'
						}
					}, {
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: { progressive: true, quality: 65 },
							optipng: { enabled: false },
							pngquant: { quality: '65-90', speed: 4 },
							gifsicle: { interlaced: false },
							svgo: { enabled: false }
						}
					}
				]
			}
		]
	},

	resolve: {
		extensions: [ '.js', '.jsx' ],
		alias: {
			Components: path.resolve(SOURCE_PATH, 'components'),
			Actions: path.resolve(SOURCE_PATH, 'actions'),
			Reducers: path.resolve(SOURCE_PATH, 'reducers'),
			Styles: path.resolve(SOURCE_PATH, 'sass'),
			Services: path.resolve(SOURCE_PATH, 'services'),
			Utils: path.resolve(SOURCE_PATH, 'utils.js'),
			Images: path.resolve(SOURCE_PATH, 'img')
		}
	},

	plugins: [
		new ProgressBarPlugin({
			format: `\t${chalk.green.italic(':msg')} [${chalk.green.bold(':bar')}] ${chalk.gray(':percent')}`,
			renderThrottle: 100,
			summary: false,
			clear: true
		}),
		isProduction && new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [ '*' ],
			verbose: false
		}),
		!isProduction && new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			hash: true,
			minify: isProduction && {
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
			},
			filename: './index.html',
			template: SOURCE_PATH + '/views/index-template.html',
			favicon: SOURCE_PATH + '/img/favicon.ico'
		}),
		isProduction && new MiniCssExtractPlugin({
			filename: 'static/styles/app.[contenthash:8].css',
			chunkFilename: 'static/styles/[name].[contenthash:8].css'
		}),
		isProduction && new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			defaultSizes: 'gzip',
			openAnalyzer: false
		}),
		new webpack.DefinePlugin({
			DEVBUILD: JSON.stringify(!isProduction)
		})
	].filter(Boolean)
};