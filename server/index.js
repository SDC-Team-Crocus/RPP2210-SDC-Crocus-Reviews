const express = require('express');
const app = express();
const port = 4000;
const path = require('path');
const reviewsRoutes = require('./routes/reviews.js')

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//middleware to handle the CORS error
app.use((re1, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //setHeader will not send the response to client, only modify the header
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})


app.use('/reviews', reviewsRoutes);

app.use((req, res)=>{
  res.status(404).send('error!!')
})

app.listen(port, ()=>{
  console.log(`Reviews server connected to port ${port}`);
});