import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function UserLogin(e){
    const [msg, saveMsg]=useState('');
    const [username, setUserName]=useState('');
    const [password, setPassword]=useState(0);
    let navigate=useNavigate();
    
    function signin(){
        axios.post(
            '/users/login',
            {username:username, password:password}).then((res)=>{
                //console.log(res);
                if(res.data.loggedIn===false){
                    saveMsg(res.data.msg);
                }else{
                    const token=res.data.token;
                    // save token in local storage
                    localStorage.setItem('token', JSON.stringify(token));
                    // redirect to /users/
                    return navigate("/users");
                }
            }).catch((err)=>{
                console.log("err");
            });
    }
    
    return (
        <div>
            <p>{msg}</p>
            <h2>Sign In</h2>
            <table>
                <tbody>
                    <tr>
                        <td>User Name</td>
                        <td><input type='text' name='username' maxlen="20" onChange={(e)=>{setUserName(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type='password' name='password' maxlen="20" onChange={(e)=>{setPassword(e.target.value)}} /></td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <button onClick={signin}>Sign In</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link to='/products'>Products Home</Link>
        </div>
    );
}

export default UserLogin;
