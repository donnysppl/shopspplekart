import EkartShip from '@/models/ekartShipment';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req:NextRequest){
    try {
        await connect();
        const { sourcedata , destinationdata, shipmentItemDetail ,response, request_id} = await req.json();

        const newEkartData = new EkartShip({ sourcedata , destinationdata, shipmentItemDetail ,response, 
            requestID: request_id, 
            trackingID: response[0].tracking_id,
            status: response[0].status 
        })

        const saveEkartData = await newEkartData.save();
        console.log(saveEkartData)

        return NextResponse.json({
            status: 200,
            message: 'Ekart Data created Successfully',
            success: true,
            result: saveEkartData,
        }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}