import Admin from '@/models/admin';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { email, password } = await req.json();

        console.log({ email, password })

        const userExist = await Admin.findOne({ email })
        if (!userExist) {
            return NextResponse.json({
                status: 400,
                message: 'Admin not exists',
            }, { status: 400 })
        }
        else{
            // check password
            const validPassword = await bcryptjs.compare(password, userExist.password)
            if(!validPassword){
                return NextResponse.json({
                    status: 400,
                    message: 'Wrong Password',
                }, { status: 400 })
            }
            else{
                // create a token data
                const tokenData = {
                    id: userExist._id,
                    username: userExist.username,
                    email: userExist.email
                }
                const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

                 const result = NextResponse.json({
                    message: "Login successful",
                    status: 200,
                    success: true,
                 },{status: 200,})

                 result.cookies.set("admin-token", token, {
                    httpOnly: true,
                 })
                 return result;
            }
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}