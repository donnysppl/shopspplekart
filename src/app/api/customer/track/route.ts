import { NextRequest, NextResponse } from "next/server";
import type { NextApiResponse } from 'next';
 
type ResponseData = {
  message: string
}
interface ApiResponse {
    Authorization: string;
}

export async function POST(req: NextRequest,res: NextApiResponse<ResponseData>){
    res.setHeader('Cache-Control', 'public, max-age=60')
    try {
        const { phone, trackingid } = await req.json();
        const phoneLen = phone.length;
        const trackingLen = trackingid.length;

        console.log({ phone, trackingid ,phoneLen,trackingLen})

        if (phoneLen !== 10 || trackingLen !== 14) {
            return NextResponse.json({
                status: 400,
                message: "Enter Data Properly",
            }, { status: 400 })
        }
        else {
            const loginFetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'HTTP_X_MERCHANT_CODE': 'SPL',
                    'Authorization': `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
                    'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ALLOW_ORIGIN}`,
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, HTTP_X_MERCHANT_CODE',
                }
            });
            const responseData = await loginFetch.json() as ApiResponse;

            const bearerToken = responseData.Authorization;

            if (loginFetch.status === 200) {
                const apifetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/shipments/track`, {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ALLOW_ORIGIN}`,
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, HTTP_X_MERCHANT_CODE',
                        'Authorization': `${bearerToken}`,
                        'Content-Type': 'application/json',
                        'HTTP_X_MERCHANT_CODE': 'SPL',
                    },
                    body: JSON.stringify({ "tracking_ids": [`${trackingid}`] })
                });

                const responseData = await apifetch.json();

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
            }
            else if (loginFetch.status === 401) {
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