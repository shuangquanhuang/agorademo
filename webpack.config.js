const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv')
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    stats: {
        logging: 'verbose',        
        colors: true,
        depth: true,
        env: true,        
    },
    entry: {
        index: path.resolve(__dirname, 'src', 'index.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            inject: 'head',
            showErrors: false,
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed) // it will automatically pick up key values from .env file
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/*.txt',
                    to: '[name].[ext]'
                },
                {
                    from: 'public/*.png',
                    to: '[name].[ext]'
                },
                {
                    from: 'public/*.ico',
                    to: '[name].[ext]'
                },
                {
                    from: 'public/*.json',
                    to: '[name].[ext]'
                },
            ],
        
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'source-map-loader' },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            },
        ]
    },
    devtool: 'source-map'

};
