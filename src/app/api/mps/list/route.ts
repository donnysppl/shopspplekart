import { connect } from "@/dbConfig/dbConfig";
import MpsEkartShipment from "@/models/mpsekship";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        await connect();

        const fetchData = await MpsEkartShipment.find();

        if (!fetchData) {
            return NextResponse.json({
                status: 400,
                message: 'Not found',
            }, { status: 400 })
        }
        return NextResponse.json({
            status: 200,
            message: 'Success', result: fetchData
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }

}