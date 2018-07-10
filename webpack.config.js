module.exports = {
  entry: {
    app: "./src/index.jsx"
  },
  output: {
    filename: "index.bundle.js",
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
      // {
      //   test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      //   loader: "url-loader?limit=8192"
      // },

      // {
      //   test: /\.png$/,
      //   loader: "file-loader?name=imgs/[name]-[hash].[ext]"
      // }
    ]
  }
};
