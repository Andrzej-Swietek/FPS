const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    // output: {
    //     filename: 'bundle.js'
    // },
    output: {
        filename: 'bundle.js',
        sourceMapFilename: "bundle.js.map"
    },
    devtool: "source-map",
    // mode: 'development',
    mode: 'development', // none, development, production

    // DEV SERVER
    devServer: {
        port: 5001
    },

    // FOR HTML
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html', //relative to root of the application
            title:"FPS Project",//page title
            template: './src/index.html',
            // h1:"h1",
            // h2:"h2"
        })
    ],

    // LOADERS
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(md2)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },




};
