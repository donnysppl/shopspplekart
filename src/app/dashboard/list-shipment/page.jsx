"use client";

import CommonTable from '@/components/CommonTable';
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
                        setlistdata(res.result);
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
            footer: 'ID',
        },
        {
            header: 'Tracking ID',
            accessorKey: 'trackingID',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            footer: 'Brand Slug',
        },
        {
            header: 'Customer Name',
            accessorFn: (row, index) => row.destinationdata[0].first_name,
        },
        {
            header: 'Product ID',
            accessorFn: (row, index) => row.shipmentItemDetail[0].product_id,
        }
        // {
        //     header: 'Action',
        //     cell: cell => (
        //         <div className="flex gap-5">
        //             <Link href={`/backend-dashboard/brand/brand-edit/${cell.row.original._id}`}><button className="text-green-400">Edit</button></Link>
        //             <button onClick={(e) => onDeleteBrand(e, cell.row.original._id)} className="text-red-400">Delete</button>
        //         </div>
        //     )
        // }
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
