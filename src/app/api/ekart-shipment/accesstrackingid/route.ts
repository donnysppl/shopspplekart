import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import EkartShip from '@/models/ekartShipment';

export async function GET(req: NextRequest) {
    try {
        await connect();
        const oldData = (await EkartShip.find().select('resultarray')).reverse();

        const lattestid = `${oldData[0].resultarray[0].response[0].tracking_id}`;
        

        return NextResponse.json({
            status: 200,
            message: 'success', result : lattestid
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}