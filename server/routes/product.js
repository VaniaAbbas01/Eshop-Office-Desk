const express = require('express')
const router = express.Router()
const mysql_lib=require('../db/mysql_lib')


router.get('/', (req,res) => {
    mysql_lib.query('select pid, name, price, quantity, description from product',
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

router.get('/:cid', (req,res) => {
    let pid = req.params.pid;
    mysql_lib.query('select pid, name, price, quanity, description from product where pid = ?',
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

router.post('/add', (req,res) => {
    let name = req.params.name;
    let description = req.params.description;
    let price = req.params.price;
    let quanity = req.params.quanity;
    mysql_lib.query('insert into product(name, description, price, quantity) values (?,?,?,?)',
                    [name, description, price, quanity],
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
    let price = req.params.price;
    let quanity = req.params.quantity;
    let pid = req.params.pid;
    mysql_lib.query('update product set name = ? description = ? price = ? quantity = ? where pid = ?',
                    [name, description, price, quanity, pid],
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

router.post('/delete/:cid', (req,res) => {
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