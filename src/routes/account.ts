import { Router } from 'express';
import AccountController from '../controllers/account';
import { validateAndSanitize } from '../middlewares/validation';
import { AccountSchema } from '../middlewares/validationSchema/account';
import asyncHandler from 'express-async-handler';
import { verifyJWT } from '../middlewares/verifyJwt';

const accountRoutes: Router = Router();

accountRoutes.get('/balance',verifyJWT, asyncHandler(AccountController.balance));
accountRoutes.get('/transactions', verifyJWT, asyncHandler(AccountController.fetchTransactions));
accountRoutes.post('/transfer',verifyJWT, validateAndSanitize(AccountSchema) as any, asyncHandler(AccountController.transfer));

export default accountRoutes;

/**
 * @swagger
 * /account/balance:
 *   get:
 *     summary: Get account balance
 *     description: Retrieve the balance of the authenticated user's account.
 *     tags:
 *       - Account
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved account balance.
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
 *                     balance:
 *                       type: number
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /account/transactions:
 *   get:
 *     summary: Get account transactions
 *     description: Retrieve all transactions related to the authenticated user's account.
 *     tags:
 *       - Account
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       senderId:
 *                         type: string
 *                       receiverId:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       sender:
 *                         type: object
 *                         properties:
 *                           email:
 *                             type: string
 *                           name:
 *                             type: string
 *                       receiver:
 *                         type: object
 *                         properties:
 *                           email:
 *                             type: string
 *                           name:
 *                             type: string
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /account/transfer:
 *   post:
 *     summary: Transfer funds
 *     description: Transfer funds from the authenticated user's account to another user's account.
 *     tags:
 *       - Account
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiversId:
 *                 type: string
 *                 description: The ID of the receiver's account.
 *               amount:
 *                 type: number
 *                 description: The amount to transfer.
 *             required:
 *               - receiversId
 *               - amount
 *     responses:
 *       200:
 *         description: Successfully transferred funds.
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
 *                     updatedSender:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         balance:
 *                           type: number
 *                     updatedReceiver:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         balance:
 *                           type: number
 *                     transaction:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         senderId:
 *                           type: string
 *                         receiverId:
 *                           type: string
 *                         amount:
 *                           type: number
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *       400:
 *         description: Bad request, invalid input.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */