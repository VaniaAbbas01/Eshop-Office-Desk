const mysql = require('mysql');

mysql_con_properties = {
    host: 'localhost',
    user: '',
    password: '',
}

function connect()
{
    con = mysql.createConnection(mysql_con_properties);
    con.connect(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('connection made')
        }
    }
    )
}