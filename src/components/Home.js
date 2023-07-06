import React from "react";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();

    const handleClick = (event, actionType) => {
        if(actionType === "clock"){
            navigate("/clock");
        } else {
            navigate("/lists");
        }
    }

    return (
        <div
            style={{ 
                maxHeight: window.innerHeight, 
                background: "#d6dbf2", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                marginTop: '15%' 
            }}
        >
            <Container
                sx={{
                    backgroundColor: "#001e3c",
                    borderRadius: "10px",
                    height: "200px",
                    width: "300px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                <Button 
                    variant="contained"
                    sx={{
                        marginBottom: "20px"
                    }}
                    onClick={(event) => handleClick(event, "clock")}
                >
                    Pomodoro Clock
                </Button>
                <Button 
                    variant="contained"
                    onClick={(event) => handleClick(event, "lists")}
                >
                    Lists
                </Button>
            </Container>
        </div>
    );
};