const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());
app.use(urlencoded());

app.get('/', (req, res)=>{
  res.send('hello world!')
});

app.listen(port, ()=>{
  console.log(`Reviews server connected to port ${port}`);
});