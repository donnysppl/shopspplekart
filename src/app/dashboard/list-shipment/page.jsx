"use client";

import CommonTable from '@/components/CommonTable';
import onCancelShipment from '@/helper/Helper';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ListShipment() {

    const [listdata, setlistdata] = useState();

    useEffect(() => {
        const listShipData = async () => {
            await fetch('/api/ekart-shipment/list', {
                method: 'GET',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        const data = res.result;
                        const dataRev = data.reverse();
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
            header: 'Status',
            accessorFn: (row, index) => row.resultarray[0].response[0].status,
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
            header: 'Action',
            cell: cell => (
                <div className="flex gap-5">
                    <Link href={`/dashboard/list-shipment/${cell.row.original._id}`}><button className="text-green-400 border border-green-400 px-1.5 py-1 rounded-lg">Open</button></Link>
                    <button onClick={(e) => onCancelShipment(e,cell.row.original._id)} className="text-red-400 border border-red-400 px-1.5 py-1 rounded-lg">Cancel</button>
                </div>
            )
        }
    ]

    return (
        <div className="container mx-auto p-8">
            <div className="border border-gray-500 p-8 rounded-2xl">
                <h2 className="text-center">List Shipment</h2>

                {data ? <CommonTable data={data} columns={columns} /> : null}
            </div>
        </div>
    )
}


