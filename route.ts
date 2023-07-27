import { connect } from "@/dbConfig/dbConfig";
import Admin from '@/models/admin';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

export async function POST(req : NextRequest) {

    const { username, email, password } = await req.json();
     console.log({ username, email, password });
    try {
        await connect()
        const { username, email, password } = await req.json();
        console.log({ username, email, password });

        // check the user 
        const userExist = await Admin.findOne({ email });

        if (userExist) {
            return NextResponse.json({
                status: 400,
                message: 'Admin already exists',
            }, { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // add user
        const newUser = new Admin({ username, email, password : hashedPassword })
        const saveUser = await newUser.save();
        console.log(saveUser)

        return NextResponse.json({
            status: 200,
            message: 'Admin created Successfully',
            success: true,
            result: saveUser,
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}