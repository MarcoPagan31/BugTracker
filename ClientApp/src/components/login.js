import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import loginform from './loginform.css';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [developer, setDeveloper] = useState();
    const [submitter, setSubmitter] = useState();
    const [userRole, setUserRole] = useState();
    const [userId, setUserId] = useState();

    const Setroles = () => {
        return (
            <div>
                {setAdmin("Admin")}
                {setManager("Manager")}
                {setDeveloper("Developer")}
                {setSubmitter("Submitter")}
            </div>
        )
    }

    const getrole = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: username,
            }),

        };
        fetch("api/IssueTracker/getuser", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUserRole(data.role);
                setUserId(data.id);
            })
    }

    useEffect(() => {
        getrole();
    }, [username])

    const login = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: username,
                password: password,
            }),

        };
        fetch("api/IssueTracker/login", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                
            })
    }

    return (
        <div>
            <Setroles />
            <body>
                <div class="login-page">
                    <div class="form">
                        <h2> <i class="fas fa-bug"></i> Bug Tracker </h2>
                        <form class="login-form">
                            <TextField onChange={(e) => setUsername(e.target.value)}> </TextField>
                            <br>
                            </br>
                            <TextField type="password" onChange={(e) => setPassword(e.target.value)}> </TextField>
                            <br>
                            </br>
                            <Link to={{
                                pathname: '/dashboard',
                                state: {
                                    username: username,
                                    userId: userId,
                                    role: userRole
                                }
                            }}> <Button onClick={() => { login(); }}> Login </Button>
                            </Link>

                            <Link to={{
                                pathname: '/demousers',
                                state: {
                                    username: username,
                                    admin: admin,
                                    manager: manager,
                                    developer: developer,
                                    submitter: submitter
                                }
                            }}> Sign in as a Demo User </Link>
                            <br>
                            </br>
                            <Link to={{
                                pathname: '/signup',
                            }}> Register as a New User</Link>
                            <br>
                            </br>
                            <Link to={{
                                pathname: '/confirmation',
                            }}> Forgot Password </Link>
                        </form>
                    </div>
                </div>
                
            </body>
        </div>
    );
}



export default Login;


