import {Router} from 'express'
import AuthController from "../controllers/auth"
import { validateAndSanitize } from "../middlewares/validation"
import { registerSchema, loginSchema } from "../middlewares/validationSchema/auth"
import asyncHandler  from 'express-async-handler'


const authRoutes:Router = Router()


authRoutes.post('/register', validateAndSanitize(registerSchema) as any, asyncHandler(AuthController.register));
authRoutes.post('/login', validateAndSanitize(loginSchema) as any, asyncHandler(AuthController.login));
// authRoutes.post('/logout', AuthController.logout); // Uncomment this line if the logout method is added to AuthController

export default authRoutes;


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user.
 *     description: Registers a new user with the provided username, password, email, and an optional referral code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - password
 *               - email
 *     responses:
 *       201:
 *         description: User registration successful.
 *       400:
 *         description: Invalid request or user already exists.
 *       500:
 *         description: Server error.
 *
 * /auth/login:
 *   post:
 *     summary: Log in an existing user.
 *     description: Logs in an existing user with the provided email and password, and returns access tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User login successful.
 *       400:
 *         description: Invalid credentials.
 *       500:
 *         description: Server error.
 * 
 */