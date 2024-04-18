"use client";
import { useEffect, useState, useMemo } from "react";
import CommonTable from '@/components/table/CommonTable';
import moment from "moment";
import toast from 'react-hot-toast';
import Link from 'next/link';


export default function Dashboard() {
    const [orderListData, setorderListData] = useState()
    const [loading, setloading] = useState(true);

    useEffect(() => {
        setloading(true);
        const orderListFetch = async () => {
            await fetch(`/api/orderdata`, {
                method: 'GET',
                cache: 'no-store',
            }).then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        toast.success(res.message);
                        const arrangeData = res.result.reverse();
                        setorderListData(arrangeData);
                    }
                    else if (res.status === 400) {
                        toast.error(res.message);
                    }
                    else if (res.status === 500) {
                        toast.error(res.message);
                    }
                    setloading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        orderListFetch();
    }, []);

    const data = useMemo(() => orderListData, [orderListData]);

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'ID',
            accessorFn: (row, index) => index + 1,
            footer: 'ID',
        },
        {
            header: 'Order',
            accessorFn: (row, index) => row.sppl_orderid + ' ' + row.name,
        },
        {
            header: 'Date',
            accessorFn: (row, index) => moment(row.createdAt).format('MMM Do YYYY'),
        },
        {
            header: 'Status',
            accessorFn: (row, index) => row.status,
        },
        {
            header: 'Total Bill',
            accessorFn: (row, index) => '₹' + row.totalbill,
        },
        {
            header: 'Shipment Tracking',
            cell: cell => (
                <div>
                    {
                        Array.isArray(cell.row.original.ekartData[0]) ? cell.row.original.ekartData[0].map((item, index) => (
                            <span className="block" key={index}>{item.trackingid},</span>
                        ))
                            : cell.row.original.ekartData[0]?.trackingID
                    }

                </div>
            )
        },
        {
            header: 'Action',
            cell: cell => (
                <div className="flex gap-5">
                    <Link href={`/dashboard/shipment/create/${cell.row.original._id}`}><button className="text-green-100 bg-green-800 py-1 px-1.5 rounded">Create</button></Link>
                    <button onClick={() => updateEkartData(cell.row.original._id)}  className="text-blue-100 bg-blue-800 py-1 px-1.5 rounded">Update</button>
                </div>
            )
        }
    ]

    const updateEkartData = async (id) => {
        await fetch(`/api/ekart-shipment/updatetrack/${id}`,{
            method: 'GET',
            cache: 'no-store',
        }).then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.message);
                }
                else if (res.status === 400) {
                    toast.error(res.message);
                }
                else if (res.status === 500) {
                    toast.error(res.message);
                }
                setloading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <section>
            <div className="max-w-5xl mx-auto">
                <div className="bg-gray-700 p-4 rounded-xl">
                    <h1 className="text-center">Dashboard</h1>

                    <div>
                        {
                            loading ? 'Loading...' : <CommonTable data={data} columns={columns} loading={loading} />
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

