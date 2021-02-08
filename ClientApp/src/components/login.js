import React, { Component } from "react";
import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import loginform from './loginform.css';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    let history = useHistory();

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),

        };
        fetch("api/IssueTracker/login", requestOptions)
            .then((response) => response.text())
            .then((data) => {
                
            })
    }

    return (
        <div>
            <body>
                <div class="login-page">
                    <div class="form">
                        <form class="login-form">
                            <TextField onChange={(e) => setUsername(e.target.value)}> </TextField>
                            <br>
                            </br>
                            <TextField onChange={(e) => setPassword(e.target.value)}> </TextField>
                            <br>
                            </br>
                            <Link to={{
                                pathname: '/dashboard',
                                state: {
                                    username: username,
                                }
                            }}> <Button onClick={() => post()}> Login </Button>
                            </Link>
                            
                        </form>
                    </div>
                </div>
            </body>
        </div>
    );
}



export default Login;


