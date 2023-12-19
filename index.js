const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql2');
var session = require('express-session');

var connection;

const con = mysql.createConnection({
  host: 'mysql-284bd9f9-khodge1-9a96.a.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_uj8SPMvMDIqb7M7_NqU',
  database: 'defaultdb',
  port: 17203,
});

con.query(
  'SELECT * FROM `users`',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);


app.use(session({secret:'XASDASDAasasvqegqegZ', resave: false, saveUninitialized: true}));
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});

app.post('/add-database', (req, res) => {
  rand_var = makeid(30);
  con.query('INSERT INTO database_details (host, user, password,database,port,rand_api) VALUES (?,?,?,?,?,?)', [req.body.host, req.body.user, req.body.password,req.body.database,req.body.port,rand_var],(error, results) => {
     if (error) return res.json({ error: error });

     if (results) return res.json(results);
     });



});

app.post('/lookupDatabase', (req, res) => {
  con.query('SELECT rand_api FROM database_details WHERE host = ? and user = ? and password = ?', [req.body.host, req.body.user, req.body.password],(error, results) => {
     if (error) return res.json({ error: error });

     
     if(results){
      res.json(results.rand_api)
     }

    });

});


app.post('/database-connect', (req, res) => {
  con.query('SELECT host, user, password, database, port FROM database_details WHERE rand_api = ?', [req.body.rand_var],(error, results) => {
     if (error) return res.json({ error: error });

     
     if(results){
      connection = mysql.createConnection({
        host: results.host,
        user: results.user,
        password: results.password,
        database: results.database,
        port: results.port,
      });

     }

    });

});

app.post('/query', (req, res) => {
  connection.query(req.body.query, [req.body.rand_var],(error, results) => {
     if (error) return res.json({ error: error });

     
     if(results){

     }

    });

});






function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}