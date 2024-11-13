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
        axios.get('/category/:id').then(function(res) {
            setName(res.name);
            setDescription(res.description);
        })
    }

    function save()
    {
        axios.post('category/update', [name, description, id]);
        setMsg("Successfully Edited");
    }

    useEffect(() => {
        getCategoryData();
    }, []);

    return (
        <div>
        <p><Link to='/category/add'>New category</Link></p>
        <table>
            <tbody>
                <input name="name" >{name}</input>
                <input name="description" >{description}</input>
                <input name="id" type='hidden' >{id}</input>
            </tbody>
        </table>
    </div>

    );
}

export default CategoryEdit;