// product router file

// load libraries
const express=require('express')
const router=express.Router()
const mysql_lib=require('../db/mysql_lib')

// define routes

// route to view all products
router.get('/', (req, res)=>{
    mysql_lib.query('select pid, name, description from product',
                    undefined,
                    function(err, rows, fields){
                        if(err){
                            console.log(err)
                            res.status(500).send({'msg': err})
                        }
                        else{
                            res.status(200).send(rows)
                        }
                    })
})

// route to view products by category
router.get('/:cid', (req, res)=>{
    let cid=req.params.cid
    mysql_lib.query('select pid, name, description from product where cid=?',
                    [cid],
                    function(err, rows, fields){
                        if(err){
                            console.log(err)
                            res.status(500).send({'msg': err})
                        }
                        else{
                            res.status(200).send(rows)
                        }
                    })
})

// route to view products by category and price range
// parameters: cid, pricefrom, priceto
router.post('/filter', (req, res)=>{
    let cid=req.body.cid;
    let pricefrom=req.body.pricefrom;
    let priceto=req.body.priceto;
    let values=[];
    let qry='select p.pid, p.name, p.unit_price as price, (select image from product_images where pid=p.pid limit 1) as image from product p';
    if( cid==="0" || cid==="" ){
        qry+=' where p.cid=(select cid from category limit 1)';
    } else {
        qry+=' where p.cid=?';
        values.push(cid);
    }
    if( pricefrom.length!==0 && priceto.length!==0){
        qry+=' and p.unit_price between ? and ?';
        values.push(pricefrom);
        values.push(priceto);
    } else if( pricefrom.length!==0 && priceto.length===0){
        qry+=' and unit_price>=?';
        values.push(pricefrom);
    } else if( pricefrom.length===0 && priceto.length!==0){
        qry+=' and unit_price<=?';
        values.push(priceto);
    }
    //res.send({"qry": qry, "values": values})
    mysql_lib.query(qry,
                    values,
                    function(err, rows, fields){
                        if(err){
                            console.log(err)
                            res.status(500).send({'msg': err})
                        }
                        else{
                            res.status(200).send(rows)
                        }
                    })
})

module.exports=router
