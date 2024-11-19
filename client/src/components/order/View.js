
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function OrderView(){
    // assign an empty array to OrderList state variable
    const [orderList, setOrderList]=useState([]);

    // call /Order api and store data received in response
    // to OrderList state variable
    function getOrderList(){
        console.log('getOrderList called');
        axios.get('http://localhost:5000/Order/').then((res)=>{
            setOrderList(res.data);
        //*console.log(res.data);
        });
    }


    // set useEffect hook to call getOrderList function
    // when there is change in OrderList array i.e. only once
    useEffect(()=>{
        getOrderList();
    }, []);

    return (
        <div>
            <p><Link to='/order/add'>New Order</Link></p>
            <table>
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
                        // OrderList array and render a table row
                        // for each Order in the array
                        OrderList.map((Order, index)=>{
                        return (
                        <>
                        <tr>
                            <td>{index+1}</td>
                            <td>{Order.name}</td>
                            <td>{Order.description}</td>
                            <td>
                                <Link to={'/order/detail/' + Order.cid} className='link'>Details</Link>
                                &nbsp;
                                <Link to={'/order/edit/'+ Order.cid} className='link'>Edit</Link>
                                &nbsp;
                                <Link to={'/order/delete/' + Order.cid} className='link'>Delete</Link>
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
