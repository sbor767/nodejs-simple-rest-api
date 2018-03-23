module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        inline: true
    }
}