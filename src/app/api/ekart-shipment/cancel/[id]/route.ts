import EkartShip from '@/models/ekartShipment';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { EkartCreateResonse } from '@/interface/interface';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        console.log(params.id)
        const res = await req.json();
        console.log(res)
        const data = await EkartShip.findById(params.id)
        const prevDataStatus = data.resultarray[0].response[0].status;
        console.log(data.resultarray[0].response[0].status)

        const authorizationHeader = req.headers.get('authorization');
        const prevResponseData = data.resultarray[0]
        const cancelData = {
            request_id: prevResponseData.prevResponseData,
            request_details: [
                {
                    tracking_id: prevResponseData.response[0].tracking_id,
                    reason: res
                }
            ]
        }



        const apifetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/shipments/rto/create`, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ALLOW_ORIGIN}`,
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, HTTP_X_MERCHANT_CODE',
                'Authorization': `${authorizationHeader}`,
                'Content-Type': 'application/json',
                'HTTP_X_MERCHANT_CODE': 'SPL',
            },
            body: JSON.stringify(cancelData)
        });
        const responseData = await apifetch.json();
        console.log(responseData);


        if (apifetch.status === 200) {
            const updateData = await EkartShip.findByIdAndUpdate(params.id, {
                $set: { cancelarray: [cancelData],cancelResarray: [responseData]}
            })
            return NextResponse.json({
                status: 200,
                message: 'Shipment Cancel',
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