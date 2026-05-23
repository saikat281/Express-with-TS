import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken"
import config from "../../config";

const loginUserIntoDB = async(payload:any)=>{

    const {email,password} = payload;

    //1.User exists or not
    //2.matching password
    //3.Generate token

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[email])


    if(userData.rowCount === 0){
         throw new Error("Invalid Credantiaals")
    }
    const user = userData.rows[0]
    const matchPassword = await bcrypt.compare(password,user.password)
    console.log(matchPassword)
    if(!matchPassword){
        throw new Error("Invalid Credantiaals")
    }

    // generate token 

    const jwtPayload = {
        id: user.id,
        name:user.name,
        is_active : user.is_active,
        email:user.email
    }

    const accessToken = jwt.sign(jwtPayload,config.secret,{
        expiresIn:"1d"
    })

    return {accessToken};
}

export const authService = {
    loginUserIntoDB,
}