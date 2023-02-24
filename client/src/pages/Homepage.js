import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


const boxDefault = {
    height: 770,
    padding: 2,
    minWidth: 600,
    m: 1
}

export default function Homepage() {
    return (
      <div id="homepage">
        <div>
          <Link to="/spell">
            <Button variant="outlined" sx={{height:40}}>Spell</Button>
          </Link>
        </div>
        <div>
          <Link to="/leaderboard">
            <Button variant="outlined" sx={{height:40}}>Leaderboard</Button>
          </Link>
        </div>
        <div>
          <Link to="/login">
            <Button variant="outlined" sx={{height:40}}>Logout</Button>
          </Link>
        </div>
      </div>
      );
}