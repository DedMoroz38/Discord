import React from "react";
import './components.css';
import discordLogo from '../images/discord-logo2.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { login } from '../store/login/actions.js';




const Registration = () => {
    const [emailState, setEmailState] = useState(true);
    const [passwordState, setPasswordState] = useState(true);

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [validate, setValidate] = useState(true);

    const [emailError, setEmailError] = useState(false);
    const [userError, setUserError] = useState(false);

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const emailValidation = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailState(true);
        } else {
            setEmailState(false);
        }
    };

    const passwordValidation = () => {
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            setPasswordState(true);
        } else {
            setPasswordState(false);
        }
    }

    const myFunction = (event) => {
        event.preventDefault();
        emailValidation();
        passwordValidation();
        setValidate(!validate);
    }

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        } else if (emailState && passwordState) {
            addUserToDB();
        }

    }, [validate]);

    const addUserToDB = () => {
        axios.post('http://localhost:3001/register',
            {
                email: `${email}`,
                userName: `${userName}`,
                password: `${password}`
            }).then((res) => {
                handleData(res);
            });
    };

    const handleData = (respond) => {
        console.log(respond);
        if (respond.data.err) {
            if (respond.data.err.sqlMessage.includes('email_UNIQUE')) {
                setEmailError(true);
                console.log('email ERROR');
            } else if (respond.data.err.sqlMessage.includes('userName_UNIQUE')) {
                setUserError(true);
                console.log('username ERROR');
            } else {
                console.log('Unknown ERROR(');
            }

        }
        if (respond.data.result) {
            console.log('YEEEEEY!');
            setEmailError(false);
            setUserError(false);
            dispatch(login());
            navigate('/');
        }
    }



    return (
        <div className="form-box">
            <div className="logoBox">
                <img src={discordLogo} alt="discordLogo"></img>
            </div>
            <form onSubmit={myFunction} className="registrationForm">
                <h2>Create an account</h2>
                <div className="input-box emailBox">
                    <div className={`${!emailState ? "emailErrorMessageBox" : ''}`}>
                        <p className="emailErrorMessage">{!emailState ? 'Please enter an email address.' : ''}</p>
                    </div>
                    <p className={`input-name ${emailError ? 'passwordErrorMessage' : ''}`}>{emailError ? 'An account with this email already exists' : 'EMAIL'}</p>
                    <input type='text'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>
                <div className="input-box">
                    <p className={`input-name ${userError ? 'passwordErrorMessage' : ''}`}>{userError ? 'This USERNAME is taken' : 'USERNAME'}</p>
                    <input className={``}
                        type='text'
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }} />
                </div>
                <div className="input-box input-box-password">
                    <p className={`input-name ${!passwordState ? "passwordErrorMessage" : ""}`}>PASSWORD{!passwordState ? ' - at least 8 characters, 1 number and 1 letter!' : ''}</p>
                    <input type={showPassword ? 'text' : "password"}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    <div className="passwordToggle" onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</div>
                </div>

                <input type="submit" className="login-button" value="Continue" />
                <Link to="/login" className="password-forget-box">
                    <p className="password-forget">Already have an account?</p>
                </Link>
            </form>
        </div>
    )
}
export default Registration;
