const webpack = require('webpack');

module.exports = {
    entry: './test.js',
    output: {
        path: __dirname + '/public/js',
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    devtool: process.env.NODE_ENV === 'production' ? null : 'eval',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};
