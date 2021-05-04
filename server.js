var httpProxy = require('http-proxy');

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/shopapp'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/shopapp/'}),
);

app.listen(process.env.PORT || 8080);

var routing = {
  '/shop/api': { port: 443 || 80, host: 'grocery-shop-back.herokuapp.com' }
}

var server = httpProxy.createServer(routing).listen(443);
