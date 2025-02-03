// user router file
const express=require('express')
const router=express.Router();
const mysql_lib=require('../db/mysql_lib')
const jwt=require('jsonwebtoken');

// generate a 32 character hash key by typing following command
// openssl rand -base64 32
// create .env file in server directory and
// save the generated hash string in the .env file like:
// SECRET_KEY=hash string

// route that can only be accessed
// by a verified user
// here authenticateToken is a middleware that will
// execute first to check for authenticity
// and it will allow to execute following route
// only if we receive a valid jwt token from client
router.get('/', authenticateToken, (req, res)=>{
    // we can use req.user_info that contains uid
    // to generate uid based response
    // however in this example i am not using it
    mysql_lib.query("select uid, username from users",
    undefined,
    function(err, rows, fields){
        if(err) {
            console.log(err);
            res.status(500).json({msg:err});
        } else {
            console.log(rows);
            res.send({loggedIn:true, rows:rows});
        }

    })
});

// define a middleware to authenticate user
function authenticateToken(req, res, next){
    // get authorization header send from client
    // authorization header format is:
    // Authorization: Bearer JWT
    const authHeader=req.headers['authorization'];
    // get JWT from authorization header
    // logic:
    // if authHeader is not undefined then
    // split the header on space and get 2nd element
    // in array i.e. JWT and save it in token variable
    const token= authHeader && authHeader.split(' ')[1];
    // if token is null then return unauthorized header
    if( token==null ) return res.send({loggedIn:false, msg: 'Please login to access this page'});
    // verify JWT with our secret key
    jwt.verify(token, process.env.SECRET_KEY, (err, user_info)=>{
        // if token is not verified return forbidden status
        if(err) return res.send({loggedIn:false, msg:'Invalid login and password'});
        // if token successfully verified
        // extract the object stored in JWT
        // and store it in request object
        req.user_info=user_info;
        // pass on to the requested route
        next();
    });
}

// route to authenticate user
// data will come from sign-in form
router.post('/login', (req, res)=>{
    var username=req.body.username;
    var password=req.body.password;
    mysql_lib.query("select uid from users where username=? and pwd=?",
    [username, password],
    function(err, rows, fields){
        if(err) {
            console.log(err);
            res.status(500).json({loggedIn:false, msg:err});
        } else if(rows.length==0){
            res.json({loggedIn:false, msg:'Invalid login or password'});
        }else {
            // save user id in an object along with
            // any other required info like
            // group id, access level etc
            const user_info={uid:rows[0].uid};
            // create jwt access token that contains
            // user_info object
            // this token is encrypted using a secret key saved
            // in .env file in ACCESS_TOKEN_SECRET variable
            const token=jwt.sign(user_info, process.env.SECRET_KEY, {expiresIn: '30m'});
            // send this jwt token to client
            res.json({loggedIn:true, token:token});
        }
    });
});

module.exports=router;
