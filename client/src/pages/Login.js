import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const boxDefault = {
    height: 770,
    padding: 2,
    minWidth: 600,
    m: 1
}

export default function Login() {
    return (
      <div id="login">
        <Link to="/homepage">
          <Box sx={boxDefault} display="flex" justifyContent="center" alignItems="center">
            <Button variant="outlined" sx={{height:40}}>Login</Button>
          </Box>
        </Link>
      </div>
      );
}