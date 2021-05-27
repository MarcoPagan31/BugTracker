import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
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
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import css2 from './notifications.css';
import * as signalR from '@microsoft/signalr';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const Details = () => {
    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [title, setTitle] = useState();
    const [submitter, setSubmitter] = useState();
    const [developer, setDeveloper] = useState();
    const [status, setStatus] = useState();
    const [priority, setPriority] = useState();
    const [type, setType] = useState();
    const userstable = [];
    const ticketstable = [];
    const ticketlist = [];
    const location = useLocation();
    const [selectedValue, setSelectedValue] = useState();
    const [selectedLabel, setSelectedLabel] = useState();
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [username, setUsername] = useState();
    const notifCounter = useRef(0);
    const titleRef = useRef();
    const [profilePicture, setProfilePicture] = useState();
    const userId = useRef();

    // SignalR Connection State

    const [name, setName] = useState();
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [notification, setNotification] = useState();
    const [hubConnection, setHubConnection] = useState(null);

    const handleChange = obj => {
        setSelectedValue(obj.value);
        setSelectedLabel(obj);
    }

    const Setroles = () => {
        return (
            <div>
                {setAdmin("Admin")}
                {setManager("Manager")}
                {setDeveloper("Developer")}
                {setSubmitter("Submitter")}
                {setUsername(location.state.username)}
            </div>
        )
    }

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Projectsname: location.state.project_name.current
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
                ProjectsId: location.state.project_id
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

        const requestOptions3 = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: location.state.username
            }),
        };
        fetch("api/IssueTracker/retrieveprofileimage", requestOptions3)
            .then((response) => response.json())
            .then((data) => {
                setProfilePicture(data.filePath);
            })
    }, [])

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: selectedValue,
            }),
        };
        fetch("/api/Ticket/details", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                titleRef.current = data.title;
            })
            .catch((error) => {
                console.log(error)
            });

    }, [selectedValue])

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                submitter: submitter,
                developer: developer,
                priority: priority,
                status: status,
                type: type,
                Projectsname: location.state.project_name.current
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
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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

    const renderTickets = (ticket, index) => {
        return (
            <tr key={index}>
                <td>{ticket.title}</td>
                <td>{ticket.submitter}</td>
                <td>{ticket.developer}</td>
                <td>{ticket.status}</td>
                <td>
                    <li>
                        <Link to={{
                            pathname: '/ticketdetails',
                            state: {
                                title: titleRef,
                                admin: location.state.admin,
                                developer: location.state.developer,
                                submitter: location.state.submitter,
                                manager: location.state.manager,
                                username: location.state.username
                            }
                        }}>Details
                        </Link>
                    </li>
                </td>
            </tr>
        )
    }

    const DeveloperSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { developer: developer, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { developer: developer, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/usertickets", state: { developer: developer, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>
            </div>
        )
    }

    const AdminSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { admin: admin, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>

                <Link to={{ pathname: "/manageroles", state: { admin: admin, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-user-tag"></i> </CDBSidebarMenuItem> Manage User Roles</Link>

                <Link to={{ pathname: "/userprojects", state: { admin: admin, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>

                <Link to={{ pathname: "/manageprojects", state: { admin: admin, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i> </CDBSidebarMenuItem> Manage Projects</Link>

                <Link to={{ pathname: "/usertickets", state: { admin: admin, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>

                <Link to={{ pathname: "/managetickets", state: { admin: admin, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>

            </div>
        )
    }

    const SubmitterSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { submitter: submitter, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { submitter: submitter, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects </Link>
                <Link to={{ pathname: "/managetickets", state: { submitter: submitter, username: username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"><CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
            </div>
        )
    }

    const ManagerSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard </Link>
                <Link to={{ pathname: "/userprojects", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/manageprojects", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> Manage Projects </Link>
                <Link to={{ pathname: "/usertickets", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
                <Link to={{ pathname: "/managetickets", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>
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
            {
                users.forEach(function (element) {
                    userstable.push({
                        username: element.applicationUserusername, email: element.email, role: element.role
                    })
                })
            }

            {
                tickets.forEach(function (element) {
                    ticketstable.push({
                        title: element.title, submitter: element.submitter, developer: element.developer, status: element.status
                    })
                })
            }
            {
                tickets.forEach(function (element) {
                    ticketlist.push({ label: element.title, value: element.title })
                })
            }

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

                            </nav>
                        </div>
                        <br>
                        </br>
            <h3 id="main"> Project Information </h3>
            <div id="select" class="wrapper">
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <CardHeader disableTypography={true} id="subheaders" title="Project Details"
                        style={{ align: "center", fontSize: "20px" }} id="subheadersmain" class="p-3 mb-2 bg-info text-white"> </CardHeader>
             <label style={{marginRight: '10px'}}> Name: </label>
            <h5> {location.state.project_name.current} </h5>
             <label style={{marginRight: '10px'}}> Description: </label>
            <h5> {location.state.description.current} </h5>

            <Select
                value={selectedLabel}
                options={ticketlist}
                onChange={handleChange}
                isOptionDisabled={option => option.isDisabled}
            />

            <form>
                <div class="form-group form-inline"> 
                        <label style={{marginRight: '10px'}}> Title: </label>
                        <br>
                        </br>
                        <TextField size="small"  variant="outlined" onChange={(e) => setTitle(e.target.value)}/> 
                        <br>
                        </br>
                        <label style={{marginRight: '10px'}}> Submitter: </label>
                        <TextField size="small"  variant="outlined" onChange={(e) => setSubmitter(e.target.value)}/>
                        <br>
                        </br>
                        <label style={{marginRight: '10px'}}> Developer: </label>
                        <TextField size="small"  variant="outlined" onChange={(e) => setDeveloper(e.target.value)}/>
                        <br>
                        </br>
                        <label style={{marginRight: '10px'}}> Priority: </label>
                        <TextField size="small"  variant="outlined" onChange={(e) => setPriority(e.target.value)}/>
                        <br>
                        </br>
                        <label> Ticket Type: </label>
                        <TextField size="small"  variant="outlined" onChange={(e) => setType(e.target.value)}/>
                        <br>
                        </br>
                        <label> Status: </label>
                        <TextField size="small"  variant="outlined" onChange={(e) => setStatus(e.target.value)}/>
                        <br>
                        </br>
                    </div>
                <button class="btn btn-secondary" onClick={() => post()}> Create New Ticket </button>
            </form>
            </CardContent>
            </Card>
            </div>
            <div class="wrapper">
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <div id="subheaders">
                        <CardHeader disableTypography={true} id="subheaders" title="Project Personnel"
                            style={{ align: "center", fontSize: "20px" }} class="p-3 mb-2 bg-info text-white"> All of the projects in your database </CardHeader>
                        <p className={classes.subheader}> All the users for the project </p>
                    </div>
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
                    </ReactBootStrap.Table>
                </CardContent>
            </Card>
            <br>
            </br>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <div id="subheaders">
                    <CardHeader disableTypography={true} id="subheaders" title="Project Tickets"
                        style={{ align: "center", fontSize: "20px" }} class="p-3 mb-2 bg-info text-white"> </CardHeader>
                    <p className={classes.subheader}> All the tickets for the project </p>
                </div>
                <ReactBootStrap.Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Submitter</th>
                            <th>Developer</th>
                            <th>Status</th>
                            <th>Management</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketstable.map(renderTickets)}
                    </tbody>
                </ReactBootStrap.Table>
             </CardContent>
            </Card>
            <Notifications HubConnection={connection} />
            </div>
            </div>
            </div>
        </div>
        </div>
     );
        
}

export default Details;
