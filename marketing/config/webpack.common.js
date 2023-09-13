const path = require("path");
module.exports = {
    // entry: "./src/index.js",
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
};
