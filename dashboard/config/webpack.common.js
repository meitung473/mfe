const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].[contenthash].js",
    },
    resolve: {
        extensions: [".js", ".vue"],
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                test: /\.scss|\.css$/,
                use: [
                    "vue-style-loader",
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        configFile: path.join(process.cwd(), ".babelrc"),
                    },
                },
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
};
