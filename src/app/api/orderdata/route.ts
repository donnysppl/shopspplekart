import fetch from 'node-fetch';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apifetch = await fetch(`${process.env.NEXT_PUBLIC_ORDER_LINK}/api/ekartcon/orderlist`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ALLOW_ORIGIN}`,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json',
            },
        });
        const responseData = await apifetch.json() as any;

        return NextResponse.json({
            status: 200,
            message: 'Success',
            success: true,
            result: responseData.result as any,
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}