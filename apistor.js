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
    constructor(baseUrl,apiKey,apiHost){
      this.baseUrl = baseUrl
      this.apiKey = apiKey
      this.apiHost = apiHost
    }


  }

const url = 'http://localhost:3001/test';
const options = {
	method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
	body: JSON.stringify({ testbody: "this is a test" })
};

async function tester(){
	const response = await fetch(url, options);
	const result = await response.text();
  console.log(result)
}

tester()