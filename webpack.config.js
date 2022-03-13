const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "src/scripts/index.ts"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/headphones.html"),
      filename: "headphones.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/speakers.html"),
      filename: "speakers.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/earphones.html"),
      filename: "earphones.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/headphone_mark_one.html"),
      filename: "headphone_mark_one.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/headphone_mark_two.html"),
      filename: "headphone_mark_two.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/headphone_white_xx.html"),
      filename: "headphone_white_xx.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/speaker_zx9.html"),
      filename: "speaker_zx9.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/speaker_zx7.html"),
      filename: "speaker_zx7.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/earphone_yx1.html"),
      filename: "earphone_yx1.html",
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/form.html"),
      filename: "form.html",
    }),

    new CopyPlugin({
      patterns: [
        {
          context: __dirname + "/src",
          from: "images/**",
          to: __dirname + "/dist",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader"],
      },
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          url: false,
        },
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
};
