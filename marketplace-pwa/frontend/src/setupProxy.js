const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://backend:5000", //  replace with the actual backend address
      changeOrigin: true,
    })
  );
};
