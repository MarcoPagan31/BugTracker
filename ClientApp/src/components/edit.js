import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { FixedSizeList as List } from 'react-window';
import css from './style.css';
import Select from 'react-select';
import { useLocation } from "react-router";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from 'react-router-dom';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import css2 from './notifications.css';
import * as signalR from '@microsoft/signalr';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const Edit = () => {
    const location = useLocation();
    const [project_name, setProjectName] = useState();
    const [oldProjectName, setOldProjectName] = useState();
    const [description, setDescription] = useState();
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [developer, setDeveloper] = useState();
    const [submitter, setSubmitter] = useState();
    const userId = useRef();
    const [profilePicture, setProfilePicture] = useState();

    // SignalR Connection State

    const [name, setName] = useState();
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [notification, setNotification] = useState();
    const [hubConnection, setHubConnection] = useState(null);
    const notifCounter = useRef(0);

    const Setroles = () => {
        return (
            <div>
                {setAdmin("Admin")}
                {setManager("Manager")}
                {setDeveloper("Developer")}
                {setSubmitter("Submitter")}
                {console.log(location.state)}
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
    
    useEffect(() => {
        setOldProjectName(location.state.project_name.current);
        setDescription(location.state.description.current);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: location.state.username
            }),
        };
        fetch("api/IssueTracker/retrieveprofileimage", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setProfilePicture(data.filePath);
            })
    }, [])
    
    
    const editproject = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Projectsname: project_name,
                description: description,
                oldProjectsName: oldProjectName,
            }),
        };
        fetch("/api/Project/editproject", requestOptions)
            .then((response) => response.json())
            .then((data) => {

            })
    }

    const deleteproject = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Projectsname: project_name,
            }),
        };
        fetch("/api/Project/deleteproject", requestOptions)
            .then((response) => response.json())
            .then((data) => {

            })
    }

    const DeveloperSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { developer: developer, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { developer: developer, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/usertickets", state: { developer: developer, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>
            </div>
        )
    }

    const AdminSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>

                <Link to={{ pathname: "/manageroles", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-user-tag"></i> </CDBSidebarMenuItem> Manage User Roles</Link>

                <Link to={{ pathname: "/userprojects", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>

                <Link to={{ pathname: "/manageprojects", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i> </CDBSidebarMenuItem> Manage Projects</Link>

                <Link to={{ pathname: "/usertickets", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>

                <Link to={{ pathname: "/managetickets", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>

            </div>
        )
    }

    const SubmitterSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { submitter: submitter, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { submitter: submitter, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects </Link>
                <Link to={{ pathname: "/managetickets", state: { submitter: submitter, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"><CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
            </div>
        )
    }

    const ManagerSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem>  Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/manageprojects", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects </Link>
                <Link to={{ pathname: "/usertickets", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
                <Link to={{ pathname: "/managetickets", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
            </div>
        )
    }


    // Create connection, call server-side method, print out notification

    var connection = new signalR.HubConnectionBuilder().withUrl("/notificationHub").build();

    connection.start();

    const Notifications = (notificationProps) => {
        useEffect(() => {
            notificationProps.HubConnection.on("assignusertoproject", notification => {
                setNotification(notification);
            })
            notificationProps.HubConnection.on("removeuserfromproject", notification => {
                setNotification(notification);
            })
        }, [])

        return (<p>  </p>);
    }

    const messageSubmit = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Message: message
            }),
        };
        fetch("api/Notification", requestOptions)
            .then((response) => response.json())
            .then((data) => {

            })

        setMessage("");
    }

    const increment = () => {
        notifCounter.current += 1;
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleToggle = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        subheader: {
            fontSize: 15,
        },
        pos: {
            marginBottom: 12,
        },
    });

    const classes = useStyles();

    return (
        <div>
            <Setroles/>
                <div class="d-flex" id="wrapper">
                    <div class="bg-custom-2 border-right" id="sidebar-wrapper">
                    <CDBSidebar textColor="#fff" backgroundColor="#333">
                        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                            <a
                                href="/"
                                className="text-decoration-none"
                                style={{ color: 'inherit' }}
                            >
                                <i class="fas fa-bug"></i> Bug Tracker
                            </a>
                        </CDBSidebarHeader>
                        <CDBSidebarContent className="sidebar-content">
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
                        </CDBSidebarContent>
                        <CDBSidebarFooter style={{ textAlign: 'center' }}>
                            <div className="sidebar-btn-wrapper"
                                style={{
                                    padding: '20px 5px',
                                }}
                            >
                                @2021 Made by Marco Pagan
                             </div>
                        </CDBSidebarFooter>
                    </CDBSidebar>
                    </div>
                <div id="page-content-wrapper" style={{ color: "#lightgray" }}>
                    <div class="container-fluid">
                        <div class="p-3 mb-2 bg-gradient-primary text-white">
                            <nav class="navbar navbar-expand-lg navbar-dark bg-custom-2">
                                <a class="navbar-brand" href="#">Logged in as: {location.state.admin} {location.state.developer} {location.state.submitter} {location.state.manager} {location.state.username} </a>


                                <div class="collapse navbar-collapse" id="navbarCollapse">
                                    <ul class="navbar-nav mr-auto">
                                        <li class="nav-item active">
                                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                                        </li>
                                    </ul>
                                    <form class="form-inline my-2 my-lg-0">
                                        <div class="collapse navbar-collapse" id="navbarSupportedContent-5">

                                            <ul class="navbar-nav ml-auto nav-flex-icons">
                                                <li class="nav-item avatar dropdown">
                                                    <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                        <span class="badge badge-danger ml-2"> </span>
                                                        <i class="fas fa-bell"></i>
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-lg-right dropdown-secondary" aria-labelledby="navbarDropdownMenuLink-5">
                                                        <a class="dropdown-item waves-effect waves-light"> {notification} <span class="badge badge-danger ml-2"> {(notification != null) ? (<div> {increment} {notifCounter.current + 1} </div>) : (<p> </p>)}</span></a>
                                                        <Link to={{
                                                            pathname: '/notifications',
                                                            state: {
                                                                userId: userId,
                                                                username: location.state.username,
                                                                admin: location.state.admin,
                                                                manager: location.state.manager,
                                                                developer: location.state.developer,
                                                                submitter: location.state.submitter,
                                                                role: location.state.role
                                                            }
                                                        }}> View All Notifications </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Demo
                                            </button>
                                            <img src={profilePicture} style={{ width: 50, height: 50 }} />
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                <Link to={{
                                                    pathname: '/profile',
                                                    state: {
                                                        username: location.state.username,
                                                        userId: location.state.userId,
                                                        admin: location.state.admin,
                                                        manager: location.state.manager,
                                                        developer: location.state.developer,
                                                        submitter: location.state.submitter,
                                                        role: location.state.role
                                                    }
                                                }}> <Button class="dropdown-item"> Profile </Button>
                                                </Link>
                                                <Link to={{
                                                    pathname: '/login',
                                                }}> <Button class="dropdown-item" onClick={() => logout()}> Logout </Button>
                                                </Link>

                                            </div>

                                        </div>

                                    </form>
                                </div>

                            </nav>
                        </div>
                        <br>
                        </br>
                        <h3 id="main"> Edit or Delete Project </h3>
                        <div id="select" class="wrapper">
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <CardHeader disableTypography={true} id="subheaders" title="Edit or Delete Project"
                                        style={{ align: "center", fontSize: "20px" }} id="subheadersmain" class="p-3 mb-2 bg-info text-white"> </CardHeader>
                                    <label style={{ marginRight: '10px' }}> Name: </label>
                                    <TextField variant="outlined" placeholder={location.state.project_name.current} onChange={(e) => setProjectName(e.target.value)}/>
                                    <br>
                                    </br>
                                    <label style={{ marginRight: '10px' }}> Description: </label>
                                    <TextField variant="outlined" placeholder={description} onChange={(e) => setDescription(e.target.value)}/>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <button class="btn btn-secondary" onClick={() => editproject()}> Save Changes </button>
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <button class="btn btn-secondary" onClick={() => deleteproject()}> Delete Project </button>
                            <Notifications HubConnection={connection} />
                            </CardContent>
                        </Card>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Edit;
