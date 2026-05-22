import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    // console.log(req.body)
    // const { name, email, password, age } = req.body;

    try {
        const result = await userService.CreateUserIntoDb(req.body)

        console.log(result)
        res.status(201).json({
            message: "Created",
            data: result.rows[0],
        })
    } catch (error: any) {

        res.status(500).json({
            message: error.message,
            error: error
        })
    }
}

const getAllUsers =  async (req: Request, res: Response) => {


    try {
        const result = await userService.getAllUsersFromDB();
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
}

const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(id)

    try {

        const result = await userService.getSingleUserFromDB(id as string)

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
}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const { name, password, age, is_active } = req.body;

    // console.log(id);
    // console.log({name,password,age,is_active});

    try {
       
        const result = await userService.updateUserFromDB(req.body,id as string)
        

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
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await userService.deleteUserFromDB(id as string)

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
}

export const userController = {
    createUser,getAllUsers,getSingleUser,updateUser,deleteUser
}