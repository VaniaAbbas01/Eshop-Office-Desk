
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ProductView(){
    // assign an empty array to productList state variable
    const [ProductList, setProductList]=useState([]);

    // call /product api and store data received in response
    // to productList state variable
    async function getProductList(){
        /* console.log('getProductList called');
        axios.get('http://localhost:5000/product/').then((res)=>{
            setProductList(res.data);
        //*console.log(res.data);
        }); */
        const res = await axios.get('http://localhost:5000/product/');
        setProductList(res.data);

    }

    // set useEffect hook to call getProductList function
    // when there is change in productList array i.e. only once
    useEffect(()=>{
        getProductList();
    }, []);

    return (
        <div>
            <p><Link to='/product/add'>New Product</Link></p>
            <table>
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Unit Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // using map function, iterate over
                        // productList array and render a table row
                        // for each product in the array
                        ProductList.map((product, index)=>{
                        return (
                        <>
                        <tr>
                            <td>{index+1}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.unit_price}</td>
                            <td>
                                <Link to={'/product/detail/' + product.pid} className='link'>Details</Link>
                                &nbsp;
                                <Link to={'/product/edit/'+ product.pid} className='link'>Edit</Link>
                                &nbsp;
                                <Link to={'/product/delete/' + product.pid} className='link'>Delete</Link>
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
