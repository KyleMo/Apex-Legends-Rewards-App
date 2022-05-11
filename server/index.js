
import express from 'express'
import path from 'path'
import dataRoute from './routes/gameData.js'
import {} from 'dotenv/config'
import {fileURLToPath} from 'url'

const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)




app.use('/data', dataRoute)

app.use(express.static(path.resolve(__dirname, '../client/build')));



//(path.join(__dirname, 'path/to/your/index.html')
app.get('/*', function(req, res) {
  //path.join(__dirname, "..", "build", "index.html")
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
