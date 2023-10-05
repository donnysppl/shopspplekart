import EkartShip from '@/models/ekartShipment';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";


export async function GET(req:NextRequest){
    try {
        await connect();
        const data = await EkartShip.find();

        if(!data){
            return NextResponse.json({
                status: 400,
                message: 'Ekart Data Empty',
                success: true,
            }, { status: 200 })
        }
        
        return NextResponse.json({
            status: 200,
            message: 'Ekart Data ',
            success: true,
            result: data,
        }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}