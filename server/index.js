
import express from 'express'
import path from 'path'
import dataRoute from './routes/gameData.js'
import {} from 'dotenv/config'
import {fileURLToPath} from 'url'

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/data', dataRoute)
app.use('/api/users', userRoutes);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
