import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import * as signalR from '@microsoft/signalr';

const Signup = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [connectionId, setConnectionId] = useState();
    const [role, setRole] = useState();
    const [notification, setNotification] = useState();

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: username,
                password: password,
                Email: email,
            }),
            
        };
        fetch("api/IssueTracker/register", requestOptions)
            .then((response) => response.json())
            .then((data) => {
               
            })
    }

    return (
        <div class="login-page">
            <body>
                
                <form class="form" action="#" method="POST">
                  <h2> <i class="fas fa-bug"></i> Bug Tracker </h2>
                    <TextField onChange={(e) => setUsername(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <TextField type="password"  onChange={(e) => setPassword(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <TextField onChange={(e) => setEmail(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <Button onClick={() => post()}> Sign Up</Button>
                </form>
            </body>
        </div>
    );
}



export default Signup;


