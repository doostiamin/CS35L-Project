import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, TextField, Avatar, Chip} from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react'
import leaderboardImg from '../assets/leaderboard.png';
import { createAvatar } from '@dicebear/core';
import { miniavs } from '@dicebear/collection';

// React component, row of the leaderboard
function Row({name, points}){
  return(
    <TableRow sx={{borderTop: '2px solid #fff'}}>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">{points}</TableCell>
    </TableRow>
  );
}

export default function Leaderboard() {

  const [users, setUsers] =  useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const handleSearch = async () => {
      try {
          const response = await axios.get(`http://localhost:8080/api/users/${searchTerm}/points`);
          const result = response.data;

          if (result.success) {
              setSearchResult({name: result.data.name, points: result.data.points});
          } else {
              setSearchResult({});
          }
      } catch (error) {
          setSearchResult({});
      }
  };

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
    <Box sx={{background: 'url("beehive2.jpg")', backgroundSize: 'cover'}}>
      <Box height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{backgroundColor: 'rgba(255,255,255,0.5)', p: 4}}>
        <Box display="flex" width="30vw">
              <img src={leaderboardImg} className="leaderboard-image" alt = "leaderboard" width="100%"/>
        </Box>
        <Box textAlign="center" mb={2}>
            <Typography variant='h5' mb={1} my={2}>Search for a friend!</Typography>
            <Box display="flex" gap={2} flexDirection={'column'}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={1}>
                  <Avatar sx={{ width: 96, height: 96, backgroundColor: Object.keys(searchResult).length > 0 && '#fff'}} src={Object.keys(searchResult).length > 0 && createAvatar(miniavs, {seed: searchResult.name, flip: true}).toDataUriSync()}></Avatar>
                  <Box display={'flex'} gap={1} alignItems={'center'}>
                    <Typography variant='h6'>{Object.keys(searchResult).length > 0 ? searchResult.name : 'Not Found'}</Typography>
                    {Object.keys(searchResult).length > 0 && <Chip size='small' label={searchResult.points + ' pts'} color={'primary'} />}
                  </Box>
                </Box>
                <Box display="flex" flexDirection={'column'} gap={1} justifyContent={'center'}>
                    <TextField id="input" 
                                type="input" 
                                placeholder="Username" 
                                size='small'
                                fullWidth
                                onChange={(e) => (setSearchTerm(e.target.value))}
                    />
                    <Button variant="contained" 
                    size='small'
                    fullWidth
                    onClick={() => handleSearch()}
                    >find</Button>
                </Box>
            </Box>
        </Box>

        <Box width = "30%">
          <TableContainer sx={{border: '2px solid #fff'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><Typography variant='h5' fontWeight={900}>Name</Typography></TableCell>
                  <TableCell align="center"><Typography variant='h5' fontWeight={900}>Points</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && entries.map((e) => <Row key={e[0]} name={e[1]} points={e[2]}/>)}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Link to="/homepage" style={{textDecoration: 'none'}}>
          <Button variant="contained" sx={{mt: "3vh"}}>Back</Button>
        </Link>
      </Box>
    </Box>
    );

}