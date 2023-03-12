import { Box, FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import welcome from '../assets/welcome.png';
import axios from 'axios';
import {UserContext} from './UserContext.js'


const login = {
  margin: "5px"
};


const Interact = () => {
    
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");

    const [isSignup, setIsSignup] = useState(false);


    function authenticate( setUname, setN, setPoints ){
        console.log("authenticating ", username);

        axios.get('http://localhost:8080/api/users')
        .then(function (response) {

            var valid = false;

            var users = Object.keys(response.data.data);

            for(let i=0; i<users.length; i++){
                //console.log(username, " vs ", users[i]);
                if (username == users[i]){  
                    valid = true;
                    
                    // set context
                    setPoints(response.data.data[username].points);
                    setUname(username);
                    setN(response.data.data[username].name);
                }
            }

            if(valid){  
                console.log("AUTHENTICATED");
                navigate('/homepage');
            }
            else{
                if(username == "")
                    alert("Please enter a username.");
                else
                    alert("Invalid username. Please sign up first!");
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    function addUser(){

        if(username == "" || name == ""){
            alert("Please fill out all fields.");
            return;
        }

        console.log("adding user ", username);

        // check if user already exists
        axios.get('http://localhost:8080/api/users')
        .then(function (response) {

            var existing = false;

            var users = Object.keys(response.data.data);

            for(let i=0; i<users.length; i++)
                if (username == users[i])
                    existing = true;

            if(existing){
                alert("Username taken. Try a different one!");
                return;
            }
        }).catch(err=>{
            console.log(err);
        })

        // send user to server
        axios.post('http://localhost:8080/api/users', {user: username, info: {"name": name, "points": 0}})
        .then(function (response) {
        if(response.data.success){
            alert("Welcome, Bee Slayer " + name + "!");
            setIsSignup(false);
        }
        }).catch(err=>{
            console.log(err);
        })
    }

    // display signup fields
    if(isSignup){
        return (
            <Box>
                <Box display="flex" sx={{login}}>
                    <TextField id="username" 
                    type="username" 
                    placeholder="username" 
                    onChange={(e) => setUsername(e.target.value)}
                    sx={login}
                    />
                </Box>
                <Box display="flex">
                    <TextField id="name" 
                    type="text" 
                    placeholder="name" 
                    onChange={(e) => setName(e.target.value)}
                    sx={login} 
                    />
                </Box>
                <Button variant="outlined" 
                    onClick={() => addUser()}
                    sx={{
                        margin: "5px",
                        mt: "15px",
                        width: "100%"
                    }}
                >join</Button>
                <Button variant="outlined" 
                    onClick={() => setIsSignup(false)}
                    sx={{
                        margin: "5px",
                        mt: "15px",
                        width: "100%"
                    }}
                >Back to login</Button>
            </Box>
        );
    }
    // display login fields
    else{
        return (
            <UserContext.Consumer>
            {({ uname, setUname, n, setN, points, setPoints}) => (   
                <Box>
                <Box display="flex">
                    <Box display="flex">
                    <TextField id="username" 
                        type="userxname" 
                        placeholder="username" 
                        onChange={(e) => setUsername(e.target.value)}
                        sx={login}
                    />
                    </Box>
                    <Button variant="outlined" 
                    onClick={() => authenticate(setUname, setN, setPoints)}
                    sx={{
                        margin: "5px", 
                        width: "100px"
                    }}
                    >login</Button>
                
                </Box>
                <Box align="center" width="100%" sx = {{mt: "5vh", mb:"10px"}}>Don't have an account yet? </Box>
                <Button variant="outlined" 
                    onClick={() => setIsSignup(true)}
                    sx={{
                        margin: "5px",
                        width: "100%"
                    }}
                    >sign up</Button>
                </Box>
            )}
            </UserContext.Consumer>
          );
    }
}

const Login = () => {

  return (
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box display="block" width="70vw" sx = {{mb: "2%"}}>
            <img src={welcome} className="Welcome-image" alt = "welcome" width="100%"/>
        </Box>
        <Interact isSignup="false" />
    </Box>
  );
};

export default Login;