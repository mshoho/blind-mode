const path = require('path');

module.exports = {
    mode: 'production',

    entry: './drop-in/blind-mode.ts',

    output: {
        filename: 'blind-mode.js',
        path: path.join(__dirname, 'drop-in')
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
        ]
    },

    performance: {
        hints: false,
        maxEntrypointSize: 1024 * 1024, // Allowing up to 1MB assets.
        maxAssetSize: 1024 * 1024
    }
};
