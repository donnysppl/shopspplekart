import EkartShip from '@/models/ekartShipment';
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import fetch from 'node-fetch'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();

        const ekartData = await EkartShip.find({ orderid: params.id })

        console.log(ekartData)

        // order id : "65be1a7fcd5ad5a23f0c87f6"    
        const apifetch = await fetch(`${process.env.NEXT_PUBLIC_ORDER_LINK}/api/ekartcon/orderlist/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ORDER_LINK}`,
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify(ekartData),
        });

        const responseData = await apifetch.json() as any;

        if(responseData.status !== 200){
            return NextResponse.json({
                status: 400,
                message: responseData.message,
            }, { status: 400 })
        }

        return NextResponse.json({
            status: 200,
            message: 'success', ekartData
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}