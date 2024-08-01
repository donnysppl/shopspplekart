"use client";

import CommonTable from '@/components/CommonTable';
import onCancelShipment from '@/helper/Helper';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

export const dynamic = 'force-dynamic';

export default function ListShipment() {

    const [listdata, setlistdata] = useState();

    useEffect(() => {
        const listShipData = async () => {
            await fetch('/api/ekart-shipment/list', {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                }

            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        const data = res.result;
                        const dataFilter = data.filter((item) => item.resultarray[0].response[0].status ===
                            "REQUEST_RECEIVED")
                        const dataRev = dataFilter.reverse();
                        setlistdata(dataRev);
                    }
                    else if (res.status === 400) {
                        toast.error(res.message);
                    }
                    else if (res.status === 500) {
                        toast.error(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        listShipData();
    }, [])



    const onShipTrack = async (inpTrack) => {
        const token = localStorage.getItem('token');

        const fetchSattus = await fetch('/api/ekart-shipment/track', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
                "HTTP_X_MERCHANT_CODE": "SPL",
                "Authorization": `${token}`
            },
            body: JSON.stringify({ "tracking_ids": [`${inpTrack}`] })
        })

        const fetchSattusJson = await fetchSattus.json();

        if (fetchSattusJson.status === 200) {
            const shipmentKey = Object.keys(fetchSattusJson.responseData)[0];
            const shipment = fetchSattusJson.responseData[shipmentKey];
            const data = shipment.history;
            // console.log(data[0].status)

            return data[0].status
        }
    }

    const data = useMemo(() => listdata, [listdata]);

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'ID',
            accessorFn: (row, index) => index + 1,
        },
        {
            header: 'Tracking ID',
            accessorFn: (row, index) => row.resultarray[0].response[0].tracking_id ? row.resultarray[0].response[0].tracking_id : '',
        },
        {
            header: 'Order Id',
            accessorFn: (row, index) => row.ekartarray[0].services[0].service_details[0].shipment.shipment_items[0].item_attributes[0].value,
        },
        {
            header: 'Customer Name',
            accessorFn: (row, index) => row.ekartarray[0].services[0].service_details[0].service_data.destination.address.first_name,
        },
        {
            header: 'Request Status',
            accessorFn: (row, index) => row.resultarray[0].response[0].status,
        },
        {
            header: 'Date',
            accessorFn: (row, index) => moment(row.createdAt).format("MMM Do YY"),
        },
        {
            header: 'Action',
            cell: cell => (
                <div className="flex gap-5">
                    {/* <button onClick={(e) => onTrackData(e,cell.row.original._id)} className="text-blue-400 border border-blue-400 px-1.5 py-1 rounded-lg">Track</button> */}
                    <Link href={`/dashboard/list-shipment/${cell.row.original._id}`}><button className="text-green-400 border border-green-400 px-1.5 py-1 rounded-lg">Open</button></Link>
                    <button onClick={(e) => onCancelShipment(e, cell.row.original._id)} className="text-red-400 border border-red-400 px-1.5 py-1 rounded-lg">Cancel</button>
                </div>
            )
        }
    ]

    return (
        <div className="container mx-auto p-8">
            <div className="border border-gray-500 p-8 rounded-2xl">
                <h2 className="text-center">List Shipment</h2>

                {data ? <CommonTable data={data} columns={columns} /> : 'loading....'}
            </div>
        </div>
    )
}


