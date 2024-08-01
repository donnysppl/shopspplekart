"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import toast from 'react-hot-toast';
import moment from "moment";
import DataTable, { TableColumn } from 'react-data-table-component';
import JsFileDownloader from "js-file-downloader";
import { orderInptype } from "@/interface/interface";

interface orderDataPageination {
    currentPage: number | null,
    prevPage: number | null,
    nextPage: number | null,
    limit: number | null,
    totalPost: number,
    totalPages: number | null,
}

export default function OrderListDemo() {

    const [orderListData, setorderListData] = useState<orderInptype[]>([]);
    const [responseData, setresponseData] = useState<orderDataPageination>({
        currentPage: null,
        prevPage: null,
        nextPage: null,
        limit: null,
        totalPost: 0,
        totalPages: null,
    });
    const [loading, setloading] = useState<boolean>(true);

    const [page, setpage] = useState<number>(1);
    const [limit, setlimit] = useState<number>(10);
    const [search, setsearch] = useState<string>('');
    const [status, setstatus] = useState<string>('');

    const [selectedRowData, setselectedRowData] = useState<any>()

    useEffect(() => {
        const orderListFetch = async (page: number, limit: number, search: string, status: string) => {
            setloading(true);
            await fetch(`/api/orderdata?page=${page ? page : 1}&&limit=${limit ? limit : 10}&&search=${search}&&status=${status}`, {
                method: 'GET',
                cache: 'no-store',
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success(res.message);
                        setorderListData(res.result);
                        setresponseData((prevResponseData) => ({
                            ...prevResponseData,
                            currentPage: res.pagination.currentPage,
                            prevPage: res.pagination.previousPage,
                            nextPage: res.pagination.nextPage,
                            limit: res.pagination.limit,
                            totalPost: res.pagination.totalData,
                            totalPages: res.pagination.totalPages,
                        }));
                    }
                    else if (res.status === 400 || res.status === 500) {
                        toast.error(res.message);
                    }
                    setloading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        orderListFetch(page, limit, search, status);
    }, [page, limit, search, status])


    const columns: TableColumn<orderInptype>[] = [
        {
            name: 'ID',
            cell: (row, index: number) => index + 1,
            sortable: true,
            width: '60px',
        },
        {
            name: 'Order',
            selector: row => row.sppl_orderid + ' ' + row.name,
            wrap: true,
            sortable: true,
        },
        {
            name: 'phone',
            selector: row => row.phone,
            wrap: true,
            sortable: true,
        },
        {
            name: 'Product',
            sortable: true,
            width: '200px',
            cell: row => <span>
                {
                    row.orderprod.map((item: any, index: number) => (
                        <span className="block mb-1.5" key={index}>
                            Product Name :  <span className="font-semibold">{item.productname}</span><br />
                            Model : <span className="font-semibold">{item.productmodel}</span><br />
                            Quantity : <span className="font-semibold">{item.quantity}</span>
                        </span>
                    ))
                }
            </span>,
        },
        {
            name: 'Date',
            wrap: true,
            sortable: true,
            selector: row => moment(row.createdAt).format('MMMM Do YYYY'),
        },
        {
            name: 'Status',
            wrap: true,
            sortable: true,
            selector: row => row.status,
        },
        {
            name: 'Billing Address',
            wrap: true,
            sortable: true,
            width: '150px',
            selector: row => row.address + ' ' + row.city + ' ' + row.state + ' ' + row.pincode,
        },
        {
            name: 'Total Bill',
            wrap: true,
            sortable: true,
            selector: row => '₹' + row.totalbill,
        },
        {
            name: 'Shipment Tracking',
            wrap: true,
            sortable: true,
            cell: row => (
                <div>
                    {
                        Array.isArray(row.ekartData[0]) ? row.ekartData[0].map((item, index) => (
                            <span className="block" key={index}>{item.trackingid},</span>
                        ))
                            : row.ekartData[0]?.trackingID
                    }
                </div>
            )
        },
        {
            name: 'Action',
            wrap: true,
            sortable: true,
            cell: row => (

                <div className="flex gap-5">
                    <Link href={`/dashboard/shipment/create/${row._id}`}><button className="text-green-100 bg-green-800 py-1 px-1.5 rounded">Create</button></Link>
                    <button onClick={() => updateEkartData(row._id as string)} className="text-blue-100 bg-blue-800 py-1 px-1.5 rounded">Update</button>
                </div>
            )
        }
    ];

    const updateEkartData = async (id:string) => {
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

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setpage(page);
        setlimit(newPerPage)
    };

    const handlePageChange = (page: number) => {
        setpage(page);
    };

    const handleSearchChange = (search: string) => {
        setsearch(search)
    }

    const handleStatusChange = (status: string) => {
        setstatus(status)
    }

    const handleRowSelected = React.useCallback((state: any) => {
        setselectedRowData(state);
    }, []);


    const handleRowSelectedExport = async () => {
        const selectedData = selectedRowData.selectedRows;

        const selectedDataIdFilter = selectedData.map((item: orderInptype) => item._id);

        setloading(true);
        const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/export?dataids=${selectedDataIdFilter}`;

        new JsFileDownloader({
            url: fileUrl
        }).then(function () {
            toast.success('Downloaded')
            setloading(false);
        })
            .catch(function (error: any) {
                toast.error(error.message)
                setloading(false);
            });
    }


    return (
        <div className='inner-pages-base-div'>
            <div className="head">
                <h2 className='font-medium'>
                    Order List
                </h2>
            </div>


            <div className="filter-part py-2 flex gap-2 items-center bg-gray-200 rounded-md p-2 mb-10">
                <div className="search flex flex-col">
                    <label className="font-semibold text-sm mb-0.5" >Search</label>
                    <input type="text" name="search" placeholder="Search"
                        className="border border-gray-400 rounded-md py-1 px-1.5"
                        onChange={(e) => handleSearchChange(e.target.value)} />
                </div>
                <div className="status flex flex-col">
                    <label className="font-semibold text-sm mb-0.5" >Payment Status</label>
                    <select name="status" className="border border-gray-400 rounded-md py-1 px-1.5"
                        onChange={(e) => handleStatusChange(e.target.value)} >
                        <option value="all">All</option>
                        <option value="payment_pending">payment_pending</option>
                        <option value="payment completed">Payment Complete</option>
                    </select>
                </div>

                {
                    selectedRowData?.allSelected ?
                        <div className="status flex flex-col">
                            <label className="font-semibold text-sm mb-0.5" >Export {selectedRowData?.allSelected ? `(${selectedRowData?.selectedCount})` : null}</label>
                            <button onClick={handleRowSelectedExport} className="dashboard-btn scale-90">Export</button>
                        </div> : null
                }


            </div>

            <div>

                <DataTable columns={columns} data={orderListData}

                    progressPending={loading}

                    pagination paginationServer
                    paginationTotalRows={responseData.totalPost}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}

                    selectableRows onSelectedRowsChange={handleRowSelected}

                    paginationRowsPerPageOptions={[10, 25, 50, 100]}

                />

            </div>
        </div>
    )
}
// "use client";
// import { useEffect, useState, useMemo } from "react";
// import CommonTable from '@/components/table/CommonTable';
// import moment from "moment";
// import toast from 'react-hot-toast';
// import Link from 'next/link';


// export default function Dashboard() {
//     const [orderListData, setorderListData] = useState()
//     const [loading, setloading] = useState(true);

//     useEffect(() => {
//         setloading(true);
//         const orderListFetch = async () => {
//             await fetch(`/api/orderdata`, {
//                 method: 'GET',
//                 cache: 'no-store',
//             }).then(res => res.json())
//                 .then(res => {
//                     if (res.status === 200) {
//                         toast.success(res.message);
//                         const arrangeData = res.result.reverse();
//                         setorderListData(arrangeData);
//                     }
//                     else if (res.status === 400) {
//                         toast.error(res.message);
//                     }
//                     else if (res.status === 500) {
//                         toast.error(res.message);
//                     }
//                     setloading(false);
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 })
//         }
//         orderListFetch();
//     }, []);

//     const data = useMemo(() => orderListData, [orderListData]);

//     /** @type import('@tanstack/react-table').ColumnDef<any> */
//     const columns = [
//         {
//             header: 'ID',
//             accessorFn: (row, index) => index + 1,
//             footer: 'ID',
//         },
//         {
//             header: 'Order',
//             accessorFn: (row, index) => row.sppl_orderid + ' ' + row.name,
//         },
//         {
//             header: 'Date',
//             accessorFn: (row, index) => moment(row.createdAt).format('MMM Do YYYY'),
//         },
//         {
//             header: 'Status',
//             accessorFn: (row, index) => row.status,
//         },
//         {
//             header: 'Total Bill',
//             accessorFn: (row, index) => '₹' + row.totalbill,
//         },
//         {
//             header: 'Shipment Tracking',
//             cell: cell => (
//                 <div>
//                     {
//                         Array.isArray(cell.row.original.ekartData[0]) ? cell.row.original.ekartData[0].map((item, index) => (
//                             <span className="block" key={index}>{item.trackingid},</span>
//                         ))
//                             : cell.row.original.ekartData[0]?.trackingID
//                     }

//                 </div>
//             )
//         },
//         {
//             header: 'Action',
//             cell: cell => (
//                 <div className="flex gap-5">
//                     <Link href={`/dashboard/shipment/create/${cell.row.original._id}`}><button className="text-green-100 bg-green-800 py-1 px-1.5 rounded">Create</button></Link>
//                     <button onClick={() => updateEkartData(cell.row.original._id)}  className="text-blue-100 bg-blue-800 py-1 px-1.5 rounded">Update</button>
//                 </div>
//             )
//         }
//     ]

//     const updateEkartData = async (id) => {
//         await fetch(`/api/ekart-shipment/updatetrack/${id}`,{
//             method: 'GET',
//             cache: 'no-store',
//         }).then(res => res.json())
//             .then(res => {
//                 if (res.status === 200) {
//                     toast.success(res.message);
//                 }
//                 else if (res.status === 400) {
//                     toast.error(res.message);
//                 }
//                 else if (res.status === 500) {
//                     toast.error(res.message);
//                 }
//                 setloading(false);
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     return (
//         <section>
//             <div className="max-w-5xl mx-auto">
//                 <div className="bg-gray-700 p-4 rounded-xl">
//                     <h1 className="text-center">Dashboard</h1>

//                     <div>
//                         {
//                             loading ? 'Loading...' : <CommonTable data={data} columns={columns} loading={loading} />
//                         }

//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

