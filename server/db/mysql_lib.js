const mysql=require('mysql2')

// mysql server credentials
mysql_con_properties= {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eshop',
    port: '3306'
};

var con;

// establish connection
function connect(){
    con=mysql.createConnection(mysql_con_properties);
    con.connect(function(err){
        if(err){
            console.log(err);
        } else {
            console.log('Connected to mysql');
        }
    });
}

function query(sql, values, callback){
    connect();
    con.query(sql, values, callback);
}

module.exports={query};
