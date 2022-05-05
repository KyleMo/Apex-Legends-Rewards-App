const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const gameDataRouter = require('./routes/gameData.js')
const PORT = process.env.PORT || 8080;
require('dotenv').config();
//const cors = require('cors');



//app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build'))

app.get('/data',(req,res) => {
  //const platform = 'origin';
  //const platformUserIdentifier = 'chaoticbutpc';

  const passedPlatform = req.query.platform;
  const passedUsername = req.query.username;

  axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${passedPlatform}/${passedUsername}/sessions`,{
    headers: {"TRN-Api-Key": process.env.REACT_APP_RAPID_API_KEY}
  })
    .then(response => {
      //console.log(response.data.data.items)
      let matches = []
      const sessions = response.data.data.items;
      for (let i = 0; i < sessions.length; i++){
        for (let j =0; j < sessions[i].matches.length; j++)
          if (matches.length < 15){
            matches.push(sessions[i].matches[j]);
        }
      }
      res.json(matches) //This should be pushing the data to the user
    })
    .catch(error => {
      res.json(error)
    });
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
