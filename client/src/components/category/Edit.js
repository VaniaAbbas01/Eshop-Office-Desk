import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

function CategoryEdit(){
    // save id from request parameters
    const {id}=useParams('');
    // declare state variables for msg field
    const [msg, setMsg]=useState('');
    // declare state variables for name and description textboxes
    const [name, setName]=useState('');
    const [description, setDecription]=useState('');
    const navigate=useNavigate();

    function save(){
        axios.post('http://localhost:5000/category/update',
                  {cid:id, name:name, description:description}).then((res)=>{
                      // setMsg(res.data.msg);
                      navigate(-1);
        });
    }


    // call /category/:cid api and store data received in
    // state variables
    function getCategoryDetail(){
        axios.get('http://localhost:5000/category/'+id).then((res)=>{
        setName(res.data[0].name);
        setDecription(res.data[0].description);
        });
    }

    // set useEffect hook to call getCategoryDetail function
    // when there is change in id variable
    useEffect(()=>{
        getCategoryDetail();
    }, []);

    // return a form with name and decsription in text fields
    // and a button to call save function
    return (
        <div>
            <h2>Edit category</h2>
            <table align="center">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td><input type='text' name='name' value={name} onChange={(e)=>{setName(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><textarea name='description' row='3' cols='30' value={description} onChange={(e)=>{setDecription(e.target.value)}}>
                        </textarea></td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <input type='hidden' name='id' value={id} />
                            <button onClick={save}>Save</button> &nbsp; <button onClick={()=>navigate(-1)}>Cancel</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'>{msg}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CategoryEdit;
