const path = require('path')

module.exports = (env, argv) => {
  console.log('Webpack Mode:', argv.mode)
  const watch = argv.mode === 'production' ? false : true
  const devtool = argv.mode === 'production' ? 'cheap-source-map' : 'source-map'

  return {
    watch,
    entry: [
      // '@babel/polyfill',
      // 'react',
      // 'react-dom',
      './app/react/main.js',
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'scripts.bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              ["@babel/preset-env", {
                "modules": false
              }],
              // "@babel/preset-react"
              // "@babel/preset-es2015"
            ],
            "plugins": [
              ['@babel/plugin-transform-react-jsx' /*, { pragma: 'h' } */ ], // Uncomment pragma for preact
              ['@babel/plugin-proposal-object-rest-spread'],
              ['@babel/plugin-transform-react-constant-elements']
              // ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ]
          }
        }
      }]
    },
    devtool
  }
};
