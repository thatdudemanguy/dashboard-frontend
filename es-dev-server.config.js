const proxy = require('koa-proxies');

module.exports = {
    port: 8081,
    watch: true,
    nodeResolve: true,
    appIndex: 'demo/index.html',
    moduleDirs: ['node_modules', 'web_modules'],
    middlewares: [
        proxy('/api/v1', {
            target: 'http://localhost:3000',
            changeOrigin: true,
            logs: true,
        }),
    ],
};