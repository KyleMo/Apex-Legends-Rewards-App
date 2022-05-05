const express = require('express');
const path = require('path');
const router = express.Router();

//Make api request to Tracker.gg then pass data to front end
//I still need to add the '/data' route to the search form butotn on front end


router.get('/data',(req,res) => {
  const platform = 'origin';
  const platformUserIdentifier = 'chaoticbutpc';
  axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${platformUserIdentifier}/sessions`,{
    headers: {"TRN-Api-Key": "c3156608-1896-4485-87ce-37a467e40a42"}
  })
    .then(response => {
      res.json(response.data) //This should be pushing the data to the user
    })
    .catch(error => {
      console.log(error)
    });
})

/*
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')) //if i were to run my app from outside the Gaming Project dir, this line would still allow the app to run
app.use(express.static("public"));                                       // __dirname refers to the current dir of index.js

app.get('/', (req, res) => {
  res.render('homepage.ejs') // by default render looks in the views folder
})

app.get('/g/:game', (req, res) => {
  //const {game} = req.params
  let gameTitle = "";
  if(req.params.game.includes("-")){
    gameTitle = req.params.game
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  else {
    gameTitle = req.params.game;
  }

  res.render('homepage.ejs', {"game": gameTitle}) // by default render looks in the views folder
})
*/
/*
 Practice stuff with Colt Steele's learning course

 app.get('/r/:subreddit', (req, res) => {
   const {subreddit} = req.params;
   res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
 })

 app.get('/r/:subreddit/:postID', (req, res) => {
   const {subreddit, postID} = req.params;
   res.send(`<h1>Viewing post ${postID} on the ${subreddit} subreddit</h1>`)
 })

 app.get('/search', (req, res) => {
   const { q } = req.query;
   res.send(`<h1>Query is ${q}</h1>`)
 })

 app.get('/cats', (req, res) => {
   res.send("meow")
 })

 app.post('/cats', (req, res) => {
   res.send("Post request to /cats!")
 })

 app.get('/dogs', (req, res) => {
   res.send('woof')
 })

  app.get('*', (req, res) => { // captures all . This needs to be put last because routes are matched in order
    console.log(`I dont know that path`)
 })
*/
