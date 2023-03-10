import { Box, FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import welcome from '../assets/welcome.png';

const login = {
  margin: "5px"
};

const Login = () => {
  
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function authenticate(){
    console.log("authenticating ", username, "\npassword ", password);

    // API call to navigate only if valid authentication
    if(true){
      navigate('/homepage');
    }
    //else
     // alert("invalid username and/or password.");
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box display="block" width="70vw" sx = {{mb: "2%"}}>
        <img src={welcome} className="Welcome-image" alt = "welcome" width="100%"/>
      </Box>
      <Box>
        <TextField id="username" 
          type="userxname" 
          placeholder="username" 
          onChange={(e) => setUsername(e.target.value)}
          sx={login}
        />
        <Box display="flex">
          <TextField id="password" 
            type="password" 
            placeholder="password" 
            onChange={(e) => setPassword(e.target.value)}
            sx={login} 
          />
          <Button variant="outlined" 
            onClick={() => authenticate()}
            sx={login}
          >login</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;