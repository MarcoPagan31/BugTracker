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
import FormLabel from '@material-ui/core/FormLabel';
import { Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IconContext } from 'react-icons';
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

const TicketDetails = () => {
    const [users, setUsers] = useState([]);
    const [ticket, setTicket] = useState({});
    const [title, setTitle] = useState();
    const [submitter, setSubmitter] = useState();
    const [developer, setDeveloper] = useState();
    const [status, setStatus] = useState();
    const [comment, setComment] = useState();
    const [file, setFile] = useState();
    const ticketstable = [];
    const commenttable = [];
    const historytable = [];
    const attachmentstable = [];
    const location = useLocation();
    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [username, setUsername] = useState();
    const [logs, setLogs] = useState([]);
    const formData = new FormData();
    const { SearchBar } = Search;
    const userId = useRef();
    const [profilePicture, setProfilePicture] = useState("");

    // SignalR Connection State

    const [name, setName] = useState();
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [notification, setNotification] = useState();
    const [hubConnection, setHubConnection] = useState(null);
    const notifCounter = useRef(0);

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
                <Link to={{ pathname: "/userprojects", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/manageprojects", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> Manage Projects </Link>
                <Link to={{ pathname: "/usertickets", state: { admin: admin, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
                <Link to={{ pathname: "/managetickets", state: { manager: manager, username: location.state.username, userId: location.state.userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>
            </div>
        )
    }

    const logout = () => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'multipart/form-data' },
            body: JSON.stringify({

            }),
        };
        fetch("api/IssueTracker/logout", requestOptions)
            .then((response) => response.text())
            .then((data) => {

            })
    }

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

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: location.state.title.current
            }),
        };
        fetch("/api/Ticket/details", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTicket(data);
            })
            .catch((error) => {
                console.log(error)
            });

        const requestOptions2 = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: location.state.title.current
            }),
        };
        fetch("/api/Ticket/getlogs", requestOptions2)
            .then((response) => response.json())
            .then((data) => {
                setLogs(data);
            })

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

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                comment: comment,
                tickettitle: ticket.title
            }),
        };
        fetch("/api/Ticket/addcomment", requestOptions)
            .then((response) => response.json())
            .then((data) => {

            })
    }

    const uploadFile = () => {
        formData.append("file", file);
        formData.append("title", ticket.title);

        const res = axios.post("/api/IssueTracker/fileupload", formData);
    }

    const renderTickets = (ticket, index) => {
        return (
            <tr key={index}>
                <td>{ticket.title}</td>
                <td>{ticket.submitter}</td>
                <td>{ticket.developer}</td>
                <td>{ticket.status}</td>
            </tr>
        )
    }

    const renderComments = (ticket, index) => {
        return (
            <tr key={index}>
                <td>{ticket.commenter.admin}</td>
                <td>{ticket.comment}</td>
            </tr>
        )
    }

    const renderAttachments = (attachment, index) => {
        return (
            <tr key={index}>
                <td>{attachment.fileName}</td>
            </tr>
        )
    }
    
    const columns = [
        { dataField: "propertyName", text: "Property Name" },
        { dataField: "oldValue", text: "Old Value" },
        { dataField: "newValue", text: "New Value" },
        { dataField: "dateChanged", text: "Created" },
    ]

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
            <Setroles />
            {
                ticketstable.push({
                    title: ticket.title, submitter: ticket.submitter, developer: ticket.developer, status: ticket.status
                })
            }
            {
                commenttable.push({
                    commenter: location.state, comment: ticket.comment
                })
            }
            {
                attachmentstable.push({
                    fileName: ticket.filePath
                })
            }
            {
                logs.forEach(function (element) {
                    historytable.push({ propertyname: element.propertyName, oldvalue: element.oldValue, newvalue: element.newValue, created: element.dateChanged })
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
             <div id="page-content-wrapper">
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

                <h3 id="main"> Ticket Information </h3>
                <div id="select" class="wrapper">
                <Card className={classes.root} variant="outlined">
                <CardContent>
                    <div id="subheaders">
                        <CardHeader disableTypography={true} id="subheaders" title="Ticket Details"
                            style={{ align: "center", fontSize: "20px" }} class="p-3 mb-2 bg-info text-white"> All of the projects in your database </CardHeader>
                    </div>
                    <form>
                        <label> Ticket Title </label>
                        <br>
                        </br>
                        <FormLabel> {ticket.title} </FormLabel>
                        <br>
                        </br>
                        <FormLabel> <b> Submitter </b> </FormLabel>
                        <br>
                        </br>
                        <FormLabel> {ticket.submitter} </FormLabel>
                        <br>
                        </br>
                        <FormLabel> <b> Assigned Developer </b> </FormLabel>
                        <br>
                        </br>
                        <FormLabel> {ticket.developer} </FormLabel>
                        <br>
                        </br>
                        <FormLabel> <b> Ticket Priority </b> </FormLabel>
                        <br>
                        </br>
                        <FormLabel> {ticket.priority} </FormLabel>
                        <br>
                        </br>
                        <FormLabel> <b> Ticket Type </b> </FormLabel>
                        <br>
                        </br>
                        <FormLabel> {ticket.type} </FormLabel>
                        <br>
                        </br>
                        <FormLabel> <b> Ticket Status </b> </FormLabel>
                        <br>
                        </br>
                        <FormLabel> {ticket.status} </FormLabel>
                        <br>
                        </br>
                    </form>
                </CardContent>
            </Card>
            <br>
            </br>
             <Card className={classes.root} variant="outlined">
                <CardContent>
                    <div id="subheaders">
                        <CardHeader disableTypography={true} id="subheaders" title="Attachments"
                            style={{ align: "center", fontSize: "20px" }} class="p-3 mb-2 bg-info text-white"> All of the projects in your database </CardHeader>
                    </div>
                    <ReactBootStrap.Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>File Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attachmentstable.map(renderAttachments)}
                        </tbody>
                    </ReactBootStrap.Table>
                    <br>
                    </br>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" />
                    <button class="btn btn-secondary" onClick={() => uploadFile()}> Upload File </button>
                </CardContent>
            </Card>
                <br>
                </br>
                <br>
                </br>
                <br>
                </br>
                  
            </div>
             <div id="tickethistorywrapper">
              <Card className={classes.root} variant="outlined">
                <CardContent>
                    <div id="subheaders">
                        <CardHeader disableTypography={true} id="subheaders" title="Ticket History"
                            style={{ align: "center", fontSize: "20px" }} class="p-3 mb-2 bg-info text-white"> All of the projects in your database </CardHeader>
                    </div> 
               <ToolkitProvider 
                    keyField="propertyName"
                    data={ logs }
                    columns= { columns }
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
                <br>
                </br>
                <br>
                </br>

            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <div id="subheaders">
                        <CardHeader disableTypography={true} id="subheaders" title="Comments"
                            style={{ align: "center", fontSize: "20px" }} class="p-3 mb-2 bg-info text-white"> All of the projects in your database </CardHeader>
                    </div> 
                <ReactBootStrap.Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Commenter</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commenttable.map(renderComments)}
                    </tbody>
                </ReactBootStrap.Table >
                <TextField onChange={(e) => setComment(e.target.value)}> </TextField>
                <br>
                </br>
                <button class="btn btn-secondary" onClick={() => post()}> Add Comment </button>
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

export default TicketDetails;