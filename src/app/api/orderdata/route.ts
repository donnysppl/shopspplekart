
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

        const searchParams = req.nextUrl.searchParams;
        // console.log(searchParams)

        const page = searchParams.get('page');
        const limit = searchParams.get('limit');
        const search = searchParams.get('search');
        const status = searchParams.get('status');

        const apifetch = await fetch(`${process.env.NEXT_PUBLIC_ORDER_LINK}/api/order/limit?page=${page ? page : 1}&&limit=${limit ? limit : 10}&&search=${search}&&status=${status}`, {
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
        return NextResponse.json(responseData, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }

}