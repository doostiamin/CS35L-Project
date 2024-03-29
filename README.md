# Introduction
Spelling Bee is a fun and educational word spelling game designed to test your spelling skills. The game consists of three levels of difficulty with different genres of words.

# Getting Started

Refer to the [Setup](#setup) section to start getting the project to run on your local machine. After that simply load the site and create an account. Once you have created an account, you can log in and start playing.

# How to Play

Once you have logged in, select the level of difficulty and genre of words you want to play with. The game will then start, and you will be given a word to spell via an audio cue. Listen carefully to the word and type it in the input field provided. If you spell the word correctly, you will earn points. The more words you spell correctly in a row, the higher your score will be. If you spell multiple words correctly in a row, you go on a streak. Once you get a word incorrect, you lose your streak. Once all the words are completed, you are given a score at the end.

# Leaderboard

The top scores of all players are displayed on the leaderboard. You can also search for any other user's top score using the search bar.

# Setup

> The automatic set up only works in MAC or Linux systems. If you are running windows, please refer to the [Client](#client-setup) and [Server](#server-setup) sections to set up the project manually.

To automatically set up the project, you can use the following command after cloning the repository and changing the directory to the cloned directory:

```shell
./setup
```

> Please note that there are no checks and tests being done by the `./setup` command and it is merely used for convenience. Make sure you run the `./setup` command before you make any changes to the `server` and `client` directories to ensure proper set up.
>
> Alternatively, you can refer to the [Client](#client-setup) and [Server](#server-setup) sections to set up the project manually.

# Client Setup

This project uses React as its frontend. After cloning this project into your local environment, use the following instructions in order to get the client up and going

```shell
#change directory to the client folder
cd client

#install all the dependencies needed for this project
npm i

#run the program
npm start
```

The client will start on port `3000`

# Server Setup

This project uses NodeJS as its backend. After cloning this project into your local environment, use the following instructions in order to get the server up and going

```shell
# change directory to the server folder
cd server

# install all the dependencies needed for this project
npm i

# for development (uses 'nodemon' instead of 'node' to run)
npm run dev

# for production
npm run prod
```

The server will start on port `8080` and you will see the following message print out to the command line: `listening on port 8080`
