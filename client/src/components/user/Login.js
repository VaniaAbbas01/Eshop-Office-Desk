import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


function LoginView(){
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    function signin(){
        const res=axios.post('/user/login', {userId:userId, password:password});
        if(res.data.loggedIn === false){
            setMsg(res.data.msg);
        }
        else{
            const token=res.data.token;
            // res.cookie('token',token, {expiresIn: '60m'}); // store token using cookie
            localStorage.setItem('token', token, {expiresIn: '60m'});
            Navigate('/order/');
        }

    }

    return (
        <div>
            <h2>Sign In</h2>
            <table align='center'>
                <tbody>
                    <tr>
                        <td>User Name</td>
                        <td><input type="text" name="name" value={name} onChange={(e)=> {setUserId(e.target.value)}}/></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" name="password" value={password} onChange={(e)=> {setPassword(e.target.value)}}/></td>
                    </tr>

                </tbody>
            </table>
        </div>
    );

}

export default LoginView;