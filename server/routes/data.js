import express from 'express'
import { getSessions, getPlayerData } from '../controllers/dataControllers.js'
const router = express.Router();

router.route('/sessions').get(getSessions)
router.route('/player').get(getPlayerData)

export default router;
