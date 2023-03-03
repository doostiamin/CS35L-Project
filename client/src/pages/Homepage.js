import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { display, maxHeight } from '@mui/system';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';

const boxSidePanel = {
    display: "flex",
    flexDirection: "column",
    width: 0.25, 
    padding: 2,
    minWidth: 100,
    m: 1,
    alignItems: "center",
    backgroundColor: 'LightGray',
}

const boxSpell = {
    display: "flex",
    flexDirection: "column",
    height: 770,
    width:0.75,
    padding: 2,
    m: 1,
    alignItems: "center",
    backgroundColor: 'LightYellow'
}
function getUserInfo() {
    //TODO
}

export default function Homepage() {
    return (
    <div id="homepage">
        <Stack direction="row">
            <Box sx={boxSidePanel}>
                <h2>Name</h2>
                <h3>Points:1000</h3>
                <div>
                    <Link to="/leaderboard">
                        <Button variant="outlined" sx={{height:40}}>Leaderboard</Button>
                    </Link>
                </div>
                <div>
                    <Link to="/login">
                        <Button variant="outlined" color="error" sx={{height:40}}>Logout</Button>
                    </Link>
            </div>
            </Box>
            <Box sx={boxSpell} alignItems="center" justifyContent="center">
                <h1>Spell!</h1>
                <h2>By Difficulty</h2>
                <div>
                    <Link to="/spell">
                        <Button variant="outlined" sx={{height:40}}>Easy</Button>
                    </Link>        
                    <Link to="/spell">
                        <Button variant="outlined" sx={{height:40}}>Medium</Button>
                    </Link>
                    <Link to="/spell">
                        <Button variant="outlined" sx={{height:40}}>Hard</Button>
                    </Link>
                </div>
                <h2>By Topic</h2>
                <div>
                    <Link to="/spell">
                        <Button variant="outlined" sx={{height:40}}>Category 1</Button>
                        </Link>
                    <Link to="/spell">
                        <Button variant="outlined" sx={{height:40}}>Category 2</Button>
                    </Link>
                    <Link to="/spell">
                        <Button variant="outlined" sx={{height:40}}>Category 3</Button>
                    </Link>
                </div>
            </Box>
        </Stack>
    </div>
    );
}