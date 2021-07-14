const express = require("express")
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()

const port = 8081

let history = require('connect-history-api-fallback')

//重定向到index.html
history({
  rewrites: [{
      from: /^\/libs\/.*$/,
      to: '/index.html'
    }]
});

app.use(history());

app.use(express.static('./dist'))

// app.use(
//     ['/space-center', '/user-center', '/pub-center'],
//     createProxyMiddleware({
//         target: 'http://dev.linli580.com:10000',
//         changeOrigin: true
// }));

// app.use(
//     ['/picture'],
//     createProxyMiddleware({
//         target: 'https://times-dev-user-center.oss-cn-beijing.aliyuncs.com',
//         changeOrigin: true
// }));


app.listen(port, () => {
  console.log('Listening at http://localhost:' + port)
})