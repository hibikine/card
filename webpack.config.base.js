const { CheckerPlugin } = require("awesome-typescript-loader");
const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/index.ts"),
    server: path.resolve(__dirname, "src/server.ts")
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  module: {
    /* ファイルローダーなどの設定 */
    rules: [
      {
        /* JavaScriptファイル */
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
              // plugins: [require('@babel/plugin-transform-object-rest-spread')]
            }
          },
          {
            loader: "tslint-loader"
          }
        ]
      },
      /* TypeScript */
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader"
          },
          {
            loader: "tslint-loader"
          }
        ],
        exclude: /node_modules/
      },
      /* SASS */
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [new CheckerPlugin()]
};
