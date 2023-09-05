import EkartShip from '@/models/ekartShipment';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import fetch from 'node-fetch';

interface EkartCreateResonse {
    tracking_id: string;
    shipment_payment_link: string;
    status: string;
    status_code: number;
    is_parked: string;
}

interface EkartCreateShipRes {
    response: EkartCreateResonse[];
    request_id: string;
    unauthorised?: string;
}

export async function POST(req: NextRequest) {
    try {
        await connect();

        const data = await req.json();
        const authorizationHeader = req.headers.get('authorization');

        const apifetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/shipments/create`, {
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
        const responseData = await apifetch.json() as EkartCreateShipRes;
        console.log(apifetch.status, responseData);



        if (apifetch.status === 200) {
            const newEkartShipData = new EkartShip({ ekartarray: data, resultarray: responseData })
            await newEkartShipData.save();
            return NextResponse.json({
                status: 200,
                message: 'Ekart Shipment Created successfully',
                success: true,
                result: responseData,
            }, { status: 200 })
        }
        else if (apifetch.status === 400) {
            return NextResponse.json({
                status: 400,
                message: 'Bad request',
                result: responseData,
            }, { status: 400 })
        }
        else if (apifetch.status === 401) {
            return NextResponse.json({
                status: 401,
                message: 'User Unauthorised',
                result: responseData,
            }, { status: 401 })
        }
        else if (apifetch.status === 404) {
            return NextResponse.json({
                status: 404,
                message: 'Resource not found',
                result: responseData,
            }, { status: 404 })
        }
        else if (apifetch.status === 500) {
            return NextResponse.json({
                status: 500,
                message: 'Service is down',
                result: responseData,
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