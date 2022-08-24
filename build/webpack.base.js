const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const rootDir = process.cwd();

module.exports = {
    entry: path.resolve(rootDir, 'src/index.js'),
    output: {
        path: path.resolve(rootDir, 'dist'),
        filename: 'bundle.[contenthash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: 'babel-loader',
                include: path.resolve(rootDir, 'src'),
                exclude: /node_modules/,
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 将 JS 字符串生成为 style 节点 这个loader和MiniCssExtractPlugin有冲突，不能同时用
                    // 'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'less-loader',
                    // css 自动添加前缀
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                  ["autoprefixer"],
                                ],
                              },
                        }
                    }
                  ],
                exclude: /node_modules/,
                
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, 'public/index.html'),
            inject: 'body',
            scriptLoading: 'blocking',
        }),
        // 打包后抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
          }),
        // 压缩打包后的 css 文件
        new OptimizeCssPlugin(),
    ],
}