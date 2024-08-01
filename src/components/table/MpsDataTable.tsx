"use client";

import Link from 'next/link';
import DataTable, { TableColumn } from 'react-data-table-component';

interface MpsDataTableType {
    data: any
}

export default function MpsDataTable({
    data
}: MpsDataTableType) {


    const columns: TableColumn<any>[] = [
        {
            name: 'ID',
            cell: (row, index: number) => index + 1,
            sortable: true,
            width: '60px',
        },
        {
            name: 'Global Tracking ID',
            cell: (row, index: number) => row.globaltrackingid,
            sortable: true,
        },
        {
            name: 'Products Tracking ID',
            cell: row => (
                <ul className='list-disc'>
                    {
                        row.productData.map((item: any, index: number) => (
                            <li className="" key={index}>{item.tracking_id}</li>
                        ))
                    }
                </ul>
            ),
            sortable: true,
        },
        {
            name: 'Request',
            cell: (row, index: number) => row.response.response[0].status,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.response.response[0].status === 'REQUEST_RECEIVED',
                    style: {
                        backgroundColor: 'rgba(63, 195, 128, 0.9)',
                        color: 'white',
                    },
                }, {
                    when: row => row.response.response[0].status === 'REQUEST_REJECTED',
                    style: {
                        backgroundColor: 'rgba(242, 38, 19, 0.9)',
                        color: 'white',
                    },
                }
            ]
        },
        {
            name: 'Action',
            cell: row => (
                <ul className=''>
                    <li className="" >
                        {
                            (row.response.response[0].status === 'REQUEST_RECEIVED') &&
                            <Link href={`/dashboard/list-shipment/mps/${row._id}`}
                                className='bg-green-500 text-green-100 px-2 py-2 rounded uppercase no-underline' >Show label</Link>
                        }
                    </li>
                </ul>
            ),
        },


    ];

    const ExpandedComponent = ({ data }: { data: any }) => <div>
        <div>
            <div className='flex gap-3'>
                <div className='text-black font-semibold text-base text-left p-3 border-r border-gray-300'>
                    <div className='font-semibold text-lg'>SOURCE ADDRESS:</div>
                    <div>{data.sourcedata.first_name}</div>
                    <div>{data.sourcedata.address_line1}</div>
                    <div>{data.sourcedata.city} {data.sourcedata.state} {data.sourcedata.pincode}</div>
                    <div>Contact Number : {data.sourcedata.primary_contact_number}</div>
                </div>
                <div className='text-black font-semibold text-base text-left p-3 border-r border-gray-300'>
                    <div className='font-semibold text-lg'>DESTINATION ADDRESS:</div>
                    <div>{data.destinationData.first_name}</div>
                    <div>{data.destinationData.address_line1}</div>
                    <div>{data.destinationData.city} {data.destinationData.state} {data.destinationData.pincode}</div>
                    <div>Contact Number : {data.destinationData.primary_contact_number}</div>
                </div>
                <div className='text-black font-semibold text-base text-left p-3'>
                    <div className='font-semibold text-lg'>GLOBAL DATA:</div>
                    <ul>
                        <li>Global Tracking id : {data.globalData.g_tracking_id}</li>
                        <li>amount_to_collect : {data.globalData.amount_to_collect}</li>
                        <li>order_id : {data.globalData.order_id}</li>
                        <li>invoice_id : {data.globalData.invoice_id}</li>
                    </ul>
                </div>
            </div>
            <div className='text-black font-semibold text-base text-left p-3'>
                <div>PRODUCT DATA:</div>
                <div className='flex flex-col ps-5'>
                    {
                        data?.productData.map((item: any, index: number) => (
                            <ul className='mb-5 relative' key={index}>
                                <li className='absolute -left-5 '>{index + 1} : </li>
                                <li>tracking_id : {item.tracking_id}</li>
                                <li>product_id : {item.product_id}</li>
                                <li>product_title : {item.product_title}</li>
                                <li>category : {item.category}</li>
                            </ul>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>;

    return (
        <div>
            <DataTable columns={columns} data={data.result}
                expandableRows={true}
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    )
}
