// const HotModuleReplacementPlugin = require("webpack-hot-middleware");

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    liveReload: true,
    writeToDisk: true,
  },
  // plugins: [new HotModuleReplacementPlugin()],
};
