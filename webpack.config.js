// path for source code
const path = require('path')

// clean output
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// creation of HTML files to serve your webpack bundles
const HTMLWebpackPlugin  = require('html-webpack-plugin')

// Copies individual files or entire directories, which already exist, to the build directory
const CopyPlugin = require('copy-webpack-plugin');

// extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            // import '../../../../../../core/Component
            // import '@core/Component
            '@': path.resolve(__dirname,'src '),
            '@core': path.resolve(__dirname,'src/core ')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        })
    ],
    module: {
        rules: [
            {
                // Loads a Sass/SCSS file and compiles it to CSS.
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
