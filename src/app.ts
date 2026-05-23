import express, { type Application, type Request, type Response } from "express"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/profile/profile.route"
import { authRoute } from "./modules/auth/auth.route"
import fs from "fs"
import logger from "./middleware/logger"
const app: Application = express()


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use(logger)

app.get('/', async (req: Request, res: Response) => {
    try {
        res.status(201).json({
            message: "Express server",

        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message,
            error: error
        })
    }
})

app.use('/api/users', userRoute)

app.use('/api/profileS', profileRoute)
app.use('/api/auth', authRoute)



export default app
