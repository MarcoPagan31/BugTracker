import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import loginform from './loginform.css';

const ResetPassword = () => {
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
        <div>
            <Setroles />
            <input type="hidden" />
            <input type="hidden" />
            <body>
                <div class="form-group">
                    <label> Password </label>
                    <input />
                </div>
                <div class="form-group">
                    <label> Confirm Password </label>
                    <input />
                </div>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                <br>
                </br>
                <Button> Reset </Button>
            </body>
        </div>
    );
}



export default ResetPassword;