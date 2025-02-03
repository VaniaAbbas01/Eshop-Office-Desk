const express = require('express')
const router = express.Router()
const mysql_lib=require('../db/mysql_lib')
const auth=require('./authorize')

// oid int auto_increment,
//     cid int not null,
//     _date date,
//     status varchar(1000),
//     constraint pk_order primary key(oid),
//     constraint fk_order_category foreign key(cid) references category(cid)
//     on update cascade on delete restrict

router.get('/', (req,res) => {
    mysql_lib.query('select oid, pid, status from order',
                    undefined,
                    function(err, rows, fields){
                        if(err){
                            console.log(err);
                            res.status(500).send({'msg': err});
                        }
                        else{
                            res.status(200).send(rows);
                        }
                    })
})

router.get('/:pid', (req,res) => {
    let pid = req.params.pid;
    mysql_lib.query('select oid, name, unit_price, description from product where pid = ?',
                    [pid],
                    function(err, rows, fields){
                        if(err){
                            console.log(err);
                            res.status(500).send({'msg': err});
                        }
                        else{
                            res.status(200).send(rows);
                        }
                    })
})

router.post('/add', auth.authorizeUser, (req,res) => {
    let name = req.params.name;
    let description = req.params.description;
    let unit_price = req.params.unit_price;
    mysql_lib.query('insert into product(name, description, unit_price) values (?,?,?)',
                    [name, description, unit_price],
                    function(err, rows, fields){
                        if(err){
                            console.log(err);
                            res.status(500).send({'msg': err});
                        }
                        else{
                            res.status(200).send({'msg': "Product Added"});
                        }
                    })
})

router.post('/update', (req,res) => {
    let name = req.params.name;
    let description = req.params.description;
    let unit_price = req.params.unit_price;
    let pid = req.params.pid;
    mysql_lib.query('update product set name = ? description = ? unit_price = ? where pid = ?',
                    [name, description, unit_price, pid],
                    function(err, rows, fields){
                        if(err){
                            console.log(err);
                            res.status(500).send({'msg': err});
                        }
                        else{
                            res.status(200).send({'msg': "Record Updated"});
                        }
                    })
})

router.post('/delete/:pid', auth.authorizeUser, (req,res) => {
    let pid = req.params.pid;
    mysql_lib.query('DELETE FROM product WHERE pid = ?',
                    [pid],
                    function(err, rows, fields){
                        if(err){
                            console.log(err);
                            res.status(500).send({'msg': err});
                        }
                        else{
                            res.status(200).send({'msg': "Record Deleted"});
                        }
                    })
})

module.exports=router