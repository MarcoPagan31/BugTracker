import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { FixedSizeList as List } from 'react-window';
import css from './style.css';
import Select from 'react-select';
import { useLocation } from "react-router";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from 'react-router-dom';
import scss from './custom.scss';
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
import { NavLink } from 'react-router-dom';
import css2 from './notifications.css';
import * as signalR from '@microsoft/signalr';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const Manageusers = () => {
    const [role, setRole] = useState([]);
    const location = useLocation();
    const project_name = useRef();
    const [selectedValue, setSelectedValue] = useState();
    const [selectedValue2, setSelectedValue2] = useState();
    const userslist = [];
    const projectuserslist = [];
    const [selectedLabel, setSelectedLabel] = useState();
    const [selectedLabel2, setSelectedLabel2] = useState();
    const [users, setUsers] = useState([]);
    const userId = useRef();
    const [projectUsers, setProjectUsers] = useState([]);
    const userstable = [];
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [developer, setDeveloper] = useState();
    const [submitter, setSubmitter] = useState();
    const [username, setUsername] = useState();
    const [profilePicture, setProfilePicture] = useState("");
    const notifCounter = useRef(0);

    // SignalR Connection State

    const [name, setName] = useState();
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [notification, setNotification] = useState();
    const [hubConnection, setHubConnection] = useState(null);

    const Setroles = () => {
        return (
            <div>
                {setAdmin("Admin")}
                {setManager("Manager")}
                {setDeveloper("Developer")}
                {setSubmitter("Submitter")}
                {setUsername(location.state.username)}
                {console.log(location.state)}
            </div>
        )
    }

    const handleChange2 = obj => {
        setSelectedValue2(obj.value);
        setSelectedLabel2(obj);
        //setProjectName(location.state.project_name);

        project_name.current = location.state.project_name;
    }

    const handleChange = obj => {
        setSelectedValue(obj.value);
        setSelectedLabel(obj);
        //setProjectName(location.state.project_name);

        project_name.current = location.state.project_name;
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
        fetch("/api/IssueTracker/getallusers")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                console.log(location.state)
            })
    }, [])

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: selectedValue,
            }),
        };
        fetch("/api/IssueTracker/getuser", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                userId.current = data.id;
            })
    }, [selectedValue])

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: selectedValue2,
            }),
        };
        fetch("/api/IssueTracker/getuser", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                userId.current = data.id;
            })
    }, [selectedValue2])

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: selectedValue,
                ApplicationUserId: userId.current,
                Projectsname: location.state.project_name.current,
                Id: location.state.project_id.current,
            }),
        };
        fetch("/api/IssueTracker/addusertoproject", requestOptions)
            .then((response) => response.text())
            .then((data) => {

            })
            .catch((error) => {
                console.log(error)
            });
    }

    const removeUser = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: selectedValue2,
                ApplicationUserId: userId.current,
                Projectsname: location.state.project_name.current,
                Id: location.state.project_id.current
            }),
        };
        fetch("/api/IssueTracker/removeuserfromproject", requestOptions)
            .then((response) => response.text())
            .then((data) => {

            })
            .catch((error) => {
                console.log(error)
            });
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

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: location.state.username
            }),
        };
        fetch("api/IssueTracker/getuser", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                userId.current = data.id;
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

    const renderUsers = (user, index) => {
        return (
            <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td> 
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
                <Link to={{ pathname: "/userprojects", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/manageprojects", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> Manage Projects </Link>
                <Link to={{ pathname: "/usertickets", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
                <Link to={{ pathname: "/managetickets", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>
            </div>
        )
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
            <Setroles />

            {users.forEach(function (element) {
                userslist.push({ label: element.applicationUserusername, value: element.applicationUserusername })
            })}

            {projectUsers.forEach(function (element) {
                projectuserslist.push({ label: element.applicationUserusername, value: element.applicationUserusername })
            })}

            {users.forEach(function (element) {
                userstable.push({ username: element.applicationUserusername, email: element.email, role: element.role })
            })}

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
            <h3 id="main"> Manage Project Users </h3>
             
            <div id="select" class="wrapper">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <div id="subheaders">
                            <CardHeader disableTypography={true} title="Assign a User"
                                style={{ align: "center", fontSize: "20px" }} class="p-3 mb-2 bg-info text-white"> </CardHeader>
                        </div> 
                        <Select name="user"
                            value={selectedLabel}
                            options={userslist}
                            onChange={handleChange}
                            isOptionDisabled={option => option.isDisabled}
                        />
                        <br>
                        </br>
                        <button class="btn btn-secondary" onClick={() => post()}> Assign User</button>
                    </CardContent>
                </Card>
                 <br>
                </br>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <div id="subheaders">
                            <CardHeader disableTypography={true} title="Remove a User"
                                style={{ align: "center", fontSize: "20px" }} class="p-3 mb-2 bg-info text-white"> </CardHeader>
                        </div> 
                        <Select name="user"
                            value={selectedLabel2}
                            options={userslist}
                            onChange={handleChange2}
                            isOptionDisabled={option => option.isDisabled}
                        />
                         <br>
                        </br>
                        <button class="btn btn-secondary" onClick={() => removeUser()}> Remove User</button>
                     </CardContent>
                </Card>
                </div>
                   
                <div class="wrapper">
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <div id="subheaders">
                                <CardHeader disableTypography={true} title="Your Personnel"
                                    style={{ align: "center", fontSize: "20px" }} class="p-3 mb-2 bg-info text-white"> </CardHeader>
                                    <p className={classes.subheader}> All the users in your database </p>
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
                            <Notifications HubConnection={connection} />
                        </CardContent>
                    </Card>
                </div>
                
            </div>
            </div>
            </div>
            </div>
    );
}

export default Manageusers;
