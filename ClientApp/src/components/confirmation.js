import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import loginform from './loginform.css';

const Confirmation = () => {
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [developer, setDeveloper] = useState();
    const [submitter, setSubmitter] = useState();
    const [userRole, setUserRole] = useState();
    const [email, setEmail] = useState();

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

    const sendConfLink = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Email: email
            }),

        };
        fetch("Password/forgotpassword", requestOptions)
            .then((response) => response.json())
            .then((data) => {

            })
    }

    return (
        <div class="login-page">
            <form class="login-form">
                <Setroles />
                <body>
                    <div class="form">
                        <h4> Enter your email below</h4>
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                        <br>
                        </br>
                        <Button onClick={() => { sendConfLink() }}> Submit </Button>
                    </div>
                </body>
            </form>
        </div>
    );
}



export default Confirmation;