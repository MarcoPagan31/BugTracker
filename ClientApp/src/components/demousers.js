import React, { Component } from "react";
import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import loginform from './loginform.css';
import { useLocation } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

const Demousers = () => {
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [developer, setDeveloper] = useState();
    const [submitter, setSubmitter] = useState();
    const location = useLocation();

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

    const loginDemo = (role) => {
        const name = role + "User";
        const email = role + "user@gmail.com"

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: name,
                email: email,
                role: role,
                password: "DemoUser123!",
            }),

        };
        fetch("api/IssueTracker/logindemo", requestOptions)
            .then((response) => response.text())
            .then((data) => {

            })
    }

    return (
        <div>
            <body>
                <Setroles/>
                <div class="login-page">
                    <div class="form2">
                        <form class="login-form">
                            <Grid container spacing={2}>
                                <Grid xs={9}>
                                    <Link to={{
                                        pathname: '/dashboard',
                                        state: {
                                            admin: location.state.admin,
                                            username: location.state.username
                                        }
                                    }}> <Button onClick={() => loginDemo(admin)}> <i class="fas fa-user-shield"></i> &nbsp; Admin </Button>
                                    </Link>
                                </Grid>
                                <Grid xs={9}>
                                    <Link to={{
                                        pathname: '/dashboard',
                                        state: {
                                            manager: location.state.manager,
                                        }
                                    }}> <Button onClick={() => loginDemo(manager)}> <i class="fas fa-user"></i> &nbsp; Manager </Button>
                                    </Link>
                                </Grid>
                                <Grid xs={9}>
                                    <Link to={{
                                        pathname: '/dashboard',
                                        state: {
                                            developer: location.state.developer,
                                        }
                                    }}> <Button onClick={() => loginDemo(developer)}> <i class="fas fa-user-tag"></i> &nbsp; Developer </Button>
                                    </Link>
                                </Grid>
                                <Grid xs={9}>
                                    <Link to={{
                                        pathname: '/dashboard',
                                        state: {
                                            submitter: location.state.submitter,
                                        }
                                    }}> <Button onClick={() => loginDemo(submitter)}> <i class="fas fa-user-cog"></i> &nbsp; Submitter </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>

            </body>
        </div>
    );
}



export default Demousers;