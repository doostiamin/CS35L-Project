import { React, useState } from "react";
import './App.css';
import Homepage from './pages/Homepage';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Spell from './pages/Spell';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {UserContext} from './pages/UserContext.js';


function App() {

  const [uname, setUname] = useState("");
  const [n, setN] = useState("");
  const [points, setPoints] = useState(0);

  const value = { uname, setUname, n, setN, points, setPoints };

  return(
    <UserContext.Provider value = {value}>
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
    </UserContext.Provider>
  );
}

export default App;
