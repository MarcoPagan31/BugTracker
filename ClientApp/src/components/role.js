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
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
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

const Role = () => {
    const location = useLocation();
    const [role, setRole] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [selectedRole, setSelectedRole] = useState();
    const [selectedLabel, setSelectedLabel] = useState();
    const [selectedLabel2, setSelectedLabel2] = useState();
    const [users, setUsers] = useState([]);
    const userlist = [];
    const userstable = [];
    const roles = ["admin", "developer", "manager", "submitter"];
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [developer, setDeveloper] = useState();
    const [submitter, setSubmitter] = useState();
    const [search, setSearch] = useState();
    const [username, setUsername] = useState();
    const { SearchBar } = Search;
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
            </div>
        )
    }

    const handleChangeUser = obj => {
        setSelectedUser(obj.value);
        setSelectedLabel(obj);
    }

    const handleChangeRole = obj => {
        setSelectedRole(obj.value);
        setSelectedLabel2(obj);
    }

    const roleOptions = [
        { value: "admin", label: "Admin" },
        { value: "submitter", label: "Submitter" },
        { value: "developer", label: "Developer" },
        { value: "manager", label: "Manager" },
    ]

    useEffect(() => {
        fetch("/api/IssueTracker/getallusers")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setUsername(location.state.username);
            })

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

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                applicationUserusername: selectedUser,
                role: selectedRole,
            }),
        };
        fetch("/api/Role/addrole", requestOptions)
            .then((response) => response.text())
            .then((data) => {
                
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const SearchForRows = (user, index) => {
        user.filter((u) => (
            u.applicationUserusername.match(search) ? (
                <tr key={index}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                </tr>
            ) : (
                <h3>User Not Found</h3>
            ) 
        ))
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
                <Link to={{ pathname: "/dashboard", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard </Link>
                <Link to={{ pathname: "/userprojects", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/manageprojects", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> Manage Projects </Link>
                <Link to={{ pathname: "/usertickets", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
                <Link to={{ pathname: "/managetickets", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>
            </div>
        )
    }

    function profileImageFormatter(cell, row) {
        return (<img src={cell} style={{ width: 50, height: 50 }} />)
    }

    const columns = [
        { dataField: "filePath", text: "Profile Picture", formatter: profileImageFormatter },
        { dataField: "applicationUserusername", text: "Username" },
        { dataField: "email", text: "Email" },
        { dataField: "role", text: "Role" },
    ]

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

    const SelectRoleCard = () => {
        const classes = useStyles();

        return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <CardHeader disableTypography={true} title="Select a User"
                        style={{ align: "center", fontSize: "20px" }} id="subheadersmain" class="p-3 mb-2 bg-info text-white"> </CardHeader>
                    <br>
                    </br>
                    <Select name="user"
                        value={selectedLabel}
                        options={userlist}
                        onChange={handleChangeUser}
                        isOptionDisabled={option => option.isDisabled}
                    />
                    <br>
                    </br>
                    <br>
                    </br>
                </CardContent>
            </Card>
        )
    }

    const AssignRoleCard = () => {
        const classes = useStyles();

        return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <CardHeader disableTypography={true} title="Assign a Role"
                        style={{ align: "center", fontSize: "20px" }} id="subheadersmain" class="p-3 mb-2 bg-info text-white"> </CardHeader>
                    <br>
                    </br>
                    <Select name="role"
                        value={selectedLabel2}
                        options={roleOptions}
                        onChange={handleChangeRole}
                        isOptionDisabled={option => option.isDisabled}
                    />
                    <br>
                    </br>
                    <br>
                    </br>
                    <button class="btn btn-secondary" onClick={() => post()}> Assign Role </button>
                </CardContent>
            </Card>
        )
    }

    const UserListCard = () => {
        const classes = useStyles();

        return (
            <div class="wrapper">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <div id="subheaders">
                            <CardHeader disableTypography={true} id="subheaders" title="Your Personnel"
                                style={{ align: "center", fontSize: "25px" }} class="p-3 mb-2 bg-info text-white"> </CardHeader>
                            <p className={classes.subheader}> &nbsp; &nbsp; &nbsp; All the users in your database </p>
                        </div>

                                <ToolkitProvider
                                    keyField="ApplicationUserusername"
                                    data={users}
                                    columns={columns}
                                    pagination={paginationFactory()}
                                    search
                                >
                                    {
                                        props => (
                                            <div>
                                                <SearchBar {...props.searchProps} />
                                                <hr />
                                                <BootstrapTable striped bordered hover
                                                    {...props.baseProps}
                                                    pagination={paginationFactory()}
                                                />
                                            </div>
                                        )
                                    }
                                </ToolkitProvider> 
                        </CardContent>
                </Card>
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

    return (
        <div>
            <Setroles />

            {users.forEach(function (element) {
                userlist.push({ label: element.applicationUserusername, value: element.applicationUserusername }) 
            })}
            
            {users.forEach(function (element) {
                userstable.push({ profilePicture: element.filePath, username: element.applicationUserusername, email: element.email, role: element.role })
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
                                                        username: username,
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
                    <h3 id="main"> Manage User Roles </h3>

                    
                    <div id="select" class="wrapper">
                       
                       <SelectRoleCard/>
                        <br>
                        </br>
                       <AssignRoleCard/>
                       
                    </div>

                    <UserListCard/>
                    <Notifications HubConnection={connection} />
                </div>
                </div>
            </div>
        </div>
    );
}

export default Role;
