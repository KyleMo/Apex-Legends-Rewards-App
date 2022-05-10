const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const gameDataRouter = require('./routes/gameData.js')
const PORT = process.env.PORT || 8080;
require('dotenv').config();


app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get('/data',(req,res) => {
  const passedPlatform = req.query.platform;
  const passedUsername = req.query.username;

  axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${passedPlatform}/${passedUsername}/sessions`,{
    headers: {"TRN-Api-Key": process.env.REACT_APP_RAPID_API_KEY,
              "Accept": "application/json",
              "Accept-Encoding": "gzip"}
  })
    .then(response => {
      let matches = []
      const sessions = response.data.data.items;
      for (let i = 0; i < sessions.length; i++){
        for (let j =0; j < sessions[i].matches.length; j++)
          if (matches.length < 15){
            matches.push(sessions[i].matches[j]);
        }
      }
      res.json(matches);

    })
    .catch(error => {
      res.json(error)
    });

})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
