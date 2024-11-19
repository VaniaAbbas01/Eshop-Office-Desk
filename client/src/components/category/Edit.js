import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

function CategoryEdit()
{
    const [id, setID] = useParams('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate()

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
        axios.post('http://localhost:5000/category/update', {cid: cid, name:name, description:description}).then((res)=>{
            navigate(-1);
        });
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
                <button onClick={save}>Submit</button>
                <button onClick={()=>navigate(-1)}>Cancel</button>
                <p>{msg}</p>
            </tbody>
        </table>
    </div>

    );
}

export default CategoryEdit;