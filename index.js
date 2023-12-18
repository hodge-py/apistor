const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql2');

// defining the Express app

const connection = mysql.createConnection({
  host: 'mysql-284bd9f9-khodge1-9a96.a.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_uj8SPMvMDIqb7M7_NqU',
  database: 'defaultdb',
  port: 17203,
});

connection.query(
  'SELECT * FROM `users`',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

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

app.post('/register', (req, res) => {
  code = authcode(30);

  connection.query('INSERT INTO users (username, password, auth) VALUES (?,?,?)', [req.query.username, req.query.password, code],(error, results) => {
     if (error) return res.json({ error: error });

     });

  res.send({Oauth: code});
});




function authcode(length){
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