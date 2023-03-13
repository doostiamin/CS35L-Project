import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, setState, useEffect } from 'react'
import leaderboardImg from '../assets/leaderboard.png';

// React component, row of the leaderboard
function Row({name, points}){

  return(
    <TableRow>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">{points}</TableCell>
    </TableRow>
  );
}

export default function Leaderboard() {

  const [users, setUsers] =  useState(null);

  // only happens once
  useEffect(() => {

    // set users only once the API call comes back
    const getData = async () => {
      const response = await axios.get('http://localhost:8080/api/users');

        setUsers(response.data.data);
    }

    try{
      getData();
    }
    catch(err){
      console.log(err);
    }

  },[]);

  // only happens once state has updated
  if(users)
  {
    var usernames = Object.keys(users);

    // entries: username, name, points
    var entries = usernames.map(function(u) {return [u, users[u].name, users[u].points]});

    // sort leaderboard
    entries.sort(function(first, second) {return second[2] - first[2]});
  }
  
  return (
    <Box height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box display="flex" width="30vw">
            <img src={leaderboardImg} className="leaderboard-image" alt = "welcome" width="100%"/>
      </Box>
      <Box width = "30%">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><h3>username</h3></TableCell>
                <TableCell align="center"><h3>points</h3></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && entries.map((e) => <Row key={e[0]} name={e[1]} points={e[2]}/>)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Link to="/homepage">
        <Button variant="outlined" sx={{mt: "3vh"}}>Back</Button>
      </Link>
    </Box>
    );

}