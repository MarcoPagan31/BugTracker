import React, { Component } from "react";
import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";

const Signup = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState()

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: username,
                password: password,
                Email: email,
                role: role
            }),
            
        };
        fetch("api/IssueTracker", requestOptions)
            .then((response) => response.text())
            .then((data) => {
               

            })
    }

    return (
        <div>
            <body>
                <form action="#" method="POST">
                    <TextField onChange={(e) => setUsername(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <TextField onChange={(e) => setPassword(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <TextField onChange={(e) => setEmail(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <TextField onChange={(e) => setRole(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <Button onClick={() => post()}> Sign Up</Button>
                </form>
            </body>
        </div>
    );
}



export default Signup;


