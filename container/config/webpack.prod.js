const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJSON = require("../package.json");

const domain = process.env.PRODCTION_DOMIN;

const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        publicPath: "/container/latest/",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                // Remember to add correct path with '<app>/latest/remoteEntry.js'
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
            },
            shared: packageJSON.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
