import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

function DeleteCategory()
{
    const [id, setID] = useParams('');
    const [msg, setMsg] = useState('');

    function deleteRecord()
    {
        axios.post("http://localhost:5000/category/delete/:cid", [id]);
        setMsg("Record Successfully Deleted")
    }

    useEffect(()=>{
        deleteRecord()
    }, [])

    return (
        <div>
            <p>{msg}</p>
        </div>
    )

}

export default DeleteCategory;