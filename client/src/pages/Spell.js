import { Box, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import data from '../data-objects.json';
import { UserContext } from "./UserContext";
import axios from 'axios';

const boxDefault = {
    display: "flex",
    flexDirection: "column",
    justifyContents: "center",
    height: 770,
    padding: 9,
    minWidth: 600,
    m: 1,
    alignItems: "center",
    gap: 2
}

export default function Spell(props) {

    const value = useContext(UserContext);

    const location = useLocation();

    //getting words list from data-objects.json
    let easyWords = Object.keys(data.easy);
    let intermediateWords = Object.keys(data.intermediate);
    let difficultWords = Object.keys(data.difficult);

    //getting the word state
    function loadWords(param) {
        if (param === "easy") {
            return(easyWords);
        }
        if (param === "intermediate") {
            return(intermediateWords);
        }
        if (param === "difficult") {
            return(difficultWords);
        }
    }

    //initializing word lengths
    let easyLength = easyWords.length;
    let intermediateLength = intermediateWords.length;
    let difficultLength = difficultWords.length;

    function loadWordSetLengths(param) {
        if (param === "easy") {
            return(easyLength);
        }
        if (param === "intermediate") {
            return(intermediateLength);
        }
        if (param === "difficult") {
            return(difficultLength);
        }
    }

    //initializing difficulty
    function loadDifficulty(param) {
        if (param === "easy") {
            return(data.easy);
        }
        if (param === "intermediate") {
            return(data.intermediate);
        }
        if (param === "difficult") {
            return(data.difficult);
        }
    }

    //difficulty states
    let state = location.state.difficulty;
    const [wordSet, setWordSet] = useState(loadWords(state));
    const [wordSetLength, setWordSetLength] = useState(loadWordSetLengths(state));
    const [difficulty, setDifficulty] = useState(loadDifficulty(state));
    
    //Dialog states
    const [answer, setAnswer] = useState("");
    const [openCorrect, setOpenCorrect] = useState(false);
    const [openIncorrect, setOpenIncorrect] = useState(false);
    const [openDefinition, setOpenDefinition] = useState(false);


    //word states
    let firstWord = wordSet[0];
    const [word, setWord] = useState(wordSet[0]);
    const [type, setType] = useState(difficulty[firstWord].type);
    const [definition, setDefinition] = useState(difficulty[firstWord].definition);
    const [audio, setAudio] = useState(difficulty[firstWord].audio);
    const [wordCount, setWordCount] = useState(1);

    

    //dialog states
    const handleCloseCorrect = () => {
        setAnswer("");
        setOpenCorrect(false);
        nextWord();
    };

    const handleCloseIncorrect = () => {
        setOpenIncorrect(false);
    };
    
    const handleCloseDefinition = () => {
        setOpenDefinition(false);
    }

    
    function addPoints (p) {
            
        // update in front
        value.setPoints(value.points + p);

        // update in back
        axios.post('http://localhost:8080/api/users', {user: value.uname, info: {"name": value.n, "points": value.points + p}})
        .then(function (response) {
        if(response.data.success){
            console.log("gave user ", value.uname, " ", p, " points");
        }
        }).catch(err=>{
            console.log(err);
        })
    }

    function checkCorrect() {
        if (answer === word) {
            setOpenCorrect(true);
            // TODO: award points based on the word
            addPoints(10);
        }
        else {
            setOpenIncorrect(true);
        }
    }

    function nextWord() {
        let nextWord = wordSet[wordCount];
        let set = difficulty;

        setAnswer("");
        setWord(nextWord);
        setDefinition(set[nextWord].definition);
        setType(set[nextWord].type);
        setAudio(set[nextWord].audio);

        // looping back through the words if reach the end of the list
        if (wordCount + 1 < wordSetLength) {
            setWordCount(wordCount + 1);
        }
        else {
            setWordCount(0);
        }
    }

   function playAudio() {
       //format /assets/audio/audio_file.mp3
       let a = process.env.PUBLIC_URL + audio;
       new Audio(a).play()
   }

    return ( 
        <div id="spell">
            <Box sx={boxDefault}>
                <div>
                    <Dialog
                        open={openCorrect}
                        onClose={handleCloseCorrect}>
                        <DialogTitle>You Got It Right!</DialogTitle>
                        <DialogContent>
                        <Link to="/homepage">
                                <Button>Back to Homepage</Button>
                            </Link>
                            <Button onClick={handleCloseCorrect}>Next Word</Button>
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        open={openIncorrect}
                        onClose={handleCloseIncorrect}>
                        <DialogTitle>Not Quite!</DialogTitle>
                        <DialogContent>
                        <Link to="/homepage">
                                <Button>Back to Homepage</Button>
                            </Link>
                            <Button onClick={(open) => setOpenIncorrect(false)}>Try Again</Button>
                        </DialogContent>
                    </Dialog>
                    <TextField id="standard-basic" label="Answer" variant="standard" value={answer} onChange={(answer) => setAnswer(answer.target.value)}/>
                    <Button variant="contained" sx={{height:40}} onClick={() => checkCorrect()}>Enter</Button>
                </div>
                <div>
                    <Dialog
                        open={openDefinition}
                        onClose={handleCloseDefinition}>
                        <DialogContent>
                            <p>{type}</p>
                            <p>{definition}</p>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outlined" sx={{height:40}} onClick={playAudio}>Listen</Button>
                    <Button variant="outlined" sx={{height:40}} onClick={() => setOpenDefinition(true)}>Definition</Button>
                    <Button variant="outlined" sx={{height:40}} onClick={() => nextWord()}>Skip</Button>
                </div>
                <div>
                    <Link to="/homepage">
                    <Button variant="outlined" sx={{height:40}}>Back</Button>
                    </Link>
                </div>
            </Box>
        </div>
    );
}
