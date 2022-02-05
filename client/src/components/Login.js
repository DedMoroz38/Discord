import React from "react";
import './components.css';
import discordLogo from '../images/discord-logo2.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { login } from '../store/login/actions.js';




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [notRegistered, setNotRegistered] = useState(false);

    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const myFunction = (event) => {
        event.preventDefault();
        if (email.length !== 0 && password.length !== 0) {
            setError(false);
            console.log(1);
            addUserToDB();
        } else {
            setError(true);
        }
    }

    const addUserToDB = () => {
        axios.post('http://localhost:3001/login',
            {
                email: `${email}`,
                password: `${password}`
            }).then((res) => {
                handleData(res);
            });
    };

    const handleData = (res) => {
        const result = res.data.result;
        console.log(res);
        if (result) {
            if (res.data.message === "Account doesn't exist!") {
                console.log('No registered');
                setNotRegistered(true);
            } else if (res.data.message === 'OK') {
                setLoginStatus(true);
                setNotRegistered(false);
                console.log("Fine");
                setUserId(result[0].id);
                setUserName(result[0].userName);
                navigate('/');
            } else if (res.data.message === "Wrong password!") {
                console.log('wrong password');
            } else {
                console.log('Unknown error in loggining', res);
            }
        }
    }
    useEffect(() => {
        dispatch(login({ id: userId, name: userName }));
    }, [userName]);

    return (
        <div className="form-box">
            <div className="logoBox">
                <img src={discordLogo} alt="discordLogo"></img>
            </div>
            <form onSubmit={myFunction} className="registrationForm">
                <h2>Welcome!</h2>
                <div className={"input-box"}>
                    <p className="input-name">EMAIL</p>
                    <input type='text'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>
                <div className="input-box input-box-password">
                    <p className="input-name">PASSWORD</p>
                    <input type={showPassword ? 'text' : "password"}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    <div className="passwordToggle" onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</div>
                </div>
                <p className={`input-name ${error ? "passwordErrorMessage" : ""}`}>{error ? 'Fill in inputs!' : ''}</p>
                <p className={`inputError ${loginStatus ? 'trigger' : ''}`}><span className="passwordErrorMessage">Password or email is invalid</span></p>
                <div className="password-forget-box">
                    <p className="password-forget">Forgot your password?</p>
                </div>
                <input type="submit" className="login-button" value="Login" />
                <p className="need-account-box">Need an account? <Link to="/registration" className="need-account"> Register</Link></p>
            </form>
        </div>
    )
}
export default Login;
