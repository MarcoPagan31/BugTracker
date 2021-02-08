import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import * as ReactBootStrap from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Select from 'react-select';

const Details = () => {
    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [title, setTitle] = useState();
    const [submitter, setSubmitter] = useState();
    const [developer, setDeveloper] = useState();
    const [status, setStatus] = useState();
    const userstable = [];
    const ticketstable = [];
    const location = useLocation();

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Projectsname: location.state.project_name
            }),
        };
        fetch("/api/IssueTracker/home", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.log(error)
            });

        const requestOptions2 = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Projectsname: location.state.project_name
            }),
        };
        fetch("/api/Ticket/home", requestOptions2)
            .then((response) => response.json())
            .then((data) => {
                setTickets(data);
            })
            .catch((error) => {
                console.log(error)
            });

    }, [])

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                submitter, submitter,
                developer, developer,
                status, status,
                Projectsname: location.state.project_name
            }),
        };
        fetch("/api/Ticket", requestOptions)
            .then((response) => response.json())
            .then((data) => {

            })
    }

    const renderUsers = (user, index) => {
        return (
            <tr key={index}>
                <td>{user.usersusername}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
            </tr>
        )
    }

    const renderTickets = (ticket, index) => {
        return (
            <tr key={index}>
                <td>{ticket.title}</td>
                <td>{ticket.submitter}</td>
                <td>{ticket.developer}</td>
                <td>{ticket.status}</td>
                <td>{ticket.created}</td>
            </tr>
        )
    }

    return (
        <div>
            {
                users.forEach(function (element) {
                    userstable.push({
                        username: element.usersusername, email: element.email, role: element.role
                    })
                })
            }

            {
                tickets.forEach(function (element) {
                    ticketstable.push({
                        title: element.title, submitter: element.submitter, developer: element.developer, status: element.status, created: element.created
                    })
                })
            }
            <h3> Project Details </h3>
            <h5> {location.state.project_name} </h5>
            <h5> {location.state.description} </h5>
            <form action="#" method="POST">
                <TextField onChange={(e) => setTitle(e.target.value)}> </TextField>
                <br>
                </br>
                <TextField onChange={(e) => setSubmitter(e.target.value)}> </TextField>
                <br>
                </br>
                <TextField onChange={(e) => setDeveloper(e.target.value)}> </TextField>
                <br>
                </br>
                <TextField onChange={(e) => setStatus(e.target.value)}> </TextField>
                <br>
                </br>

                <Button onClick={() => post()}> Create New Ticket </Button>
            </form>
            
            <ReactBootStrap.Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {userstable.map(renderUsers)}
                </tbody>
            </ReactBootStrap.Table >

            <ReactBootStrap.Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Submitter</th>
                        <th>Developer</th>
                        <th>Status</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketstable.map(renderTickets)}
                </tbody>
            </ReactBootStrap.Table >

        </div>
     );
        
}

export default Details;
