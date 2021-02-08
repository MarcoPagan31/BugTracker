import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { FixedSizeList as List } from 'react-window';
import css from './style.css';
import Select from 'react-select';
import { useLocation } from "react-router";

const Manageusers = () => {
    const [role, setRole] = useState([]);
    const location = useLocation();
    const [project_name, setProjectName] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const rolelist = [];
    const [selectedLabel, setSelectedLabel] = useState();

    const handleChange = obj => {
        setSelectedValue(obj.value);
        setSelectedLabel(obj);
        setProjectName(location.state.project_name);
    }

    useEffect(() => {
        fetch("/api/IssueTracker")
            .then((response) => response.json())
            .then((data) => {
                setRole(data)
            })
    }, [])

    const post = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ApplicationUserusername: selectedValue,
                Projectsname: project_name
            }),
        };
        fetch("/api/Project/adduser", requestOptions)
            .then((response) => response.text())
            .then((data) => {

            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div>
            {role.forEach(function (element) {
                rolelist.push({ label: element.usersusername, value: element.usersusername })
            })}

            <Select name="user"
                value={selectedLabel}
                options={rolelist}
                onChange={handleChange}
                isOptionDisabled={option => option.isDisabled}
            />
            <div>
                <Button onClick={() => post()}> Add User</Button>
            </div>
            
        </div>
    );
}

export default Manageusers;
