const path = require("path");

module.exports = {
  context: path.resolve(__dirname, 'src'),  
  entry: "./app.ts",
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "app-bundle.js",
    path: path.resolve(__dirname, "dist/assets/js"),
  },
};
