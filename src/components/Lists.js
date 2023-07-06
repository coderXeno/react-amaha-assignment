import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import _ from "lodash";

export default function Lists(){
    const [enteredItemForFirst, setEnteredItemForFirst] = useState("");
    const [enteredItemForSecond, setEnteredItemForSecond] = useState("");
    const [firstArray, setFirstArray] = useState([]);
    const [secondArray, setSecondArray] = useState([]);
    const [computed, setComputed] = useState(false);
    const [itemsOnlyinA, setItemsOnlyInA] = useState([]);
    const [itemsOnlyinB, setItemsOnlyInB] = useState([]);
    const [itemsBothInAandB, setItemsBothInAandB] = useState([]);
    const [itemsCombined, setItemsCombined] = useState([]);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if(firstArray.length > 0 && secondArray.length > 0){
            setDisabled((prev) => false);
        }
    }, [firstArray, secondArray]);

    // const handleDelete = (deleteType, index) => {
    //     console.log(deleteType);
    //     console.log(index);
    //     if(deleteType === "first"){
    //         let arr = firstArray;

    //         const firstElement = arr[0];
    //         const lastElement = arr[arr.length - 1];
    //         arr[index] = lastElement;
    //         arr.splice(arr.length - 1, 1);

    //         setFirstArray((prev) => arr);
    //     } else {
    //         let arr = secondArray;

    //         const firstElement = arr[0];
    //         const lastElement = arr[arr.length - 1];
    //         arr[index] = lastElement;
    //         arr.splice(arr.length - 1, 1);

    //         setSecondArray((prev) => arr);   
    //     }
    // }

    const handleKeyDown = (event, fieldType) => {
        if (event.keyCode === 13) {
            if(fieldType === "first"){
                handleFirstSubmit(event);
            } else {
                handleSecondSubmit(event);
            }
        }
    };

    const handleFirstSubmit = (event) => {
        if(event.target.value !== ""){
            setFirstArray((prev) => [...prev, enteredItemForFirst]);
        }
    }

    const handleSecondSubmit = (event) => {
        if(event.target.value !== ""){
            setSecondArray((prev) => [...prev, enteredItemForSecond]);
        }
    }

    const handleCompute = (event) => {
        if(firstArray.length > 0 && secondArray.length > 0){
            const itemsPresentOnlyInA = firstArray.filter((element) => !secondArray.includes(element));
            setItemsOnlyInA((prev) => itemsPresentOnlyInA);

            const itemsPresentOnlyInB = secondArray.filter((element) => !firstArray.includes(element));
            setItemsOnlyInB((prev) => itemsPresentOnlyInB);

            const itemsPresentBoth = _.intersection(firstArray, secondArray);
            setItemsBothInAandB((prev) => itemsPresentBoth);

            const mergedArr = [...firstArray, ...secondArray];
            const uniqueSet = new Set(mergedArr);
            const finalUniqueArr = [...uniqueSet];
            setItemsCombined((prev) => finalUniqueArr);

            setComputed((prev) => true);
        }
    }

    return(
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5%"
            }}
        >
            <div 
                style={{ 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "10%"
                    }}
                >
                    <Stack 
                        direction="row" spacing={0.5} 
                        flexWrap="wrap" 
                        sx={{ marginBottom: "5%" }}
                        width="300px" useFlexGap
                    >
                        {firstArray.map((item, index) => {
                            return(
                                <Chip 
                                    label={item} key={index} 
                                    // onDelete={(event) => handleDelete("first", index)} 
                                />
                            );
                        })}
                    </Stack>
                    <div
                        style={{
                            display: "flex"
                        }}
                    >
                        <TextField
                            id="outlined-basic" 
                            label="Enter Item(Press Enter when done)" 
                            variant="outlined" 
                            size="small"
                            sx={{ 
                                backgroundColor: "white",
                                border: "none",
                                marginRight: "15px",
                                color: "black"
                            }}
                            onChange={(event) => setEnteredItemForFirst(event.target.value)}
                            onKeyDown={(event) => handleKeyDown(event, "first")}
                        />
                        <Button 
                            variant="contained"
                            onClick={handleFirstSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10%"
                    }}
                >
                    <Stack 
                        direction="row" spacing={0.5} 
                        flexWrap="wrap" 
                        sx={{ marginBottom: "5%" }}
                        width="300px" useFlexGap
                    >
                        {secondArray.map((item, index) => {
                            return(
                                <Chip 
                                    label={item} key={index} 
                                    // onDelete={(event) => handleDelete("second", index)} 
                                />
                            );
                        })}
                    </Stack>
                    <div
                        style={{
                            display: "flex"
                        }}
                    >
                        <TextField
                            id="outlined-basic" 
                            label="Enter Item(Press Enter when done)" 
                            variant="outlined" 
                            size="small"
                            sx={{ 
                                backgroundColor: "white",
                                border: "none",
                                marginRight: "15px",
                                color: "black"
                            }}
                            onChange={(event) => setEnteredItemForSecond(event.target.value)}
                            onKeyDown={(event) => handleKeyDown(event, "second")}
                        />
                        <Button 
                            variant="contained"
                            onClick={handleSecondSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            <Button 
                variant='contained' onClick={handleCompute} 
                sx={{ marginTop: "20px", marginBottom: "20px" }}
                disabled={disabled}
            >
                Compute
            </Button>
            {computed ? 
            <div
                style={{
                    display: "flex",
                    flexDirection: "column", 
                    justifyContent: "center"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column", 
                        justifyContent: "center"
                    }}
                >
                    <p>Items Only in A</p>
                    <Stack
                        direction="row" spacing={0.5} 
                        flexWrap="wrap" 
                        sx={{ marginBottom: "5%" }}
                        width="300px" useFlexGap
                    >
                        {itemsOnlyinA.length > 0 ? itemsOnlyinA.map((item, index) => (
                            <Chip label={item} key={index} />
                        )) : <p>None</p>}
                    </Stack>

                    <p>Items Only in B</p>
                    <Stack
                        direction="row" spacing={0.5} 
                        flexWrap="wrap" 
                        sx={{ marginBottom: "5%" }}
                        width="300px" useFlexGap
                    >
                        {itemsOnlyinB.length > 0 ? itemsOnlyinB.map((item, index) => (
                            <Chip label={item} key={index} />
                        )) : <p>None</p>}
                    </Stack>

                    <p>Items Present in both A and B</p>
                    <Stack
                        direction="row" spacing={0.5} 
                        flexWrap="wrap" 
                        sx={{ marginBottom: "5%" }}
                        width="300px" useFlexGap
                    >
                        {itemsBothInAandB.map((item, index) => (
                            <Chip label={item} key={index} />
                        ))}
                    </Stack>

                    <p>Items Combining both A and B(unique)</p>
                    <Stack
                        direction="row" spacing={0.5} 
                        flexWrap="wrap" 
                        sx={{ marginBottom: "5%" }}
                        width="300px" useFlexGap
                    >
                        {itemsCombined.map((item, index) => (
                            <Chip label={item} key={index} />
                        ))}
                    </Stack>
                </div>
            </div> : ""}
        </div>
    );
};