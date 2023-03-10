const express = require('express');
const fs = require('fs');

const USERS_DATA_FILE_PATH = './data/users.json';
const PORT = 8080;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// USER MANAGEMENT API
app.get('/api/users', (req, res) => {
  let {error, data: users} = getUsers();

  if(error) res.status(500);

  res.json({
    success: error,
    data: users
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

// Helper Functions
const getUsers = () => {
  let data = {};
  let error = false;

  if(fs.existsSync(USERS_DATA_FILE_PATH)){
    let raw = fs.readFileSync(USERS_DATA_FILE_PATH);
    data = JSON.parse(raw);
    error = true;
  }

  return {error, data}
}