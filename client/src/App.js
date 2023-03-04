
import { Button } from '@mui/material';
import { useState } from "react";
import './App.css';
import Homepage from './pages/Homepage';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Spell from './pages/Spell';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/homepage" element={<Homepage/>}></Route>
          <Route path="/leaderboard" element={<Leaderboard/>}></Route>
          <Route path="/spell" element={<Spell/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
