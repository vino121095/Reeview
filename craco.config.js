module.exports = {
    webpack: {
      configure: {
        output: {
          filename: "static/js/main.js",
        },
        optimization: {
          runtimeChunk: false,
          splitChunks: {
            chunks(chunk) {
              return false;
            },
          },
        },
      },
    },
    plugins: [
      {
        plugin: {
          overrideWebpackConfig: ({ webpackConfig }) => {
            webpackConfig.plugins[5].options.filename = "static/css/main.css";
            return webpackConfig;
          },
        },
        options: {},
      },
    ],
  };