// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
// import * as webpack from "webpack";

const { CheckerPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');
const path = require('path');

module.exports = {

    mode: 'development',

    // entry: './src/M7R_index.ts',

    entry: ['./src/M7R_index.ts',
        './node_modules/startbootstrap-sb-admin-2/js/sb-admin-2.min.js'],

    // entry: ['./src/M7R_index.ts',
    //     './node_modules/startbootstrap-sb-admin-2/js/sb-admin-2.min.js',
    //     '../m7r-web-components/dist/m7r-web-components.js'],


    // entry: ['./src/M7R_index.ts',
    //     './node_modules/jquery/dist/jquery.min.js',
    //     './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    //     './node_modules/jquery.easing/jquery.easing.js',
    //     './node_modules/startbootstrap-sb-admin-2/js/sb-admin-2.min.js'],

    output: {
        filename: 'm7r_spa.js',
        path: path.resolve(__dirname, 'dist')
    },

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    // plugins: [
    //     new CheckerPlugin(),
    //     new webpack.ProvidePlugin({
    //         $: "jquery",
    //         jQuery: "jquery"
    //     })
    // ]
    plugins: [
        // new webpack.IgnorePlugin({
        //     checkContext(context) {
        //
        //
        //         console.log("Context: " + context);
        //         return false;
        //     },
        //     checkResource(resource) {
        //
        //         console.log("Ressource: " + resource);
        //
        //         // if (context=="popper.js") {
        //         //     console.log("###")
        //         //     return true;
        //         // }
        //
        //         return false;
        //     }
        // }),
        // new webpack.IgnorePlugin(/jquery|bootstrap|mustache|popper.js/),
        new CheckerPlugin(),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })

    ]

};