import { NextRequest, NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function POST(req: NextRequest) {
    try {

        const data = await req.json();
        const trackingId = data.tracking_ids[0];
        const authorizationHeader = req.headers.get('authorization');

        const apifetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/shipments/track`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ALLOW_ORIGIN}`,
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, HTTP_X_MERCHANT_CODE',
                'Authorization': `${authorizationHeader}`,
                'Content-Type': 'application/json',
                'HTTP_X_MERCHANT_CODE': 'SPL',
            },
            body: JSON.stringify(data)
        });

        const responseData = await apifetch.json()

        if (apifetch.status === 200) {
            return NextResponse.json({
                status: 200,
                message: 'Data Found',
                success: true,
                responseData,
            }, { status: 200 })
        }
        else if (apifetch.status === 400) {
            return NextResponse.json({
                status: 400,
                message: 'Bad request',
                responseData,
            }, { status: 400 })
        }
        else if (apifetch.status === 401) {
            return NextResponse.json({
                status: 401,
                message: 'User Unauthorised',
                responseData,
            }, { status: 401 })
        }
        else if (apifetch.status === 404) {
            return NextResponse.json({
                status: 404,
                message: 'Resource not found',
                responseData,
            }, { status: 404 })
        }
        else if (apifetch.status === 500) {
            return NextResponse.json({
                status: 500,
                message: 'Service is down',
                responseData,
            }, { status: 500 })
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}