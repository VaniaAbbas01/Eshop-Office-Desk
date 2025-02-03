import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function LogoutView(){
    const navigate=useNavigate()

    useEffect(()=>{
        function doLogout(){
            localStorage.removeItem('token')
            navigate('/')
        }

        doLogout()
    }, [])
    return (
        <div></div>
    );
}

export default LogoutView;
