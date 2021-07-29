const { createProxyMiddleware } = require('http-proxy-middleware');

// const devUrl = 'http://192.168.1.4:8001';
// const devUrl = 'https://nik.vizorlabs.ru';
//  const devUrl = 'http://proxy.vizorlabs.ru:23000';
const devUrl = 'http://127.0.0.1:8000/';


module.exports = (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: devUrl,
            changeOrigin: true,
            secure: false
        })
    );
};
