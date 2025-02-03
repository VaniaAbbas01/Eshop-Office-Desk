import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ProductView(){
    // assign an empty array to productList state variable
    const [productList, setProductList]=useState([]);

    // call /product api and store data received in response
    // to productList state variable
    function getProductList(){
        axios.get('http://localhost:5000/product/').then((res)=>{
        setProductList(res.data);
        });
    }


    // set useEffect hook to call getProductList function
    // when there is change in productList array i.e. only once
    useEffect(()=>{
        getProductList();
    }, []);

    return (
        <div>
            <p><Link to='/product/add'>New product</Link></p>
            <table align="center">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // using map function, iterate over
                        // productList array and render a table row
                        // for each product in the array
                        productList.map((product, index)=>{
                        return (
                        <>
                        <tr>
                            <td>{index+1}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link to={'/product/detail/' + product.cid} className='link'>Details</Link>
                                &nbsp;
                                <Link to={'/product/edit/'+ product.cid} className='link'>Edit</Link>
                                &nbsp;
                                <Link to={'/product/delete/' + product.cid} className='link'>Delete</Link>
                            </td>
                        </tr>
                        </>)
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ProductView;
