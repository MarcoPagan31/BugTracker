import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import * as ReactBootStrap from "react-bootstrap";
import css from './style.css';
import Sidebar from './sidebar';
import sidebar from './sidebar.css';

const Project = () => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [projects, setProjects] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const [selectedLabel, setSelectedLabel] = useState();
    const projectlist = [];
    const projectstable = [];
    const [password, setPassword] = useState();

    const handleChange = obj => {
        setSelectedValue(obj.value);
        setSelectedLabel(obj);
    }

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Projectsname: name,
                description: description,
            }),
        };
        fetch("/api/Project", requestOptions)
            .then((response) => response.json())
            .then((data) => {

            })
    }

    useEffect(() => {
        fetch("/api/Project")
            .then((response) => response.json())
            .then((data) => {
                setProjects(data)
            })
     
    }, [])

    const renderProjects = (project, index) => {
        return (
            <tr key={index}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <ul class="right">
                    <li> <Link to={{
                        pathname: '/manageusers',
                        state: {
                            project_name: selectedValue
                        }
                    }}>Manage Users
                    </Link> </li>
                    <li> <Link to={{
                        pathname: '/details',
                        state: {
                            project_name: selectedValue,
                            description: description
                        }
                    }}>Details 
                    </Link> </li>
                </ul>  
            </tr>
        )
    }

    return (
        <div>
            {
                projects.forEach(function (element) {
                    projectstable.push({ name: element.projectsname, description: element.description })
                })
            }
            {
                projects.forEach(function (element) {
                    projectlist.push({ label: element.projectsname, value: element.projectsname })
                })
            }
            
            <body>
                    <div class="d-flex" id="wrapper">
                        <div class="bg-light border-right" id="sidebar-wrapper">
                            <div class="sidebar-heading">Start Bootstrap </div>
                            <div class="list-group list-group-flush">
                                <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
                                <a href="#" class="list-group-item list-group-item-action bg-light">Manage Role Assignment</a>
                                <a href="#" class="list-group-item list-group-item-action bg-light">Manage Project Users</a>
                                <a href="#" class="list-group-item list-group-item-action bg-light">My Projects</a>
                                <a href="#" class="list-group-item list-group-item-action bg-light">My Tickets</a>
                                <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
                        </div>
                        
                    </div>
              <div id="page-content-wrapper">
                <div class="container-fluid">
                <Select
                    value={selectedLabel}
                    options={projectlist}
                    onChange={handleChange}
                    isOptionDisabled={option => option.isDisabled}
                />
                <form action="#" method="POST">
                    <TextField onChange={(e) => setName(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <TextField onChange={(e) => setDescription(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <Button onClick={() => post()}> Create New Project </Button>
                </form>
                <ReactBootStrap.Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectstable.map(renderProjects)}
                    </tbody>
                </ReactBootStrap.Table> 
                </div>
                    </div>
                </div>
                
            </body>
            
            
        </div>
    );
}



export default Project;