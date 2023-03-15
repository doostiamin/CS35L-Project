import { Avatar, Box, Chip, Icon, IconButton, TextField, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import { display } from '@mui/system';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { UserContext } from "./UserContext.js";
import { React, useState } from 'react';
import axios from 'axios'; 
import spellImg from '../assets/spell.png';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { createAvatar } from '@dicebear/core';
import { miniavs } from '@dicebear/collection';

const boxSidePanel = {
    display: "flex",
    flexDirection: "row",
    // width: 0.25, 
    py: 2,
    px: 4,
    // height: "vmax",
    // minWidth: 100,
    // m: 1,
    alignItems: "center",
    backgroundColor: 'rgba(255,255,255,0.5)',
    gap: 2,
}

const boxSpell = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: '100%',
    // width:0.75,
    padding: 4,
    gap: 2,
    // m: 1,
    justifyContent: "space-around",
    // overflow:"auto"
}

const buttonSX = {
    height: 300,
    width: 300,
    color: "black",
    border: "2px solid #000",
    fontSize: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    ':hover': {
        backgroundColor: 'rgba(255,255,255,0.5)',
        border: "2px solid #000",
    }

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

    return (
    <UserContext.Consumer>
    {({ uname, setUname, n, setN, points, setPoints }) => (    
        <div id="homepage"  style={{background: 'url("beehive2.jpg")', backgroundSize: 'cover', height: '100vh'}}>
            <Box display="flex" flexDirection="column" overflow="auto" height={'100%'}>
                <Box sx={boxSidePanel}>
                    <img src={spellImg} className="spell-image" alt = "spell" width={'10%'} style={{marginRight: 'auto'}} />

                    <Link to="/login">
                        <IconButton color='error' size='large'>
                            <LogoutIcon />
                        </IconButton>
                    </Link>
                    <Link to="/leaderboard">
                        <IconButton color='primary' size='large'>
                            <LeaderboardIcon />
                        </IconButton>
                    </Link>
                    <Chip label={points + ' pts'} color={'primary'} />
                    <Typography variant='h6'>{n}</Typography>
                    <Avatar sx={{ width: 96, height: 96, backgroundColor: '#fff'}} src={createAvatar(miniavs, {seed: n, flip: true}).toDataUriSync()}></Avatar>
                </Box>
                <Box sx={boxSpell}>
                    <Link to="/spell" state={{difficulty: "challenge"}} style={link}>
                            <Button variant="outlined" sx={{height: '100%',
                                                            width: '35vw',
                                                            color: "black",
                                                            backgroundColor: "rgba(255,255,255,0.1)", 
                                                            border: '2px solid #000',
                                                            fontSize:"40px",
                                                            ':hover': {
                                                                backgroundColor: 'rgba(255,255,255,0.5)',
                                                                border: "2px solid #000",
                                                            }
                                                            }}>Challenge Mode</Button>
                    </Link>

                    <Box>
                        <Box>
                            <h1>Spell By Difficulty</h1>
                            <Box sx={{display:'flex', width:1, justifyContent:'space-evenly', gap: 2}}>
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
                        </Box>

                        <Box>
                            <h1>Spell By Topic</h1>
                            <Box sx={{display:'flex', width:1, justifyContent:'space-evenly', gap: 2}}>
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
                </Box>
            </Box>
        </div>
    )}
    </UserContext.Consumer>
    );
}

export default Homepage;