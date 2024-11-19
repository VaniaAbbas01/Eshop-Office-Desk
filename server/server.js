// server.js

// use of JSON:
// universalality of JSON in react and react native
// keeping the UI seperate

// load modules
const express = require('express');
// const parseJson = require('parse-json'); // to easily read Json data 
const cors = require('cors'); // c:Cross o:Origin rs:Requests -> 
const mysql_lib = require("./db/mysql_lib.js"); // custom mysql lib 
const bodyParser = require('body-parser');

// create objects 
const app=express();
// serve static pages from public folder
app.use(express.static('public'));
// set bodyParser to parse json data
app.use(bodyParser.json());
// accept cross origin requests
app.use(cors());

const orderRouter = require('./routes/order.js'); // landing page route
const categoryRouter = require('./routes/category.js');
const productRouter = require('./routes/product.js');

// bind urls with routers
app.use('/', orderRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

// start web server
app.listen(5000,()=>{
   console.log('Server running at port 5000');
})