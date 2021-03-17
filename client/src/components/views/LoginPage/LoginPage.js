import React, { useState } from 'react';
import axios from "axios";
import  { useDispatch } from "react-redux";

function LoginPage() {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        console.log('Email = ' + Email);
        console.log('Password = ' + Password);

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))


    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit={ onSubmitHandler }>
                <lable>Email</lable>
                <input type="email" value={Email} onChange={ onEmailHandler } />
                <lable>Password</lable>
                <input type="password" value={Password} onChange={ onPasswordHandler } />
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
