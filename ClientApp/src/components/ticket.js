import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { InputLabel } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import * as ReactBootStrap from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import css from './style.css';
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

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState();
    const [title, setTitle] = useState();
    const [submitter, setSubmitter] = useState();
    const [developer, setDeveloper] = useState();
    const [status, setStatus] = useState();
    const [priority, setPriority] = useState();
    const [type, setType] = useState();
    const ticketslist = [];
    const ticketstable = [];
    const location = useLocation();
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const [selectedLabel, setSelectedLabel] = useState();
    const [username, setUsername] = useState();
    const ticketRef = useRef();
    const priorityRef = useRef();
    const typeRef = useRef();
    const statusRef = useRef();
    const { SearchBar } = Search;
    const searchTicket = useRef("");
    const userId = useRef();
    const titleRef = useRef();
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
                {setUsername(location.state.username)}
                {console.log(location.state)}
            </div>
        )
    }

    const handleChange = obj => {
        setSelectedValue(obj.value);
        setSelectedLabel(obj);
    }

    useEffect(() => {
        fetch("/api/Ticket")
            .then((response) => response.json())
            .then((data) => {
                setTickets(data);
            })
            .catch((error) => {
                console.log(error)
            });

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
                setTicket(data);
                titleRef.current = data.title;
                ticketRef.current = data.id;
                priorityRef.current = data.priority;
                typeRef.current = data.type;
                statusRef.current = data.status;
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
                type: type,
                status: status,             
            }),
        };
        fetch("/api/Ticket", requestOptions)
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

    const columns = [
        { dataField: "title", text: "Title" },
        { dataField: "submitter", text: "Submitter" },
        { dataField: "developer", text: "Developer" },
        { dataField: "priority", text: "Priority" },
        { dataField: "type", text: "Type" },
        { dataField: "status", text: "Status" },
        {
            dataField: "link", text: "Manage", formatter: (cell, row) =>
                <div>
                    <div>
                        <li> <Link to={{
                            pathname: '/assignusers',
                            state: {
                                TicketsId: ticketRef,
                                title: selectedValue,
                                admin: location.state.admin,
                                developer: location.state.developer,
                                submitter: location.state.submitter,
                                manager: location.state.manager,
                                username: location.state.username,
                                userId: location.state.userId
                            }
                        }}>Manage Users
                    </Link>
                        </li>
                    </div>
                    <div>
                        <li> <Link to={{
                            pathname: '/ticketdetails',
                            state: {
                                title: titleRef,
                                admin: location.state.admin,
                                developer: location.state.developer,
                                submitter: location.state.submitter,
                                manager: location.state.manager,
                                username: location.state.username,
                                userId: location.state.userId
                            }
                        }}>Details
                    </Link> </li>
                    </div>
                    <div>
                        <li>
                            <Link to={{
                                pathname: '/editticket',
                                state: {
                                    admin: location.state.admin,
                                    username: location.state.username,
                                    userId: location.state.userId,
                                    developer: location.state.developer,
                                    submitter: location.state.submitter,
                                    manager: location.state.manager,
                                    title: titleRef,
                                    priority: priorityRef,
                                    type: typeRef,
                                    status: statusRef
                                }
                            }}>Edit
                    </Link>
                        </li>
                    </div>
                </div>
        }   
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

    const Ticketstablecard = () => {
        const classes = useStyles();

        return (
            <div class="wrapper">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <div id="subheaders">
                            <CardHeader disableTypography={true} title="Tickets"
                                style={{ align: "center", fontSize: "20px" }} id="subheaders" class="p-3 mb-2 bg-info text-white"> </CardHeader>
                            <p className={classes.subheader}> All of the tickets in your database </p>
                        </div>
                        <Select
                            value={selectedLabel}
                            options={ticketslist}
                            onChange={handleChange}
                            isOptionDisabled={option => option.isDisabled}
                        />
                        <br>
                        </br>
                        <div style={{ minWidth: "300px" }}>
                            <ToolkitProvider
                                keyField="title"
                                data={tickets}
                                columns={columns}
                                pagination={paginationFactory()}
                                search={{
                                    defaultSearch: searchTicket.current
                                }}
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
                        </div>
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

    const classes = useStyles();

    return (
        <div>
            <Setroles/>
            {
                tickets.forEach(function (element) {
                    ticketstable.push({
                        title: element.title, submitter: element.submitter, developer: element.developer, priority: element.priority, type: element.type, status: element.status
                    })
                })
            }
            {
                tickets.forEach(function (element) {
                    ticketslist.push({
                        label: element.title, value: element.title
                    })
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
                                    <img src={profilePicture} style={{ width: 50, height: 50 }}/>
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
                 <h3 id="main"> Manage Tickets </h3>

                <div>
                    <div id="select" class="wrapper">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <CardHeader disableTypography={true} title="Create a New Ticket" style={{ align: "center", fontSize: "20px" }} id="subheadersmain" class="p-3 mb-2 bg-info text-white"> Create a New Ticket </CardHeader>
                                <br>
                                </br>
                                <div class="form-group form-inline">
                                    <label id="labels" style={{ marginRight: '10px' }}> Title: </label>
                                    <TextField size="small"  variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <label id="labels" style={{ marginRight: '10px' }}> Submitter: </label>
                                    <TextField size="small"  variant="outlined" onChange={(e) => setSubmitter(e.target.value)} />
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <label id="labels" style={{ marginRight: '10px' }}> Developer: </label>
                                    <TextField size="small"  variant="outlined" class="box" onChange={(e) => setDeveloper(e.target.value)} />
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <label id="labels" style={{ marginRight: '10px' }}> Priority: </label>
                                    <TextField size="small"  variant="outlined" onChange={(e) => setPriority(e.target.value)} />
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <label id="labels" style={{ marginRight: '10px' }}> Type: </label>
                                    <TextField size="small"  variant="outlined" onChange={(e) => setType(e.target.value)} />
                                    <br>
                                    </br>
                                    <br>
                                    </br>
                                    <label id="labels" style={{ marginRight: '10px' }}> Status: </label>
                                    <TextField size="small"  variant="outlined" onChange={(e) => setStatus(e.target.value)} />
                                    <br>
                                    </br>
                                </div>
                                <button class="btn btn-secondary" onClick={() => post()}> Create New Ticket </button>
                    </CardContent>
                </Card>
            </div>
                    <Ticketstablecard/>
                    <Notifications HubConnection={connection} />
                </div>
                
            </div>
           </div>
          </div>
        </div>
    );

}

export default Tickets;
