import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './timer.css';

const PomodoroClock = () => {
    const [timer, setTimer] = useState(1500); // Initial timer set to 25 minutes (in seconds)
    const [isRunning, setIsRunning] = useState(false);
    const [cycles, setCycles] = useState(1);
    const [enteredCycles, setEnteredCycles] = useState(0);
    const [currentCycle, setCurrentCycle] = useState(0);
    const [workRunning, setWorkRunning] = useState(true);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        if (timer === 0) {
            clearInterval(interval);
            handleCycleCompletion();
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning, timer]);

    const handleStartReset = () => {
        if (isRunning) {
            setIsRunning(false);
            setTimer(1500); // Reset timer to 25 minutes
        } else {
            setIsRunning(true);
        }
    };

    const handleBreak = () => {
        setIsRunning(false);
        setTimer(300); // Set timer to 5 minutes for break
        setIsRunning(true);
    };

    const handleCycleCompletion = () => {
        setCurrentCycle((prevCycle) => prevCycle + 1);

        if (currentCycle + 1 === cycles) {
            setIsRunning(false);
            setCurrentCycle(0);
            setTimer(1500); // Reset timer to 25 minutes
        }
    };

    const handleCycleSubmit = (event) => {
        setCycles((prev) => parseInt(enteredCycles));
    };

    return (
        <div className="central">
            <h1 style={{ fontFamily: "Consolas" }}>Pomodoro Timer</h1>
            <div class="timer">
                <p>{Math.floor(timer / 60).toString().padStart(2, "0")}:{(timer % 60).toString().padStart(2, "0")}</p>
            </div>
            <div class="button-container">
                {!isRunning ? (
                <button onClick={handleStartReset} className="start-btn">Start</button>
                ) : (
                <button onClick={handleStartReset} className="start-btn">Reset</button>
                )}
                <button onClick={handleBreak} className="break-btn">Break</button>
            </div>
            <div
                style={{
                    display: "flex"
                }}
            >
                <TextField
                    id="outlined-basic" 
                    label="Cycles" 
                    variant="outlined" 
                    size="small"
                    value={enteredCycles}
                    sx={{ 
                        backgroundColor: "white",
                        border: "none",
                        marginRight: "15px"
                    }} 
                    inputProps={{ 
                        inputMode: 'numeric', 
                        pattern: '[0-9]*' 
                    }}
                    onChange={(event) => setEnteredCycles(event.target.value)}
                />
                <Button 
                    variant="contained"
                    onClick={handleCycleSubmit}
                >
                    Submit
                </Button>
            </div>
            <p style={{ fontFamily: "Consolas" }}>Number of cycles Pomodoro will run: {cycles - currentCycle} </p>
            <p style={{ fontFamily: "Consolas", margin: "10px" }}>
                “Without ambition one starts nothing. 
                Without work one finishes nothing. 
                The prize will not be sent to you. You have to win it.” — Ralph Waldo Emerson
            </p>
        </div>
    );
};

export default PomodoroClock;