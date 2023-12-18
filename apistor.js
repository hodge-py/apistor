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
    


  }

const url = 'http://localhost:3001';
const options = {
	method: 'POST',
	body: {
		testbody: "this is a test"
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}