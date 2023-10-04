const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const prodConfig = {
    mode: "production",
    output: {
        // added hash, detect the changed in the prod environment
        filename: "[name].[contenthash].js",
        // redirect remote cloudfront directory
        publicPath: "/auth/latest/",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "auth",
            filename: "remoteEntry.js",
            exposes: {
                "./AuthApp": "./src/bootstrap.js",
            },
            shared: packageJSON.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
