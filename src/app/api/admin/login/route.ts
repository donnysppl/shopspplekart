import Admin from '@/models/admin';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import fetch from 'node-fetch';

interface ApiResponse {
    Authorization: string; 
}

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
        else {
            // check password
            const validPassword = await bcryptjs.compare(password, userExist.password)
            if (!validPassword) {
                return NextResponse.json({
                    status: 400,
                    message: 'Wrong Password',
                }, { status: 400 })
            }
            // create a token data
            const tokenData = {
                id: userExist._id,
                username: userExist.username,
                email: userExist.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })

            const apifetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'HTTP_X_MERCHANT_CODE': 'SPL',
                    'Authorization': `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
                    'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ALLOW_ORIGIN}`,
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, HTTP_X_MERCHANT_CODE',
                }
            });
            const responseData = await apifetch.json() as ApiResponse;

            const bearerToken = responseData.Authorization;

            if(apifetch.status === 200){

                const result = NextResponse.json({
                    status: 200,
                    message: "Login successful",
                    success: true,
                    bearerToken
                }, { status: 200, })
    
                result.cookies.set("admin-token", token, {
                    httpOnly: true,
                })
                result.cookies.set("barear-token", bearerToken, {
                    httpOnly: true,
                })
                return result
            }
            else if(apifetch.status === 401){
                return NextResponse.json({
                    status: 401,
                    message: "Unauthorised invalid user credential",
                }, { status: 401 })
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