const express = require('express')
const router = express.Router()
const mysql_lib=require('../db/mysql_lib')
const jwt=require('jsonwebtoken')
require("dotenv").config()


router.get('/login', (req,res)=>{
    mysql_lib.query('select cid from customer where login=? and password=?',
         [req.body.login, req.body.password],
        function(err, rows, fields){
            if(err){
                console.log(err);
                res.status(500).send({loggedIn: false, 'msg': err});
            }
            else{
                if(rows.length ==0)
                    res.status(200).send({loggedIn:false, msg: 'Login or Password is incorrect'});
                else{
                    const cid = rows[0].cid;
                    const payload = {cid:cid};
                    const token=jwt.sign(payload, process.env.SECRET_KEY)
                    res.status(200).send({signedIn:true, token:token});
                }
            }
        })
});


module.exports=router;