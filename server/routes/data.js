import express from 'express'
import axios from 'axios'
const router = express.Router();

//I would like to figure out how to get this to work
//router.route('/sessions').get(sessions);


router.get('/sessions',(req,res) => {

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
});

router.get('/player',(req, res) => {

  const passedPlatform = req.query.platform;
  const passedUsername = req.query.username;

  axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${passedPlatform}/${passedUsername}`,{
    headers: {"TRN-Api-Key": process.env.REACT_APP_RAPID_API_KEY,
              "Accept": "application/json",
              "Accept-Encoding": "gzip"}
  })
    .then(response => {
      const playerStats = {
        gamertag: response.data.data.platformInfo.platformUserId,
        level: response.data.data.segments[0].stats.level.displayValue,
        kills: response.data.data.segments[0].stats.kills.displayValue,
      }
      res.json(playerStats)
    })
    .catch(error => {
      res.json(error)
    });
})

export default router;
