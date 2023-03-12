const express = require('express');
const fs = require('fs');
const cors = require('cors');

const USERS_DATA_FILE_PATH = './data/users.json';
const PORT = 8080;
const WHITELIST = ['http://localhost:3000'];
const CORS_OPTIONS = {
  origin: (origin, cb) => {
    if(origin && WHITELIST.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}

const app = express();

// set up CORS
app.use(cors(CORS_OPTIONS));

// For parsing application/json
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    version: 1.0,
    app: 'Spelling Bee'
  })
});


/////////////////////////////////
//     User Management API     //
/////////////////////////////////

// Get list of all users
app.get('/api/users', (req, res) => {
  let {success, data: users} = getUsers();

  if(!success) res.status(500);

  res.json({
    success: success,
    data: users
  });
});

// Add/update user to database
app.post('/api/users', (req, res) => {
  let data = {
    success: false,
    message: "Unable to extract 'user' and/or 'info' from request body"
  }
  
  if(req.body.user && req.body.info) {
    const {user, info} = req.body;

    let {success} = updateUser(
      user,
      info
    );

    data = {success: success}
  } else {
    res.status(400);
  }

  res.json(data);
});

// Get points of a specific user 
app.get('/api/users/:name/points', (req, res) => {
  const name = req.params.name;
  let {success, data: users} = getUsers();

  if(!success) res.status(500);

  if(users.hasOwnProperty(name)) {
    res.json({
      success: true,
      data: users[name].points
    });
  } else {
    res.json({
      success: false,
      message: `User '${name}' not found`
    });
  }
});

/////////////////////////////////
//         Server Setup        //
/////////////////////////////////
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});


/////////////////////////////////
//       Helper Functions      //
/////////////////////////////////
const getUsers = () => {
  let data = {};
  let success = false;

  if(fs.existsSync(USERS_DATA_FILE_PATH)){
    let raw = fs.readFileSync(USERS_DATA_FILE_PATH);
    data = JSON.parse(raw);
    success = true;
  }

  return {success, data}
}

const updateUser = (user, updatedData) => {
  let success = false;

  if(fs.existsSync(USERS_DATA_FILE_PATH)) {
    // read the file
    let raw = fs.readFileSync(USERS_DATA_FILE_PATH);
    let users = JSON.parse(raw);
  
    users[user] = {...users[user], ...updatedData};

    // update the file
    fs.writeFileSync(USERS_DATA_FILE_PATH, JSON.stringify(users, null, 2));
    
    success = true;
  }

  return {success}
}