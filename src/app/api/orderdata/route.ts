import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from 'mongodb';

export async function GET(req: NextRequest) {
    const url = process.env.MONGODB_URL_ORDER as string;

    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Specify the database and collection
        const db = client.db('shopsppl');
        const collection = db.collection('productorders');

        // Fetch data from the collection
        const result = await collection.find({}).toArray();

        // Send the retrieved data as the API response
        //   res.status(200).json(result);
        return NextResponse.json({
            status: 200,
            message: 'Success',
            success: true,
            result: result,
        }, { status: 200 })
    } catch (error) {
        //   console.error('Error fetching data:', error);
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    } finally {
        // Close the MongoDB client
        await client.close();
    }



    // try {
    //     const url = process.env.MONGODB_URL_ORDER as string;

    //     let resultData:any[] = [];
    //     MongoClient.connect(url, function(err:any, db:any) {
    //         if (err) throw err;
    //         var dbo = db.db("shopsppl");
    //         //Find all documents in the customers collection:
    //         dbo.collection("productorders").find({}).toArray(function(err:any, result:any) {
    //           if (err) throw err;
    //           resultData = result;
    //           db.close();
    //         });
    //       });


    //     // const apifetch = await fetch(`${process.env.NEXT_PUBLIC_ORDER_LINK}/api/ekartcon/orderlist`, {
    //     //     method: 'GET',
    //     //     headers: {
    //     //         'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_ALLOW_ORIGIN}`,
    //     //         'Access-Control-Allow-Headers': 'Content-Type',
    //     //         'Content-Type': 'application/json',
    //     //         'Cache-Control': 'no-store',
    //     //     },

    //     // });
    //     // const responseData = await apifetch.json() as any;





    //     return NextResponse.json({
    //         status: 200,
    //         message: 'Success',
    //         success: true,
    //         result: resultData as any,
    //     }, { status: 200 })
    // } catch (error) {
    //     console.log(error)
    //     return NextResponse.json({
    //         status: 500,
    //         message: 'Somthing went wrong ' + error,
    //     }, { status: 500 })
    // }
}