import { Box, Icon } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { maxHeight } from '@mui/system';


const boxDefault = {
    display: "flex",
    flexDirection: "column",
    justifyContents: "center",
    height: 770,
    padding: 9,
    minWidth: 600,
    m: 1,
    alignItems: "center",
    gap: 2
}

export default function Spell() {
    const [answer, setAnswer] = useState("");
    const [updated, setUpdated] = useState('');

    function checkCorrect() {
        if (answer === "scrumptious") {
            alert("Correct");
        }
        else {
            alert("Incorrect");
        }
    }
     
    return (
        <div id="spell">
            <Box sx={boxDefault}>
                <div>
                    <TextField id="standard-basic" label="Answer" variant="standard" onChange={(answer) => setAnswer(answer.target.value)}/>
                    <Button variant="contained" sx={{height:40}} onClick={checkCorrect}>Enter</Button>
                </div>
                <div>
                    <Button variant="outlined" sx={{height:40}}>Listen</Button>
                    <Button variant="outlined" sx={{height:40}}>Definition</Button>
                    <Button variant="outlined" sx={{height:40}}>Skip</Button>
                </div>
                <div>
                    <Link to="/homepage">
                    <Button variant="outlined" sx={{height:40}}>Back</Button>
                    </Link>
                </div>
            </Box>
        </div>
    );
}
