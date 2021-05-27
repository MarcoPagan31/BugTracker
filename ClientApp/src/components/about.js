import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { FixedSizeList as List } from 'react-window';
import css from './style.css';
import Select from 'react-select';
import { useLocation } from "react-router";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from 'react-router-dom';
import Card from './card';

const About = () => {
    const location = useLocation();
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [developer, setDeveloper] = useState();
    const [submitter, setSubmitter] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();

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

    const logout = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({

            }),
        };
        fetch("api/IssueTracker/logout", requestOptions)
            .then((response) => response.text())
            .then((data) => {

            })
    }

    const DeveloperSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { developer: developer, username: username } }} class="list-group-item list-group-item-action bg-light">Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { developer: developer, username: username } }} class="list-group-item list-group-item-action bg-light">My Projects</Link>
                <Link to={{ pathname: "/usertickets", state: { developer: developer, username: username } }} class="list-group-item list-group-item-action bg-light">My Tickets </Link>
            </div>
        )
    }

    const AdminSidebar = () => {
        return (
            <div >
                <Link to={{ pathname: "/dashboard", state: { admin: admin, username: username } }} class="list-group-item list-group-item-action bg-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer2" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                        <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z" />
                    </svg> Dashboard</Link>
                <Link to={{ pathname: "/manageroles", state: { admin: admin, username: username } }} class="list-group-item list-group-item-action bg-light"> <i class="fas fa-user-tag"></i> Manage User Roles</Link>
                <Link to={{ pathname: "/manageusers", state: { admin: admin, username: username } }} class="list-group-item list-group-item-action bg-light"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg> Manage Project Users</Link>
                <Link to={{ pathname: "/manageprojects", state: { admin: admin, username: username } }} class="list-group-item list-group-item-action bg-light"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
                    <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                </svg> Manage Projects</Link>
                <Link to={{ pathname: "/managetickets", state: { admin: admin, username: username } }} class="list-group-item list-group-item-action bg-light"> <i class="fas fa-ticket-alt"></i> My Tickets </Link>
            </div>
        )
    }

    const SubmitterSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { submitter: submitter, username: username } }} class="list-group-item list-group-item-action bg-light">Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { submitter: submitter, username: username } }} class="list-group-item list-group-item-action bg-light">My Projects</Link>
                <Link to={{ pathname: "/managetickets", state: { submitter: submitter, username: username } }} class="list-group-item list-group-item-action bg-light">My Tickets </Link>
            </div>
        )
    }

    const ManagerSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { manager: manager, username: username } }} class="list-group-item list-group-item-action bg-light">Dashboard</Link>
                <Link to={{ pathname: "/manageprojects", state: { manager: manager, username: username } }} class="list-group-item list-group-item-action bg-light">Manage Projects</Link>
                <Link to={{ pathname: "/managetickets", state: { manager: manager, username: username } }} class="list-group-item list-group-item-action bg-light">My Tickets </Link>
            </div>
        )
    }

    return (
        <div>

            <div class="d-flex" id="wrapper">
                <div class="bg-custom-2 border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading"> Issue Tracker </div>
                    <div class="list-group list-group-flush">
                        {

                            location.state.developer != null ? (
                                <DeveloperSidebar />
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            location.state.admin != null ? (
                                <AdminSidebar />
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            location.state.manager != null ? (
                                <ManagerSidebar />
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            location.state.submitter != null ? (
                                <SubmitterSidebar />
                            ) : (
                                    <h3></h3>
                                )}

                    </div>

                </div>
                <div id="page-content-wrapper">
                    <div class="container-fluid">
                        <nav class="navbar navbar-dark bg-custom-2">
                            <a class="navbar-brand" href="#">Logged in as: {location.state.admin} {location.state.developer} {location.state.submitter} {location.state.manager} {location.state.username} </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav mr-auto">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">About</a>
                                    </li>
                                </ul>
                                <form class="form-inline my-2 my-lg-0">
                                    <Link to={{
                                        pathname: '/login',
                                    }}> <Button onClick={() => logout()}> Logout </Button>
                                    </Link>
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </div>
                        </nav>
                        <br>
                        </br>
                    </div>
                    <h1 id="main"> About </h1>
                    <div id="select" class="wrapper">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-3">
                                    <Card
                                        title='Admin'
                                        imageUrl=''
                                        body='Admins can create and edit all projects and tickets. They can also assign and unassign users to projects and tickets.'
                                    />
                                </div>
                                <div class="col-md-3">
                                    <Card
                                        title='Project Manager'
                                        imageUrl=''
                                        body='Admins can create and edit all projects and tickets. They can also assign and unassign users to projects and tickets.'
                                    />
                                </div>
                                <div class="col-md-3">
                                    <Card
                                        title='Developer'
                                        imageUrl=''
                                        body='Admins can create and edit all projects and tickets. They can also assign and unassign users to projects and tickets.'
                                    />
                                </div>
                                <div class="col-md-3">
                                    <Card
                                        title='Submitter'
                                        imageUrl=''
                                        body='Admins can create and edit all projects and tickets. They can also assign and unassign users to projects and tickets.'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About;