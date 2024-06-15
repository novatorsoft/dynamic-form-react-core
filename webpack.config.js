module.exports = {
  // diğer webpack ayarları
  module: {
    rules: [
      // diğer kurallar
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules\/@nvs-dynamic-form/,
      },
    ],
  },
};
