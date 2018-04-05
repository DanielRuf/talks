const express = require('express');
const path = require('path');
const app = express();
const timeout = (process.argv[2] === '--timeout' && parseInt(process.argv[3])) ? parseInt(process.argv[3]) : 0;
if(timeout)console.log('The server autoatically shuts down after ' + (timeout) + ' seconds.');
app.use('/images', express.static(path.join(__dirname, '/images/')));
app.use('/styles', express.static(path.join(__dirname, '/styles/')));
app.use('/webfonts', express.static(path.join(__dirname, '/webfonts/')));
app.use('/node_modules/reveal.js/plugin', express.static(path.join(__dirname, '/node_modules/reveal.js/plugin/')));
app.use('/node_modules/reveal.js/lib', express.static(path.join(__dirname, '/node_modules/reveal.js/lib/')));
app.use('/node_modules/reveal.js/css', express.static(path.join(__dirname, '/node_modules/reveal.js/css/')));
app.use('/node_modules/reveal.js/js', express.static(path.join(__dirname, '/node_modules/reveal.js/js/')));
app.get('/', function (req, res) {
  app.use(express.static(path.join(__dirname, '/node_modules/reveal.js/')));
  res.sendFile(path.join(__dirname + '/index.html'));
})
const server = app.listen(2015);
if(timeout)setTimeout(()=>server.close(), timeout*1000);