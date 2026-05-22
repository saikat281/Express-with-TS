import express, { type Application, type Request, type Response } from "express"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"
const app: Application = express()


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


app.use('/api/users',userRoute)






app.get('/api/users', async (req: Request, res: Response) => {


    try {
        const result = await pool.query(`
       SELECT * FROM users 
        `)
        res.status(200).json({
            success: true,
            message: "Users retrived successfully",
            data: result.rows
        })

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })

    }
})

app.get('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(id)

    try {

        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [id])
        // console.log(result)

        if (result.rowCount === 0) {

            res.status(404).json({
                success: false,
                message: "User Not Found"

            })

        }
        res.status(200).json({
            success: true,
            message: "Users retrived successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

app.put('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;

    // console.log(id);
    // console.log({name,password,age,is_active});

    try {
        // COALESCE : kono ekta value null/undefined pathale database er ager value tai return kore
        const result = await pool.query(`
       UPDATE users 
       SET 
       name=COALESCE($1 ,name), 
       password=COALESCE($2 ,password),
       age=COALESCE($3 ,age),
       is_active=COALESCE($4 ,is_active)
        WHERE 
        id=$5 
        RETURNING *
        `, [name, password, age, is_active, id])

        if (result.rowCount === 0) {

            res.status(404).json({
                success: false,
                message: "User Not Found"

            })

        }

        res.status(200).json({
            success: true,
            message: "Users Updated successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.delete('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
       DELETE FROM users WHERE id=$1 
        `, [id])

        if (result.rowCount === 0) {

            res.status(404).json({
                success: false,
                message: "User Not Found"

            })

        }

        res.status(200).json({
            success: true,
            message: "Users Updated successfully",
            data: {}
        })


    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
})

export default app
