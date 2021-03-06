const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  return {
    entry: {
      index: ["./demo/index.js"]
    },
    output: {
      path: path.resolve(__dirname + "/build"),
      filename: "[name].js"
    },
    devServer: {
      stats: "minimal"
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: require.resolve("react"),
          loader: "expose-loader?React"
        },
        {
          test: require.resolve("react-dom"),
          loader: "expose-loader?ReactDOM"
        },
        {
          test: require.resolve("react-dom/server"),
          loader: "expose-loader?ReactDOMServer"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        },
        {
          test: /\.css/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "demo/index.html"
      })
    ]
  };
};
