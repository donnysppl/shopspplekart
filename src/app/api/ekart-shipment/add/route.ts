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

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    try {
        await connect();

        const searchParams = req.nextUrl.searchParams;
        const orderQuery = searchParams.get('order');

        const newQuery = searchParams.get('new');

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
        // console.dir(data.services[0].service_details[0].service_data);
        console.log(apifetch, responseData)

        if (apifetch.status === 200) {

            let newEkartShipData;

            if (orderQuery) {
                newEkartShipData = new EkartShip({ ekartarray: data, resultarray: responseData, trackingid: responseData.response[0].tracking_id, orderid: orderQuery })

                // order id : "65be1a7fcd5ad5a23f0c87f6"    
                await fetch(`${process.env.NEXT_PUBLIC_ORDER_LINK}/api/ekartcon/orderlist/${orderQuery}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ORDER_LINK}`,
                        'Access-Control-Allow-Headers': 'Content-Type',
                    },
                    body: JSON.stringify(newEkartShipData),
                });
            }
            else {
                newEkartShipData = new EkartShip({ ekartarray: data, resultarray: responseData, trackingid: responseData.response[0].tracking_id, orderid: newQuery })
            }

            await newEkartShipData.save();

            return NextResponse.json({
                status: 200,
                message: 'Ekart Shipment Created successfully ' + responseData.response[0].status,
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