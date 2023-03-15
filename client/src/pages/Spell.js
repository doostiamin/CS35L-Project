import { Box, DialogContent, IconButton, Alert, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import data from '../data-objects.json';
import { UserContext } from "./UserContext";
import axios from 'axios';
import spellImg from '../assets/spell.png';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import InfoIcon from '@mui/icons-material/Info';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const boxDefault = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "60vw",
    alignItems: "center",
    gap: 2,
}

export default function Spell(props) {

    const value = useContext(UserContext);
    const location = useLocation();

    //getting words list from data-objects.json
    let easyWords = Object.keys(data.easy);
    let intermediateWords = Object.keys(data.intermediate);
    let difficultWords = Object.keys(data.difficult);
    let categoryWords = [];
    let categoryEasy = [];
    let categoryIntermediate = [];
    let categoryDifficult = [];

    //initializing word lengths
    let easyLength = easyWords.length;
    let intermediateLength = intermediateWords.length;
    let difficultLength = difficultWords.length;
    let categoryLength = categoryWords.length;

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
    //challenge dialog states
    const [openChallengeFail, setOpenChallengeFail] = useState(false);

    //word states
    let firstWord = wordSet[0];
    const [word, setWord] = useState(wordSet[0]);
    const [type, setType] = useState(difficulty[firstWord].type);
    const [definition, setDefinition] = useState(difficulty[firstWord].definition);
    const [audio, setAudio] = useState(difficulty[firstWord].audio);
    const [pts, setPts] = useState(difficulty[firstWord].points);
    
    const [wordCount, setWordCount] = useState(1);
    const [streak, setStreak] = useState(0);

    const [pointsAdded, setPointsAdded] = useState(0);

    
    function getCategory(state) {
        //getting state words from easy
        for(let i = 0; i < easyLength; i++) {
            let w = data.easy[easyWords[i]];
            let wordCategories = w.categories;
            for (let j = 0; j < wordCategories.length; j++) {
                if (wordCategories[j] === state) {
                    categoryWords.push(easyWords[i]);
                    categoryEasy.push(easyWords[i]);
                }
            }
        }
        //getting state words from intermediate
        for(let i = 0; i < intermediateLength; i++) {
            let w = data.intermediate[intermediateWords[i]];
            let wordCategories = w.categories;
            for (let j = 0; j < wordCategories.length; j++) {
                if (wordCategories[j] === state) {
                    categoryWords.push(intermediateWords[i]);
                    categoryIntermediate.push(intermediateWords[i]);
                }
            }
        }
        //getting state words from difficult
        for(let i = 0; i < difficultLength; i++) {
            let w = data.difficult[difficultWords[i]];
            let wordCategories = w.categories;
            for (let j = 0; j < wordCategories.length; j++) {
                if (wordCategories[j] === state) {
                    categoryWords.push(difficultWords[i]);
                    categoryDifficult.push(difficultWords[i]);
                }
            }
        }
        return(categoryWords);
    }

    function getCategoryWord(index) {
        let nextWord = categoryWords[index];
        //search for word in easyWords
        for (let i = 0; i < categoryEasy.length; i++) {
            if (nextWord === categoryEasy[i]) {
                return(data.easy);
            }
        }
        //search for word in intermediateWords
        for (let i = 0; i < categoryIntermediate.length; i++) {
            if (nextWord === categoryIntermediate[i]) {
                return(data.intermediate);
            }
        }
        //search for word in difficultWords
        for (let i = 0; i < categoryDifficult.length; i++) {
            if (nextWord === categoryDifficult[i]) {
                return(data.difficult);
            }
        }
    }

    //shuffles words in array list
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    //getting the word state
    function loadWords(param) {
        //loading by difficulty
        if (param === "easy") {
            shuffle(easyWords);
            return(easyWords);
        }
        else if (param === "intermediate") {
            shuffle(intermediateWords);
            return(intermediateWords);
        }
        else if (param === "difficult") {
            shuffle(difficultWords);
            return(difficultWords);
        }
        //getting all category words
        else if (param === "general" || param === "challenge") {
            let general = getCategory("general")
            shuffle(general);
            categoryLength = categoryWords.length;
            return(general);
        }
        else if (param === "foods") {
            let foods = getCategory("foods")
            shuffle(foods);
            categoryLength = categoryWords.length;
            return(foods);
        }
        else if (param === "animals") {
            let animals = getCategory("animals")
            shuffle(animals);
            categoryLength = categoryWords.length;
            return(animals);
        }
    }

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
        //if not difficulty level, it's category based
        else {
            return(categoryLength);
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
        if (param === "general" || param === "challenge") {
            return(getCategoryWord(0));
        }
        if (param === "animals") {
            //FIXME (change this later)
            return(getCategoryWord(0));
        }
        if (param === "foods") {
            //FIXME (change this later)
            return(getCategoryWord(0));
        }
    }

    //dialog states
 
    const handleCloseCorrect = () => {
        setAnswer("");
        setOpenCorrect(false);
        nextWord();
    };

    const handleCloseIncorrect = () => {
        setOpenIncorrect(false);
    };

    const handleCloseChallengeFail = () => {
        setOpenChallengeFail(false);
        setStreak(0);
    };
    
    const handleCloseDefinition = () => {
        setOpenDefinition(false);
    }

    function addPoints (p) {
        // update in front
        value.setPoints(value.points + p);
        setPointsAdded(p);

        // update in back
        axios.post('http://localhost:8080/api/users', {user: value.uname, info: {"name": value.n, "points": value.points + p}})
        .then(function (response) {
        if(response.data.success){
            console.log("gave user ", value.uname, " ", p, " points");
        }
        }).catch(err=>{
            console.error(err);
        })
    }

    function checkCorrect() {
        if (answer.toLowerCase().trim() === word.toLowerCase().trim()) {
            setOpenCorrect(true);
            addPoints(pts);   
            setStreak(streak + 1); 
        }
        else {
            if (state === "challenge") {
                setOpenChallengeFail(true);
            }
            else {
                setOpenIncorrect(true);
            }                
        }
    }

    function nextWord() {
        let nextWord;
        let set;
        //for difficulty
        if(state === "easy" || state === "intermediate" || state === "difficult") {
            set = difficulty;
            nextWord = wordSet[wordCount];
        }

        else {
            nextWord = categoryWords[wordCount];
            set = getCategoryWord(wordCount);
        }

        setAnswer("");
        setWord(nextWord);
        setDefinition(set[nextWord].definition);
        setType(set[nextWord].type);
        setAudio(set[nextWord].audio);
        setPts(set[nextWord].points);

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

    return ( <>
        <Dialog
            open={openDefinition}
            onClose={handleCloseDefinition}>
            <DialogContent>
                <Typography variant='h6'>{type}</Typography>
                <Typography variant='body1'>{definition}</Typography>
            </DialogContent>
        </Dialog>

        <Box sx={{background: 'url("beehive2.jpg")', backgroundSize: 'cover'}}>
            <Box id="spell" sx={{backgroundColor: 'rgba(255,255,255,0.5)'}}>
                <Box sx={{display: "flex", flexDirection: "column", width: 1, height: "100vh", alignItems: "center", justifyContent: "center"}}>
                    <Box sx={boxDefault}>
                        <Box display="flex" width="30vw">
                            <img src={spellImg} className="spell-image" alt = "spell" width="100%"/>
                        </Box>

                        <Box display={'flex'} flexDirection={'column'}>
                            <Box display={'flex'} justifyContent={'space-around'}>
                                {!openCorrect ? <>
                                    <Link to="/homepage">
                                        <IconButton size='large' color='primary'>
                                            <ArrowBackIcon fontSize='large' />
                                        </IconButton>
                                    </Link>
                                    <IconButton size='large' color='primary' onClick={playAudio}>
                                        <PlayCircleIcon fontSize={'large'} />
                                    </IconButton>

                                    <IconButton size='large' color='primary' onClick={() => setOpenDefinition(true)}>
                                        <InfoIcon fontSize='large' />
                                    </IconButton>

                                    <IconButton size='large' color='primary' onClick={() => nextWord()}>
                                        <SkipNextIcon fontSize='large' />
                                    </IconButton>
                                </> : <>
                                    <IconButton size='large' color='primary' onClick={() => handleCloseCorrect()}>
                                        <ArrowForwardIcon fontSize='large' />
                                    </IconButton>
                                </>}
                            </Box>
                            <Box display={'flex'} gap={1} mt={2}>
                                <TextField id="standard-basic" size='small' label="Answer" variant="outlined" value={answer} onChange={(answer) => setAnswer(answer.target.value)}/>
                                <Button variant="contained" onClick={() => checkCorrect()}>Check!</Button>
                            </Box>

                            <Snackbar open={openCorrect}>
                                <Alert sx={{width: '20vw', mt: 2}} severity={'success'} variant={'filled'}>
                                    {'You got it right! +' + pointsAdded + 'pts' }
                                </Alert>
                            </Snackbar>

                            <Snackbar open={openIncorrect} autoHideDuration={5000} onClose={() => {handleCloseIncorrect()}}>
                                <Alert onClose={handleCloseIncorrect} severity={'error'} variant={'filled'}>
                                    Not quite, try again!
                                </Alert>
                            </Snackbar>

                            <Snackbar open={openChallengeFail} autoHideDuration={5000} onClose={() => {handleCloseChallengeFail()}}>
                                <Alert onClose={handleCloseChallengeFail} severity={'error'} variant={'filled'}>
                                    {`Good try! Your total streak: ${streak}`}
                                </Alert>
                            </Snackbar>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>);
}
