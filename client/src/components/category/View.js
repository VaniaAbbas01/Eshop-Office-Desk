import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function CategoryView(){
    // assign an empty array to categoryList state variable
    const [categoryList, setCategoryList]=useState([]);

    // call /category api and store data received in response
    // to categoryList state variable
    async function getCategoryList(){
        /*
        axios.get('http://localhost:5000/category/').then((res)=>{
        setCategoryList(res.data);
        });
        */
        const res = await axios.get('http://localhost:5000/category/');
        setCategoryList(res.data);
    }


    // set useEffect hook to call getCategoryList function
    // when there is change in categoryList array i.e. only once
    useEffect(()=>{
        getCategoryList();
    }, []);

    return (
        <div>
            <p><Link to='/category/add'>New category</Link></p>
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
                        // categoryList array and render a table row
                        // for each category in the array
                        categoryList.map((category, index)=>{
                        return (
                        <>
                        <tr>
                            <td>{index+1}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <Link to={'/category/detail/' + category.cid} className='link'>Details</Link>
                                &nbsp;
                                <Link to={'/category/edit/'+ category.cid} className='link'>Edit</Link>
                                &nbsp;
                                <Link to={'/category/delete/' + category.cid} className='link'>Delete</Link>
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

export default CategoryView;
