const express = require('express')
const router = express.Router()
const mysql_lib=require('../db/mysql_lib')
const auth=require('./authorize')


router.get('/', auth.authorizeUser, (req,res) => {
    mysql_lib.query('select cid, name, description from category',
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
    let cid = req.params.cid;
    mysql_lib.query('select cid, name, description from category where cid = ?',
                    [cid],
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
    mysql_lib.query('insert into category(name, descriptio) values (?,?)',
                    [name, description],
                    function(err, rows, fields){
                        if(err){
                            console.log(err);
                            res.status(500).send({'msg': err});
                        }
                        else{
                            res.status(200).send({'msg': "Category Added"});
                        }
                    })
})

router.post('/update', (req,res) => {
    let name = req.params.name;
    let description = req.params.description;
    let cid = req.params.cid;
    mysql_lib.query('update category set name = ? description = ? where cid = ?',
                    [name, description, cid],
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

router.post('/delete/:cid', auth.authorizeUser, (req,res) => {
    let cid = req.params.cid;
    mysql_lib.query('DELETE FROM category WHERE cid = ?',
                    [cid],
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