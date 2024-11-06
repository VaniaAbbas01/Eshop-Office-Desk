const express = require('express')
const router = express.Router()

// view all categories
router.get('/', (req,res)=>{
    res.status(200).send({'msg': "Welcome to Eshop"});
})


module.exports=router