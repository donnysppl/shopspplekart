import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const res =  NextResponse.json({
            message: "Logout successful",
            status: 200,
            success: true,
         },{status: 200,})

         
         res.cookies.set("admin-token","",{
            httpOnly:true,
            expires: new Date(0)
         });
         res.cookies.set("barear-token","",{
            httpOnly:true,
            expires: new Date(0)
         });

         cookies().delete('admin-token')
         cookies().delete('barear-token')
         return res;

    } catch (error:any) {
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 });
    }
}