import {Router} from 'express'
import authRoutes from './auth'
import accountRoutes from './account'

const rootRouter:Router = Router()

rootRouter.use('/auth',authRoutes)
rootRouter.use('/account',accountRoutes)

export default rootRouter