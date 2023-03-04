import { Box, FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';

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
      <Box>
        <TextField id="email" 
          type="email" 
          placeholder="email" 
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