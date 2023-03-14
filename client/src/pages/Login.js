import { Box, FormControl, TextField, Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import welcome from '../assets/welcome.png';
import axios from 'axios';
import {UserContext} from './UserContext.js'


const login = {
  margin: "5px"
};


const Interact = ({setError, setErrorMessage, setSuccess, setSuccessMessage}) => {
    
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
                    setErrorMessage("Please enter a username.");
                else
                    setErrorMessage("Invalid username. Please sign up first!");
                
                setError(true);
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    function addUser(){

        if(username == "" || name == ""){
            setErrorMessage("Please fill out all fields.");
            setError(true);
            return;
        }

        // console.log("adding user ", username);
        
        var existing = false;

        // check if user already exists
        axios.get('http://localhost:8080/api/users')
        .then(function (response) {

            var users = Object.keys(response.data.data);

            for(let i=0; i<users.length; i++)
                if (username == users[i])
                    existing = true;

            if(existing){
                setErrorMessage("Username taken. Try a different one!");
                setError(true);
                return;
            }
            else{
                // send user to server
                axios.post('http://localhost:8080/api/users', {user: username, info: {"name": name, "points": 0}})
                .then(function (response) {
                if(response.data.success){
                    setSuccessMessage("Welcome to the Bee Slayer family, " + name + "!");
                    setSuccess(true);
                    setIsSignup(false);
                }
                }).catch(err=>{
                    console.log(err);
                })
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    // display signup fields
    if(isSignup){
        return (
            <Box sx={{width: '16vw'}}>
                <Box display="flex">
                    <TextField id="username" 
                    type="username" 
                    placeholder="username" 
                    onChange={(e) => setUsername(e.target.value)}
                    // sx={login}
                    margin='dense'
                    fullWidth
                    size='small'
                    />
                </Box>
                <Box display="flex">
                    <TextField id="name" 
                    type="text" 
                    placeholder="name" 
                    onChange={(e) => setName(e.target.value)}
                    // sx={login} 
                    margin='dense'
                    fullWidth
                    size='small'
                    />
                </Box>
                <Button variant="contained" 
                    onClick={() => addUser()}
                    sx={{
                        // margin: "5px",
                        mt: "1rem",
                        width: "100%"
                    }}
                >join</Button>
                <Button variant="text"
                    onClick={() => setIsSignup(false)}
                    sx={{
                        // margin: "5px",
                        mt: "0.5rem",
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
                        // sx={login}
                        size="small"
                    />
                    </Box>
                    <Button variant="contained" 
                    size="small"
                    onClick={() => authenticate(setUname, setN, setPoints)}
                    sx={{
                        marginLeft: 1,
                        width: "100px"
                    }}
                    >login</Button>
                
                </Box>
                <Box align="center" width="100%" sx = {{mt: "5vh", mb:"10px"}}>Don't have an account yet? </Box>
                <Button variant="text" 
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
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error!");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("Success!");

    return (
        <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{background: 'url("beehive2.jpg")', backgroundSize: 'cover'}}>
            <Snackbar open={error} autoHideDuration={1000} onClose={() => {setError(false)}}>
                <Alert onClose={() => {setError(false)}} variant="filled" severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>

            <Snackbar open={success} autoHideDuration={1000} onClose={() => {setSuccess(false)}}>
                <Alert onClose={() => {setSuccess(false)}} variant="filled" severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

            <Box display={'grid'} sx={{background: 'rgba(255,255,255,0.4)', width: '100%', height: '100%', placeItems: 'center'}}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} py={2} px={1}>
                    <Box display="block" width="30vw" sx = {{mb: 2}}>
                        <img src={welcome} className="Welcome-image" alt = "welcome" width="100%"/>
                    </Box>
                    <Interact isSignup="false" setError={setError} setErrorMessage={setErrorMessage} setSuccess={setSuccess} setSuccessMessage={setSuccessMessage} />
                </Box>
            </Box>
        </Box>
    );
};

export default Login;