import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { FixedSizeList as List } from 'react-window';
import css from './style.css';
import Select from 'react-select';
import { useLocation } from "react-router";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './sidebar.css';
import { IconContext } from 'react-icons';
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import * as signalR from '@microsoft/signalr';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const Profile = () => {
    const [role, setRole] = useState([]);
    const location = useLocation();
    const [project_name, setProjectName] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const [selectedValue2, setSelectedValue2] = useState();
    const userslist = [];
    const projectuserslist = [];
    const [selectedLabel, setSelectedLabel] = useState();
    const [selectedLabel2, setSelectedLabel2] = useState();
    const [user, setUser] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const userstable = [];
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [developer, setDeveloper] = useState();
    const [submitter, setSubmitter] = useState();
    const [username, setUsername] = useState();
    const [file, setFile] = useState();
    const formData = new FormData();
    const userId = useRef();
    const [profilePicture, setProfilePicture] = useState("");

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

    const renderAttachments = (attachment, index) => {
        return (
            <tr key={index}>
                <td>{attachment.fileName}</td>
            </tr>
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
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: location.state.username
            }),
        };
        fetch("/api/IssueTracker/getuser", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            })

        const requestOptions2 = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: location.state.username
            }),
        };
        fetch("api/IssueTracker/retrieveprofileimage", requestOptions2)
            .then((response) => response.json())
            .then((data) => {
                setProfilePicture(data.filePath);
            })
    }, [])

    const uploadFile = () => {
        formData.append("image", file);
        formData.append("ApplicationUserusername", location.state.username);

        const res = axios.post("/api/IssueTracker/profileimageupload", formData);
    }

    const DeveloperSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { developer: location.state.developer, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { developer: location.state.developer, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/usertickets", state: { developer: location.state.developer, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>
            </div>
        )
    }

    const AdminSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { admin: location.state.admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>

                <Link to={{ pathname: "/manageroles", state: { admin: location.state.admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-user-tag"></i> </CDBSidebarMenuItem> Manage User Roles</Link>

                <Link to={{ pathname: "/userprojects", state: { admin: location.state.admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>

                <Link to={{ pathname: "/manageprojects", state: { admin: location.state.admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i> </CDBSidebarMenuItem> Manage Projects</Link>

                <Link to={{ pathname: "/usertickets", state: { admin: location.state.admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>

                <Link to={{ pathname: "/managetickets", state: { admin: location.state.admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>

            </div>
        )
    }

    const SubmitterSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { submitter: location.state.submitter, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { submitter: location.state.submitter, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects </Link>
                <Link to={{ pathname: "/managetickets", state: { submitter: location.state.submitter, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"><CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
            </div>
        )
    }

    const ManagerSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { manager: location.state.manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem>  Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { manager: location.state.manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/manageprojects", state: { manager: location.state.manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects </Link>
                <Link to={{ pathname: "/usertickets", state: { manager: location.state.manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
                <Link to={{ pathname: "/managetickets", state: { manager: location.state.manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
            </div>
        )
    }

    const DemoProfile = () => {
        return (
            <div id="select" class="wrapper">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <CardHeader disableTypography={true} title="Profile"
                            style={{ align: "center", fontSize: "20px" }} id="subheadersmain" class="p-3 mb-2 bg-info text-white"> </CardHeader>
              
                    <br>
                    </br>
                    <label id="labels" style={{ marginRight: '10px' }}> Username: </label>
                    <h6>
                    {
                        (location.state.developer != null) ? (
                            location.state.developer + "User"
                    ) : (
                            <h3></h3>
                        )}
                    {
                        (location.state.admin != null) ? (
                            location.state.admin + "User"
                    ) : (
                            <h3></h3>
                        )}
                    {
                        (location.state.submitter != null) ? (
                            location.state.submitter + "User"
                    ) : (
                            <h3></h3>
                        )}
                    {
                        (location.state.manager != null) ? (
                            location.state.manager + "User"
                    ) : (
                            <h3></h3>
                        )} 
                    </h6>
                    <br>
                    </br>
                    <br>
                    </br>
                    <label id="labels" style={{ marginRight: '10px' }}> Email: </label>
                    <h6>
                        {
                            (location.state.developer != null) ? (
                                location.state.developer + "User" + "@gmail.com"
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.admin != null) ? (
                                location.state.admin + "User" + "@gmail.com"
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.submitter != null) ? (
                                location.state.submitter + "User" + "@gmail.com"
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.manager != null) ? (
                                location.state.manager + "User" + "@gmail.com"
                            ) : (
                                    <h3></h3>
                                )}  
                    </h6>
                    <br>
                    </br>
                    <br>
                    </br>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" />
                    <input type="button" value="Upload File" onClick={() => uploadFile()} />
                    </CardContent>
                </Card>
            </div>
        )
    }

    const UserProfile = () => {
        return (
            <div id="select" class="wrapper">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <CardHeader disableTypography={true} title="Profile"
                            style={{ align: "center", fontSize: "20px" }} id="subheadersmain" class="p-3 mb-2 bg-info text-white"> </CardHeader>

                <br>
                </br>
                <label id="labels" style={{ marginRight: '10px' }}> Username: </label>
                <h6> {user.applicationUserusername} </h6>
                <br>
                </br>
                <label id="labels" style={{ marginRight: '10px' }}> Email: </label>
                <h6> {user.email} </h6>
                <br>
                </br>
                <label id="labels" style={{ marginRight: '10px' }}> Role: </label>
                <h6> {user.role} </h6>
                <br>
                </br>
                <label id="labels" style={{ marginRight: '10px' }}> Password: </label>
                <h6> {user.password} </h6>
                <br>
                </br>
                <input onChange={(e) => setFile(e.target.files[0])} type="file" />
                <input type="button" value="Upload File" onClick={() => uploadFile()} />
                <br>
                </br>
                <Link to={{
                    pathname: '/editprofile',
                    state: {
                        username: location.state.username,
                        userId: location.state.userId,
                        admin: location.state.admin,
                        manager: location.state.manager,
                        developer: location.state.developer,
                        submitter: location.state.submitter
                    }
                }}> <Button> Edit Profile </Button>
                </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const increment = () => {
        notifCounter.current += 1;
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleToggle = () => {
        setSidebarOpen(!sidebarOpen)
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

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            height: 535
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
                        <CDBSidebarFooter style={{ textAlign: 'center' }}>
                            <div
                                className="sidebar-btn-wrapper"
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
                                <a id="sh" class="navbar-brand" href="#">Logged in as: {location.state.admin} {location.state.developer} {location.state.submitter} {location.state.manager} {location.state.username} </a>

                                <div class="collapse navbar-collapse" id="navbarCollapse">
                                    <ul class="navbar-nav mr-auto">
                                        <li class="nav-item active">
                                            <a id="sh" href="/dashboard"> Home <span class="sr-only">(current)</span></a>
                                        </li>
                                    </ul>
                                    <form class="form-inline my-2 my-lg-0">
                                        <a class="navbar-brand" href="#"> </a>

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
                                                        userId: userId,
                                                        username: location.state.username,
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
                                <Notifications HubConnection={connection} />
                            </nav>
                        </div>
                </div>
                 {location.state.username == null ? <DemoProfile /> : <UserProfile />}
            </div>
        </div>
        </div>
    )
}

export default Profile;
