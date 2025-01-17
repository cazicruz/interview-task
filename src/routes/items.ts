import {Router} from 'express'
import AuthController from "../controllers/auth"
import { validateAndSanitize } from "../middlewares/validation"
import { AccountSchema } from "../middlewares/validationSchema/account"
import asyncHandler  from 'express-async-handler'
import { verifyJWT } from '../middlewares/verifyJwt';


const itemsRoutes:Router = Router()


itemsRoutes.put('/:id', verifyJWT, validateAndSanitize(AccountSchema) as any, asyncHandler(AuthController.register));

export default itemsRoutes;

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update user information
 *     description: Update the information of a user by their ID.
 *     tags:
 *       - Items
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the user.
 *               email:
 *                 type: string
 *                 description: The new email of the user.
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: Successfully updated user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request, invalid input.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */