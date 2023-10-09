const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";
const target = isProduction ? "browserslist" : "web";

module.exports = {
    mode,
    target,
    devtool: isProduction ? false : "eval-cheap-module-source-map",
    entry: path.resolve(__dirname, "src", "scripts", "index.js"),
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split("/")
                .slice(1)
                .join("/");
            return `${filepath}/[name].[hash][ext][query]`;
        },
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.pug"),
        }),
        new miniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    mode === "development"
                        ? "style-loader"
                        : miniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.pug$/i,
                loader: "pug-loader",
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    devServer: {
        port: 3000,
        watchFiles: ["src/**/*"],
    },
};
