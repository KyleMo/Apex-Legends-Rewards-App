
import express from 'express';
import path from 'path';
import dataRoutes from './routes/data.js';
import userRoutes from './routes/users.js'
import {} from 'dotenv/config';
import {fileURLToPath} from 'url';
import connectDB from './config/db.js'
import { notFound, errorHandler} from './middlewares/errorMiddleware.js'


const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB();

const app = express();
app.use(express.json())

app.use('/api/data', dataRoutes);
app.use('/api/users', userRoutes);
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(errorHandler)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
