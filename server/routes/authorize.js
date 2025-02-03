// authorize module file

// load libraries
const express=require('express')
const jwt=require('jsonwebtoken')
require("dotenv").config()

// define middleware to authorize the user request
function authorizeUser(req, res, next){
    // get authorisation header from client
    // format of authorisation header is
    // Authorisation: Bearer token
    const authHeader=req.headers['authorisation']
    // check if the header exists
    // if it exists extract token from header
    const token=authHeader && authHeader.split(' ')[1]
    if( token===null )
        res.status(200).send({loggedIn:false, msg:'Please login to access this site'})
    else{
            jwt.verify(token, process.env.SECRET_KEY, (err, payload)=> {
            if( err ) res.send({loggedIn: false, msg: 'Invalid login or password'})
            else{
                req.uid=payload.uid
                //req.role.payload.role
                next()
            }
        })
        }
}


module.exports={authorizeUser}
