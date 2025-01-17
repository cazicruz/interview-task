import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { verifyJWT } from './middlewares/verifyJwt';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './middlewares/logEvents';
import redisClient from './redisClient';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config()

const app = express();
const port = process.env.PORT


const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'API Documentation for the application',
      },
      servers: [
          {
              url: `process.env.SERVER_URL`,
          },
      ],
      components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-access-token',
                },
            },
        },
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api', rootRouter)
export const prismaClient = new PrismaClient({
    log: ['query'],
    
})

//ERROR HANDLING

// Error-handling middleware
app.use(errorHandler);
// app.use((err: Error, req: Request, res: Response, next: Function) => {
//   console.error(err.stack);
//   res.status(500).json({ error: err.message || 'Internal Server Error' });
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
