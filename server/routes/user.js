const express = require('express')
const router = express.Router()
const mysql_lib=require('../db/mysql_lib')
const jwt=require('jsonwebtoken')


router.get('/user/login', (req,res)=>{
    mysql_lib.query('select uid from users where login=? and password=?',
         [req.body.userId, req.body.password],
        function(err, rows, fields){
            if(err){
                console.log(err);
                res.status(500).send({loggedIn: false, 'msg': err});
            }
            else{
                if(rows.length ==0)
                    res.status(200).send({loggedIn:false, msg: 'Login or Password is incorrect'});
                else{
                    const uid = rows[0].uid;
                    const payload = {uid:uid};
                    const token=jwt.sign(payload, process.env.SECRET_KEY)
                    res.status(200).send({loggedIn:true, token:token});
                }
            }
        })
})


module.exports=router;