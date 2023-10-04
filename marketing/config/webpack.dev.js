const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");
const path = require("path");
const root = process.cwd();

const PORT = 8081;

const devConfig = {
    mode: "development",
    output: {
        publicPath: `http://localhost:${PORT}/`,
    },
    devServer: {
        port: PORT,
        historyApiFallback: {
            index: "index.html",
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "marketing",
            filename: "remoteEntry.js",
            exposes: {
                "./MarketingApp": path.resolve(root, "src/bootstrap.js"),
            },
            shared: packageJSON.dependencies,
        }),
        new HTMLWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);
