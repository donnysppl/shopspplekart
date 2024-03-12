import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

interface resp{
    status:Number,
    message:String,
    result:any
}
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
    try {
        const apifetch = await fetch(`${process.env.NEXT_PUBLIC_ORDER_LINK}/api/ekartcon/orderlist`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ALLOW_ORIGIN}`,
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, HTTP_X_MERCHANT_CODE',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
        })
        const responseData = await apifetch.json() as resp;
        // console.log(responseData);
        return NextResponse.json({
            status: 200,
            message: 'Success' , result: responseData.result
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }

}