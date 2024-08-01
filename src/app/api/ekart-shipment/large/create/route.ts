import MpsEkartShipment from '@/models/mpsekship';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import fetch from 'node-fetch';

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { sourcedata, destinationData, globalData, productData, amount_to_collect, globaltrackingid, data } = await req.json();
        const authorizationHeader = req.headers.get('authorization');

        const apifetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments/large/create`, {
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
        const responseData = await apifetch.json() as any;

        if (apifetch.status === 200) {

            const failedShipments = [] as any;

            responseData.response.forEach((shipment: any) => {
                if (shipment.status === 'REQUEST_REJECTED') {
                    console.log(shipment.status === 'REQUEST_REJECTED','REQUEST_REJECTED')
                    failedShipments.push(shipment);
                }
            })
            if (failedShipments.length > 0) {
                return NextResponse.json({
                  status: 207,
                  result: failedShipments
                }, { status: 207 });
              }

            const newRecord = new MpsEkartShipment({
                sourcedata: sourcedata,
                destinationData: destinationData,
                globalData: globalData,
                productData: productData,
                globaltrackingid: globaltrackingid,
                response: responseData,
                amount_to_collect: parseInt(amount_to_collect)
            })
            await newRecord.save();
            return NextResponse.json({
                status: 200, result: responseData
            }, { status: 200 })
        }
        else if (apifetch.status === 400) {
            return NextResponse.json({
                status: 400, result: responseData
            }, { status: 400 })
        }
        else {
            return NextResponse.json({
                status: apifetch.status, result: responseData
            }, { status: apifetch.status })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}