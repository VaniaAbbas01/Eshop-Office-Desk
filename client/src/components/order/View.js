import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function OrderView(){
    // assign an empty array to orderList state variable
    const [orderList, setOrderList]=useState([]);

    // call /order api and store data received in response
    // to orderList state variable
    function getOrderList(){
        axios.get('http://localhost:5000/order/').then((res)=>{
        setOrderList(res.data);
        });
    }


    // set useEffect hook to call getOrderList function
    // when there is change in orderList array i.e. only once
    useEffect(()=>{
        getOrderList();
    }, []);

    return (
        <div>
            <p><Link to='/order/add'>New order</Link></p>
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
                        // orderList array and render a table row
                        // for each order in the array
                        orderList.map((order, index)=>{
                        return (
                        <>
                        <tr>
                            <td>{index+1}</td>
                            <td>{order.name}</td>
                            <td>{order.description}</td>
                            <td>
                                <Link to={'/order/detail/' + order.cid} className='link'>Details</Link>
                                &nbsp;
                                <Link to={'/order/edit/'+ order.cid} className='link'>Edit</Link>
                                &nbsp;
                                <Link to={'/order/delete/' + order.cid} className='link'>Delete</Link>
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

export default OrderView;
