import express from 'express'
import cors from 'cors'

export let myVariable = "";
const app = express();

app.listen(3000, () => {
  console.log('Our app is listening for request on port 3000');
});

app.use(cors())

app.get('/up', (request, response) => {
  myVariable = "up"
  response.send("hello");
});

app.get('/value', (request, response) => {
  response.json(JSON.stringify({ result: myVariable }));
});

app.get('/down', (request, response) => {
  myVariable = "down"
});