const mysql=require('mysql')

// mysql server credentials
mysql_con_properties= {
    host: 'localhost',
    user: 'haseeb',
    password: 'fork',
    database: 'eshop',
    port: '/var/run/mysqld/mysqld.sock'
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
