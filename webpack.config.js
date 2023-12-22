const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: "./src/ts/script.ts",
  },
  output: {
    path: path.resolve(__dirname, "./src/js/"),
    filename: "script.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
};
