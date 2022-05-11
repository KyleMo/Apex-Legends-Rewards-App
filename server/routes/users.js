import express from 'express'
import axios from 'axios'
const router = express.Router();

router.route("/").post(registerUser);

export default router;
