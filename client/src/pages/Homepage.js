import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { display, maxHeight } from '@mui/system';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { UserContext } from "./UserContext.js";
import { React, useState } from 'react';

const boxSidePanel = {
    display: "flex",
    flexDirection: "column",
    width: 0.25, 
    padding: 2,
    minWidth: 100,
    m: 1,
    alignItems: "center",
    backgroundColor: 'LightYellow',
    gap: 10,
}

const boxSpell = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width:0.75,
    padding: 2,
    m: 1,
    alignItems: "center",
}

const buttonSX = {
    height: 175,
    width: 175,
    color: "black",
    borderColor: "black",
}

const containedButtonSX = {
    height: 175,
    width: 175,
    color: "black",
    borderColor: "black",
    backgroundColor: "lightYellow"
}

const Homepage = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/users/:name/points${searchTerm}`);
            const result = response.data;

            if (result.success) {
                setSearchResult(`Points for user ${searchTerm}: ${result.data}`);
            } else {
                setSearchResult(`User '${searchTerm}' not found`);
            }
        } catch (error) {
            setSearchResult(`Error: ${error.message}`);
        }
    };

    return (
    <UserContext.Consumer>
    {({ uname, setUname, n, setN, points, setPoints }) => (    
        <div id="homepage">
            <Stack direction="row">
                <Box sx={boxSidePanel} justifyContent="center" height="maxHeight">
                    <h2>{n}</h2>
                    <h3>Points: {points}</h3>
                    <div>
                        <Link to="/leaderboard">
                            <Button variant="outlined" sx={{height:200, width:200, color: "black", borderColor: "black"}}>Leaderboard</Button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/login">
                            <Button variant="outlined" color="error" sx={{height:30, width: 200}}>Logout</Button>
                        </Link>
                </div>
                </Box>
                <Box sx={boxSpell} alignItems="center" justifyContent="center">
                    <h1><span role="img">🐝 </span>Spell!<span role="img"> 🐝</span></h1>
                    <Link to="/spell" state={{difficulty: "general"}}>
                            <Button variant="outlined" sx={containedButtonSX}>Start Spelling</Button>
                    </Link>
                    <h2>Spell By Difficulty</h2>
                    <Box sx={{display:'flex', width:1, justifyContent:'space-evenly'}}>
                        <Link to="/spell" state={{difficulty: "easy"}}>
                            <Button variant="outlined" sx={buttonSX}>Easy</Button>
                        </Link>        
                        <Link to="/spell" state={{difficulty: "intermediate"}}>
                            <Button variant="outlined" sx={buttonSX}>Intermediate</Button>
                        </Link>
                        <Link to="/spell" state={{difficulty: "difficult"}}>
                            <Button variant="outlined" sx={buttonSX}>Difficult</Button>
                        </Link>
                    </Box>
                    <h2>Spell By Topic</h2>
                    <Box sx={{display:'flex', width:1, justifyContent:'space-evenly'}}>
                        <Link to="/spell" state={{difficulty: "general"}}>
                                <Button variant="outlined" sx={buttonSX}>All Words</Button>
                        </Link>
                        <Link to="/spell" state={{difficulty: "animals"}}>
                            <Button variant="outlined" sx={buttonSX}>Animals</Button>
                        </Link>
                        <Link to="/spell" state={{difficulty: "foods"}}>
                            <Button variant="outlined" sx={buttonSX}>Foods</Button>
                        </Link>
                    </Box>
                </Box>
            </Stack>
        </div>
    )}
    </UserContext.Consumer>
    );
}

export default Homepage;