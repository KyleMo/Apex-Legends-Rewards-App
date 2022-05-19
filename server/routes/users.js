import express from 'express'
import { registerUser, authUser, registerLinkedAccount } from '../controllers/userControllers.js'
const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(authUser)
router.route("/linkaccount").post(registerLinkedAccount)


export default router;
