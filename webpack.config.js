const path = require('path');

module.exports = {
    entry: './src',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader"
            }
        ]
    }
};
