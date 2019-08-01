const express = require('express');
const path = require('path');

let options = process.argv.slice(2) || []
const options_len = options.length;

let options_processed = {}
let options_processed_last = ''

for (let i = 0; i < options_len; i++) {
    if(options[i].startsWith('-')){
        let argument_kv = options[i].split('=');
        options_processed[argument_kv[0]] = argument_kv[1] ? argument_kv[1] : '';
        options_processed_last = options[i];
    } else {
        options_processed[options_processed_last] = options[i];
    }
}

options = options_processed
const options_keys = Object.keys(options)

let timeout = 0;

if (options_keys.includes('--timeout')) {
  timeout = parseInt(options['--timeout'])
}

if (timeout) {
  console.log(
    `The server autoatically shuts down after ${timeout} seconds.`
  );
}

const app = express();

app.use(
  '/images',
  express.static(
    path.join(__dirname, '/images/')
  )
);

app.use(
  '/styles',
  express.static(
    path.join(__dirname, '/styles/')
  )
);

app.use(
  '/node_modules/reveal.js/plugin',
  express.static(
    path.join(__dirname, '/node_modules/reveal.js/plugin/')
  )
);

app.use(
  '/node_modules/reveal.js/lib',
  express.static(
    path.join(__dirname, '/node_modules/reveal.js/lib/')
  )
);

app.use(
  '/node_modules/reveal.js/css',
  express.static(
    path.join(__dirname, '/node_modules/reveal.js/css/')
  )
);

app.use(
  '/node_modules/reveal.js/js',
  express.static(
    path.join(__dirname, '/node_modules/reveal.js/js/')
  )
);

app.get('/', function (req, res) {
  app.use(
    express.static(
      path.join(__dirname, '/node_modules/reveal.js/')
    )
  );
  res.sendFile(path.join(__dirname + '/index.html'));
})

const server = app.listen(2015);

if (timeout) {
  setTimeout(() => server.close(), timeout * 1000);
}