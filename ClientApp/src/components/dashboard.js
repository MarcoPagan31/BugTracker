import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { FixedSizeList as List } from 'react-window';
import css from './style.css';
import { useLocation } from "react-router";
import * as ReactBootStrap from "react-bootstrap";

const Dashboard = () => {
    const location = useLocation();
    const [projects, setProjects] = useState([]);
    const projectstable = [];
    const ticketstable = [];
    
    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: location.state.username
            }),
        };
        fetch("/api/IssueTracker/dashboard", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])

    const renderProjects = (project, index) => {
        return (
            <tr key={index}>
                <td>{project.projectsname}</td>
                <td>{project.description}</td>
            </tr>
        )
    }

    return (
        <div>
            {
                projects.forEach(function (element) {
                    projectstable.push({
                        projectsname: element.projectsname, description: element.description
                    })
                })
            }

            <ReactBootStrap.Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {projectstable.map(renderProjects)}
                </tbody>
            </ReactBootStrap.Table >
        </div>
    );
}

export default Dashboard;
