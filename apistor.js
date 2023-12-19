/*
fetch("http://localhost:3001/users", {
  method: "POST",
  body: JSON.stringify({
    userId: 1,
    title: "Fix my bugs",
    completed: false
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));

  */


  class Apistor {
    constructor(){
      this.connection;
    }

    databaseConnect(host,user,password,database,port){
      return mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        port: port,
      });
    }

    query(query){
      connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
    }


  }


  console.log(JSON.stringify({
    host: "mysql-284bd9f9-khodge1-9a96.a.aivencloud.com",
    user: 'avnadmin',
    password: 'AVNS_uj8SPMvMDIqb7M7_NqU',
    database: 'defaultdb',
    port: 17203,
  }))