import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function Leaderboard() {
  return (
    <div id="leaderboard">
      <div>
        <Link to="/leaderboard">
          <Button variant="outlined" sx={{height:40}}>Leaderboard</Button>
        </Link>
      </div>
      <div>
        <Link to="/homepage">
          <Button variant="outlined" sx={{height:40}}>Back</Button>
        </Link>
      </div>
    </div>
    );
}