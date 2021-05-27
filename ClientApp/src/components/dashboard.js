import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { FixedSizeList as List } from 'react-window';
import css from './style.css';
import { useLocation } from "react-router";
import * as ReactBootStrap from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import scss from './custom.scss';
import Profile from "./profile";
import css2 from './notifications.css';
import * as signalR from '@microsoft/signalr';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Select from 'react-select';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
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
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();
    const [projects, setProjects] = useState([]);
    const projectstable = [];
    const ticketstable = [];
    const userId = useRef();
    const [profilePicture, setProfilePicture] = useState();

    // SignalR Connection State

    const [name, setName] = useState();
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [notification, setNotification] = useState();
    const [hubConnection, setHubConnection] = useState(null);
    const notifCounter = useRef(0);

    // Role State

    const [admin, setAdmin] = useState();
    const [manager, setManager] = useState();
    const [developer, setDeveloper] = useState();
    const [submitter, setSubmitter] = useState();
    const [userRole, setUserRole] = useState();
    const [username, setUsername] = useState();

    // Ticket State

    const [tickets, setTickets] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartData2, setChartData2] = useState({});
    const noneTickets = useRef({ tickets: 0 });
    const lowTickets = useRef({ tickets: 0 });
    const mediumTickets = useRef({ tickets: 0 });
    const highTickets = useRef({ tickets: 0 });
    const newTickets = useRef({ tickets: 0 });
    const urgentTickets = useRef({ tickets: 0 });
    const inProgressTickets = useRef({ tickets: 0 });
    const resolvedTickets = useRef({ tickets: 0 });
    const [notifyChange, setNotifyChange] = React.useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [selectedLabel, setSelectedLabel] = useState();
    const { SearchBar } = Search;
    const searchTicket = useRef("");
    const ticketslist = [];

    const handleChange = obj => {
        setSelectedValue(obj.value);
        setSelectedLabel(obj);
    }

    // Fetch all tickets

    const getTickets = () => {
        fetch("/api/Ticket")
            .then((response) => response.json())
            .then((data) => {
                setTickets(data) 
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const mapTickets = () => {
        tickets.forEach((ticket) => {
            switch (ticket.priority) {
                case "None":
                    noneTickets.current.tickets += 1;
                    break;
                case "Low":
                    lowTickets.current.tickets += 1;
                    break;
                case "Medium":
                    mediumTickets.current.tickets += 1;
                    break;
                case "High":
                    highTickets.current.tickets += 1;
                    break;
            }
        });
        setNotifyChange(!notifyChange);
    };

    const mapTickets2 = () => {
        tickets.forEach((ticket) => {
            switch (ticket.status) {
                case "New":
                    newTickets.current.tickets += 1;
                    break;
                case "In Progress":
                    inProgressTickets.current.tickets += 1;
                    break;
                case "Urgent":
                    urgentTickets.current.tickets += 1;
                    break;
                case "Resolved":
                    resolvedTickets.current.tickets += 1;
                    break; 
            }
        });
        setNotifyChange(!notifyChange);
    };

    const Setroles = () => {
        return (
            <div>
                {setAdmin("admin")}
                {setManager("manager")}
                {setDeveloper("developer")}
                {setSubmitter("submitter")}
                {setUserRole(location.state.role)}
                {setUsername(location.state.username)}
            </div>
        )
    }

    const data = () => {
        setChartData({
            labels: ['None', 'Low', 'Medium', 'High'],
            datasets: [
                {
                    label: 'ticket priority',
                    data: [noneTickets.current.tickets, lowTickets.current.tickets, mediumTickets.current.tickets, highTickets.current.tickets],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

    const data2 = () => {
        setChartData2({
            labels: ['New', 'In Progress', 'Urgent', 'Resolved'],
            datasets: [
                {
                    label: 'ticket status',
                    data: [newTickets.current.tickets, inProgressTickets.current.tickets, urgentTickets.current.tickets, resolvedTickets.current.tickets],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

    useEffect(() => {
        mapTickets();
        mapTickets2();
        data();
        data2();
    }, [tickets])

    
    useEffect(() => {
        getTickets();
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

    const renderProjects = (project, index) => {
        return (
            <tr key={index}>
                <td>{project.projectsname}</td>
                <td>{project.description}</td>
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
        pos: {
            marginBottom: 12,
        },
    });

    const AdminCard = () => {
        const classes = useStyles();
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <h2>
                        Admin
                    </h2>
                    <h5>
                        Admins have control over all operations in the bug tracker. 
                    </h5>
                    <p>
                        {bull} Create, edit, delete, projects and tickets.
                    <br />
                        {bull} Manage users and their roles.
                    <br />
                        {bull} Assign users to projects and tickets. 
                    </p>
                </CardContent>
            </Card>
        );
    }

    const SubmitterCard = () => {
        const classes = useStyles();
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <h2>
                        Submitter
                    </h2>
                    <h5>
                        Submitters can perform limited operations on the projects and tickets in the bugtracker.
                    </h5>
                    <p>
                        {bull} View all projects and tickets in the bug tracker.
                    <br />
                        {bull} View only the projects and tickets they are assigned to by an admin or a project manager.
                    <br />
                        {bull} Ability to manage tickets. 
                    </p>
                </CardContent>
            </Card>
        );
    }

    const DeveloperCard = () => {
        const classes = useStyles();
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <h2>
                        Developer
                    </h2>
                    <h5>
                        Developers can perform limited operations on the projects and tickets in the bugtracker.
                    </h5>
                    <p>
                        {bull} View all projects and tickets in the bug tracker.
                    <br />
                        {bull} View only the projects and tickets they are assigned to by an admin or a project manager.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const ManagerCard = () => {
        const classes = useStyles();
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <h2>
                        Project Manager
                    </h2>
                    <h5>
                        Project managers have control over the majority of the operations in the bugtracker.
                    </h5>
                    <p>
                        {bull} Create, edit, delete, projects and tickets.
                    <br />
                        {bull} Assign users to projects and tickets.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000
    }

    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
    }

    // Columns for ticket tables in popups

    const columns = [
        { dataField: "title", text: "Title" },
        { dataField: "submitter", text: "Submitter" },
        { dataField: "developer", text: "Developer" },
        { dataField: "priority", text: "Priority" },
        { dataField: "type", text: "Type" },
        { dataField: "status", text: "Status" },    
    ]

    const Modal = ({ open, children, onClose }) => {
        if (!open) return null

        return (
            <div>
                <div style={OVERLAY_STYLES} />
                <div style={MODAL_STYLES}>
                    
                        <div id="subheaders" class="p-3 mb-2 bg-info text-white">
                            <h3> Tickets </h3>
                            All of the tickets in your database
                        </div>
                        
                        <Select
                            value={selectedLabel}
                            options={ticketslist}
                            onChange={handleChange}
                            isOptionDisabled={option => option.isDisabled}
                        />
                        <ToolkitProvider
                            keyField="title"
                            data={tickets}
                            columns={columns}
                            pagination={paginationFactory()}
                            search={{
                                defaultSearch: children
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
                    
                    <button class="btn btn-secondary" onClick={onClose}>Close Modal</button> 

                </div>
            </div>
        )
    }


    // Project Popups

    const ProjectAdmin = () => {
        return (
            <div style={BUTTON_WRAPPER_STYLES}>
                <Button>
                    <Link id="sh" to={{ pathname: "/manageprojects", state: { admin: admin, username: username, userId: userId, profilePicture: profilePicture }}}>  More Info</Link>
                </Button>
            </div>
        )
    }

    const ProjectDeveloper = () => {
        return (
            <div style={BUTTON_WRAPPER_STYLES}>
                <Button>
                    <Link id="sh" to={{ pathname: "/manageprojects", state: { developer: developer, username: username, userId: userId, profilePicture: profilePicture } }}> More Info </Link>
                </Button>
            </div>
        )
    }

    const ProjectManager = () => {
        return (
            <div style={BUTTON_WRAPPER_STYLES}>
                <Button>
                    <Link id="sh" to={{ pathname: "/manageprojects", state: { manager: manager, username: username, userId: userId, profilePicture: profilePicture } }}> More Info </Link>
                </Button>
            </div>
        )
    }

    const ProjectSubmitter = () => {
        return (
            <div style={BUTTON_WRAPPER_STYLES}>
                <Button>
                    <Link id="sh" to={{ pathname: "/manageprojects", state: { submitter: submitter, username: username, userId: userId, profilePicture: profilePicture } }}> More Info </Link>
                </Button>
            </div>
        )
    }

    const OpenModal = (props) => {
        setIsOpen(true);
        searchTicket.current = props;
    }

    // Ticket Popups

    const TicketAdmin = (props) => {
        return (
            <div style={BUTTON_WRAPPER_STYLES}>
                <Button id="sh" onClick={() => OpenModal(props.search)}>More Info</Button>
            </div>
        )
    }

    const TicketDeveloper = (props) => {
        return (
            <div style={BUTTON_WRAPPER_STYLES}>
                <Button id="sh" onClick={() => OpenModal(props.search)}>More Info</Button>
            </div>
        )
    }

    const TicketManager = (props) => {
        return (
            <div style={BUTTON_WRAPPER_STYLES}>
                <Button id="sh" onClick={() => OpenModal(props.search)}>More Info</Button>
            </div>
        )
    }

    const TicketSubmitter = (props) => {
        return (
            <div style={BUTTON_WRAPPER_STYLES}>
                <Button id="sh" onClick={() => OpenModal(props.search)}>More Info</Button>
            </div>
        )
    }

    const BUTTON_WRAPPER_STYLES = {
        position: 'relative',
        zIndex: 1
    }

    const OTHER_CONTENT_STYLES = {
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'red',
        padding: '10px'
    }


    const NewTicketsCard = () => {
        const classes = useStyles();
        return (
            <Card id="card" style={{ width: '12rem',  height: '8rem'}} class="p-3 mb-2 bg-info text-white" className={classes.root} variant="outlined">
                <CardContent>
                    <div style={divStyle}>
                         New Tickets
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <i width="30" length="30" class="fas fa-ticket-alt"></i>
                    </div>
                    <h5>
                        {newTickets.current.tickets}
                    </h5>
                    <p>
                        {

                            (location.state.developer != null) || (developer == location.state.role) ? (
                                <TicketDeveloper />
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.admin != null) || (admin == location.state.role) ? (
                                <TicketAdmin search="New">
                                </TicketAdmin>
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.manager != null) || (manager == location.state.role) ? (
                                <TicketManager />
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.submitter != null) || (submitter == location.state.role) ? (
                                <TicketSubmitter />
                            ) : (
                                    <h3></h3>
                                )}
                    </p>
                </CardContent>
            </Card>
        );
    }

    const ProjectsCard = () => {
        const classes = useStyles();
        return (
            <Card id="card" style={{ width: '12rem', height: '8rem' }} class="p-3 mb-2 bg-warning text-white" className={classes.root} variant="outlined">
                <CardContent>
                    <div style={divStyle}>
                        Projects
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <i width="30" length="30" class="fas fa-project-diagram"></i>
                    </div>
                    <h5>
                        {newTickets.current.tickets}
                    </h5>
                    <p>{

                        (location.state.developer != null) || (developer == location.state.role) ? (
                            <ProjectDeveloper />
                        ) : (
                                <h3></h3>
                            )}
                        {
                            (location.state.admin != null) || (admin == location.state.role) ? (
                                <ProjectAdmin />
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.manager != null) || (manager == location.state.role) ? (
                                <ProjectManager />
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.submitter != null) || (submitter == location.state.role) ? (
                                <ProjectSubmitter />
                            ) : (
                                    <h3></h3>
                                )}
                    </p>
                </CardContent>
            </Card>
        );
    }

    const TicketsInProgressCard = () => {
        const classes = useStyles();
        return (
            <Card id="card" style={{ width: '12rem', height: '8rem' }} class="p-3 mb-2 bg-dark text-white" className={classes.root} variant="outlined">
                <CardContent>
                    <div style={divStyle}>
                        Pending Tickets
                        <div>&nbsp;</div>
                        <i width="30" length="30" class="fas fa-ticket-alt"></i>
                    </div>
                    <h5>
                        {inProgressTickets.current.tickets}
                    </h5>
                    <p>
                        {

                            (location.state.developer != null) || (developer == location.state.role) ? (
                                <TicketDeveloper search="InProgress"/>
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.admin != null) || (admin == location.state.role) ? (
                                <TicketAdmin search="InProgress"/>
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.manager != null) || (manager == location.state.role) ? (
                                <TicketManager search="InProgress"/>
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.submitter != null) || (submitter == location.state.role) ? (
                                <TicketSubmitter search="InProgress"/>
                            ) : (
                                    <h3></h3>
                                )}
                    </p>
                </CardContent>
            </Card>
        );
    }

    const UrgentTicketsCard = () => {
        const classes = useStyles();
        return (
            <Card id="card" style={{ width: '12rem', height: '8rem' }} class="p-3 mb-2 bg-secondary text-white" className={classes.root} variant="outlined">
                <CardContent>
                    <div style={divStyle}>
                        Urgent Tickets
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <i width="30" length="30" class="fas fa-ticket-alt"></i>
                    </div>
                    <h5>
                        {highTickets.current.tickets}
                    </h5>
                    <p>
                        {

                            (location.state.developer != null) || (developer == location.state.role) ? (
                                <TicketDeveloper />
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.admin != null) || (admin == location.state.role) ? (
                                <TicketAdmin search="High"/>
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.manager != null) || (manager == location.state.role) ? (
                                <TicketManager />
                            ) : (
                                    <h3></h3>
                                )}
                        {
                            (location.state.submitter != null) || (submitter == location.state.role) ? (
                                <TicketSubmitter />
                            ) : (
                                    <h3></h3>
                                )}
                    </p>
                </CardContent>
            </Card>
        );
    }


    const DeveloperSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { developer: developer, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { developer: developer, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/usertickets", state: { developer: developer, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
            </div>
        )
    }

    const AdminSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { admin: admin, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>

                <Link to={{ pathname: "/manageroles", state: { admin: admin, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-user-tag"></i> </CDBSidebarMenuItem> Manage User Roles</Link>

                <Link to={{ pathname: "/userprojects", state: { admin: admin, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>

                <Link to={{ pathname: "/manageprojects", state: { admin: admin, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i> </CDBSidebarMenuItem> Manage Projects</Link>

                <Link to={{ pathname: "/usertickets", state: { admin: admin, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>

                <Link to={{ pathname: "/managetickets", state: { admin: admin, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>
                    
            </div>
        )
    }

    const SubmitterSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { submitter: submitter, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem> Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { submitter: submitter, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects </Link>
                <Link to={{ pathname: "/managetickets", state: { submitter: submitter, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"><CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
            </div>
        )
    }

    const ManagerSidebar = () => {
        return (
            <div>
                <Link to={{ pathname: "/dashboard", state: { manager: manager, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-tachometer-alt"></i> </CDBSidebarMenuItem>  Dashboard</Link>
                <Link to={{ pathname: "/userprojects", state: { manager: manager, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> My Projects</Link>
                <Link to={{ pathname: "/manageprojects", state: { manager: manager, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-project-diagram"></i>  </CDBSidebarMenuItem> Manage Projects </Link>
                <Link to={{ pathname: "/usertickets", state: { manager: manager, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> My Tickets </Link>
                <Link to={{ pathname: "/managetickets", state: { manager: manager, username: username, userId: userId, profilePicture: profilePicture } }} className="nav-text"> <CDBSidebarMenuItem> <i class="fas fa-ticket-alt"> </i> </CDBSidebarMenuItem> Manage Tickets </Link>
            </div>
        )
    }


    const increment = () => {
        notifCounter.current += 1;
    }

    const divStyle = {
        display: 'flex',
        alignItems: 'center'
    };

    const dashboardStyle = makeStyles({
        color: {
            backgroundColor: '#333'
        },
        graphColor: {
            backgroundColor: 'white'
        },
        root: {
            minWidth: 275,
        },
    })

    const dashboardClasses = dashboardStyle();
    
    return (
        <div>
            <Setroles />
            {
                projects.forEach(function (element) {
                    projectstable.push({
                        projectsname: element.projectsname, description: element.description
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
                            
                                    (location.state.developer != null) || (developer == location.state.role) ? (
                                         <DeveloperSidebar />
                                    ) : (
                                        <h3></h3>
                                )}
                                {
                                    (location.state.admin != null) || (admin == location.state.role) ? (
                                         <AdminSidebar />   
                                
                                    ) : (
                                        <h3></h3>
                                )}
                                {
                                    (location.state.manager != null) || (manager == location.state.role) ? (
                                        <ManagerSidebar/>    
                                    ) : (
                                        <h3></h3>
                                )}
                                {
                                    (location.state.submitter != null) || (submitter == location.state.role) ? (
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
                    <h3 id="main"> Dashboard </h3>
                    <Grid container spacing={12}>
                        <Grid style={{
                            marginLeft: "2rem",
                            display: "flex",
                            spacing: 3,
                        }} item xs={3} spacing={2}>
                            <NewTicketsCard/>
                            <Modal open={isOpen} onClose={() => setIsOpen(false)}>

                            </Modal>
                        </Grid>
                         <Grid style={{
                            marginLeft: "-1rem",
                            display: "flex",
                            spacing: 3,
                        }} item xs={3} spacing={2}>
                            <ProjectsCard/>
                        </Grid>
                        <Grid style={{
                            marginLeft: "-1rem",
                            display: "flex",
                            spacing: 5,
                        }} item xs={3} spacing={2}>
                            <TicketsInProgressCard/>
                        </Grid>
                        <Grid style={{
                            marginLeft: "-1rem",
                            display: "flex",
                            spacing: 5,
                        }} item xs={3} spacing={2}>
                            <UrgentTicketsCard/>
                           
                        </Grid>
                    </Grid>
                    <br>
                    </br>
                    <Grid style={{
                            marginLeft: "2rem",
                            display: "flex",
                            spacing: 3,
                            width: "950px"
                        }}className={dashboardClasses.color} container spacing={3}>
                        <Grid style={{
                            marginLeft: "1rem",
                            display: "flex",
                            spacing: 2,
                        }}item xs={3}>
                            {
                            
                                (location.state.developer != null) || (developer == location.state.role) ? (
                                   <DeveloperCard />
                                ) : (
                                    <h3></h3>
                            )}
                            {
                                (location.state.admin != null) || (admin == location.state.role) ? (
                                    <AdminCard/>    
                                ) : (
                                    <h3></h3>
                            )}
                            {
                                (location.state.manager != null) || (manager == location.state.role) ? (
                                    <ManagerCard/>    
                                ) : (
                                    <h3></h3>
                            )}
                            {
                                (location.state.submitter != null) || (submitter == location.state.role) ? (
                                    <SubmitterCard />
                                ) : (
                                    <h3></h3>
                            )}
                            
                         </Grid>
                        <div id="dashboardwrapper">
                                <Grid style={{
                                    marginLeft: "1rem",
                                    display: "flex",
                                    spacing: 3,
                                }}item xs={3}>
                            <Card className={dashboardClasses.root} variant="outlined">
                                <CardHeader disableTypography={true} title="Tickets By Priority"
                                    style={{ align: "center" }} class="p-3 mb-2 bg-info text-white"> Tickets By Priority </CardHeader>
                                <div className={dashboardClasses.graphColor} style={{height: "225px", width: "280px"}}>

                                <Bar
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        title: { text: "Tickets By Priority", display: true },
                                        scales: {
                                            yAxes: [
                                                {
                                                    ticks: {
                                                        autoSkip: true,
                                                        maxTicksLimit: 10,
                                                        beginAtZero: true
                                                    },
                                                    gridLines: {
                                                        display: true
                                                    }
                                                }
                                            ],
                                            xAxes: [
                                                {
                                                    gridLines: {
                                                        display: false
                                                    }
                                                }
                                            ]
                                        }
                                    }}
                                />
                                </div>
                                </Card>
                            </Grid>
                        </div>
                        <div id="dashboardwrapper">
                            <Grid style={{
                                marginLeft: "1rem",
                                display: "flex",
                                spacing: 3,
                            }}item xs={3}>
                                <Card className={dashboardClasses.root} variant="outlined">
                                    <CardHeader disableTypography={true} title="Tickets By Status" style={{ align: "center" }} class="p-3 mb-2 bg-info text-white"> Tickets By Status </CardHeader>
                                        <div className={dashboardClasses.graphColor} style={{ height: "225px", width: "280px"}}>
                                            <Doughnut
                                                data={chartData2}
                                                options={{
                                                    responsive: true,
                                                    title: { text: "Tickets By Status", display: true },
                                                }}
                                                />
                                        </div>
                                </Card>
                            </Grid>
                        </div>
                        </Grid>
                        <Notifications HubConnection={connection} />
                        
                      </div>  
                </div>
            </div>
          </div>
    );
}

export default Dashboard;
