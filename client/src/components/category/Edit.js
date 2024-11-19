import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

function CategoryEdit()
{
    const [id, setID] = useParams('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [msg, setMsg] = useState('');

    function getCategoryData()
    {
        axios.get('http://localhost:5000/category/:cid', [id]).then((res)=>{
            console.log(res.data);  
            setName(res.data.name);
            setDescription(res.data.description);
        })
    };

    function save()
    {
        axios.post('category/update', [name, description, id]);
        setMsg("Successfully Edited");
    };

    useEffect(() => {
        getCategoryData();
    }, []);

    return (
        <div>
        <table>
            <tbody>
                <input name="name" >{name}</input>
                <input name="description" >{description}</input>
                <input name="id" type='hidden' >{id}</input>
                <button type="submit" onClick={save}>Submit</button>
                <p>{msg}</p>
            </tbody>
        </table>
    </div>

    );
}

export default CategoryEdit;