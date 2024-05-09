var express = require('express')
var {Client} = require('pg');
var app = express()

client = new Client({
  host: 'pedidos-ms-postgres',
  user: 'pedidos-ms',
  password: 'pedidos-ms',
  database: 'pedidos-ms',
})

app.get('/', function (req, res) {
  client.connect().then(() => {
    res.end('Conectado ao Postgres');
  }).catch((err) => {
    console.error('Error connecting to the database:', err);
  });
})

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})