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
const path = require('path');

// create objects 
const app=express();
// serve static pages from public folder
app.use(express.static('public'));
// set bodyParser to parse json data
app.use(bodyParser.json());
// accept cross origin requests
app.use(cors());

app.use('/upload', express.static(path.join(__dirname, 'uploads')));

const userRouter = require('./routes/user.js');
const orderRouter = require('./routes/order.js'); // landing page route
const categoryRouter = require('./routes/category.js');
const productRouter = require('./routes/product.js');
const uploadRouter = require('./routes/upload.js');
const customerRouter = require('./routes/customer.js');

// bind urls with routers
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/upload', uploadRouter);
app.use('/customer', customerRouter);


// start web server
app.listen(5000,()=>{
   console.log('Server running at port 5000');
})