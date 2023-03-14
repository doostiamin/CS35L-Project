import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { display } from '@mui/system';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { UserContext } from "./UserContext.js";
import { React, useState } from 'react';
import axios from 'axios'; 
import spellImg from '../assets/spell.png';


const boxSidePanel = {
    display: "flex",
    flexDirection: "column",
    width: 0.25, 
    padding: 2,
    height: "vmax",
    minWidth: 100,
    m: 1,
    alignItems: "center",
    backgroundColor: 'LightYellow',
    gap: 10,
}

const boxSpell = {
    display: "flex",
    flexDirection: "column",
    height: "vmax",
    width:0.75,
    padding: 2,
    m: 1,
    alignItems: "center",
    overflow:"auto"
}

const buttonSX = {
    height: 300,
    width: 300,
    color: "black",
    borderColor: "black",
    fontSize: 30

}

const containedButtonSX = {
    height: 175,
    width: 175,
    color: "black",
    borderColor: "black",
    backgroundColor: "lightYellow"
}

const link = {
    textDecoration:'none'
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
            <Box display="flex" flexDirection="row" overflow="auto">
                <Box sx={boxSidePanel} justifyContent="center">
                    <h2>{n}</h2>
                    <h3>Points: {points}</h3>
                    <div>
                        <Link to="/leaderboard" style={link}>
                            <Button variant="outlined" sx={{height:200, width:200, color: "black", borderColor: "black"}}>Leaderboard</Button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/login" style={link}>
                            <Button variant="outlined" color="error" sx={{height:30, width: 200}}>Logout</Button>
                        </Link>
                    </div>
                </Box>
                <Box sx={boxSpell} alignItems="center" justifyContent="center">
                    <Box display="flex" justifyContent="center" width="50vw" sx = {{mb: "2%"}}>
                        <img src={spellImg} className="spell-image" alt = "spell" width="70%"/>
                    </Box>
                    <Link to="/spell" state={{difficulty: "general"}} style={link}>
                            <Button variant="outlined" sx={{height: 175,
                                                            width: "40vw",
                                                            color: "black",
                                                            borderColor: "black",
                                                            backgroundColor: "lightYellow", 
                                                            fontSize:"40px",
                                                            mb: "5%"}}>Start Spelling</Button>
                    </Link>
                    <h1>Spell By Difficulty</h1>
                    <br/>
                    <Box sx={{display:'flex', width:1, justifyContent:'space-evenly'}}>
                        <Link to="/spell" state={{difficulty: "easy"}} style={link}>
                            <Button variant="outlined" sx={buttonSX}>Easy</Button>
                        </Link>        
                        <Link to="/spell" state={{difficulty: "intermediate"}} style={link}>
                            <Button variant="outlined" sx={buttonSX}>Intermediate</Button>
                        </Link>
                        <Link to="/spell" state={{difficulty: "difficult"}} style={link}>
                            <Button variant="outlined" sx={buttonSX}>Difficult</Button>
                        </Link>
                    </Box>
                    <br/>
                    <h1>Spell By Topic</h1>
                    <br/>
                    <Box sx={{display:'flex', width:1, justifyContent:'space-evenly'}}>
                        <Link to="/spell" state={{difficulty: "general"}} style={link}>
                                <Button variant="outlined" sx={buttonSX}>All Words</Button>
                        </Link>
                        <Link to="/spell" state={{difficulty: "animals"}} style={link}>
                            <Button variant="outlined" sx={buttonSX}>Animals</Button>
                        </Link>
                        <Link to="/spell" state={{difficulty: "foods"}} style={link}>
                            <Button variant="outlined" sx={buttonSX}>Foods</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </div>
    )}
    </UserContext.Consumer>
    );
}

export default Homepage;