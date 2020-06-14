const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env) => {
    const isProduction = env == 'production';
    const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });
    return {
        entry : './src/app.js',
        output : {
            path : path.join(__dirname,'public','dist'),
            filename : 'webpackBundle.js'
        },
        module :{
            rules :
            [
                {
                    loader : 'babel-loader',
                    test : /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test : /\.s?css$/,
                    // use : [
                    //     'style-loader',
                    //     'css-loader',
                    //     'sass-loader'
                    // ]
                    use :[
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins:[
            CSSExtract
        ],
        devtool : isProduction ? "source-map": "inline-source-map",//"eval-cheap-module-source-map",
        devServer : {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback : true,
            publicPath: '/dist/'
        }
    }
};
// module.exports = {
//     entry : './src/app.js',
//     output : {
//         path : path.join(__dirname,'public'),
//         filename : 'webpackBundle.js'
//     },
//     module :{
//         rules :
//         [
//             {
//                 loader : 'babel-loader',
//                 test : /\.js$/,
//                 exclude: /node_modules/
//             },
//             {
//                 test : /\.s?css$/,
//                 use : [
//                     'style-loader',
//                     'css-loader',
//                     'sass-loader'
//                 ]
//             }
//         ]
//     },
//     devtool : "eval-cheap-module-source-map",
//     devServer : {
//         contentBase: path.join(__dirname, 'public'),
//         historyApiFallback : true
//     }
// };