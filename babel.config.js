module.exports = {
    compact: true,
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    browsers: [    
                        "last 1 version",
                        "> 0.2%",
                        "maintained node versions",
                        "not dead"
                    ]
                }
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        'babel-plugin-styled-components',
        '@babel/plugin-transform-modules-commonjs'
    ]
};