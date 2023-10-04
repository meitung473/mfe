const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
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
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
