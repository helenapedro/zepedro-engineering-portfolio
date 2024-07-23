const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/data',
    createProxyMiddleware({
      target: 'https://dh09x5tu10bt3.cloudfront.net',
      changeOrigin: true,
      pathRewrite: {
        '^/data': '/data'
      },
    })
  );
};
