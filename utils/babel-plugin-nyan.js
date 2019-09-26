'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (babel) {
    var t = babel.types;
    var SEEN_SYMBOL = Symbol();

    var NYAN_GIF_BASE64 = t.stringLiteral(fs.readFileSync(path.resolve(__filename, '..', '..', 'src/nyan.gif')).toString('base64'));

    return {
        visitor: {
            CallExpression: {
                exit: function (path) {
                    var node = path.node;

                    if (node[SEEN_SYMBOL]) {
                        return;
                    }

                    if (path.get('callee').isIdentifier({ name: 'getNyanGifBase64' })) {
                        node[SEEN_SYMBOL] = true;
                        path.replaceWith(NYAN_GIF_BASE64);
                    }
                }
            }
        }
    };
};
