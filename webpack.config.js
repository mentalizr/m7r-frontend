const webpack = require('webpack');
const path = require('path');

module.exports = {

    mode: 'development',

    entry: [
        './src/M7R_index.ts',
        './node_modules/startbootstrap-sb-admin-2/js/sb-admin-2.min.js'
    ],

    output: {
        filename: 'm7r_spa.js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.html/,
                use: 'html-loader'
            },
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ]

};