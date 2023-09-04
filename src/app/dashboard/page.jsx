"use client";
import { useState, useEffect } from 'react';
// import CommonTable from '@/components/CommonTable';
import Loader from '@/components/Loader';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import moment from 'moment';
import Link from 'next/link';

const WooCommerce = new WooCommerceRestApi({
    url: "https://shopsppl.in",
    consumerKey: "ck_362c79346df5045a8354633e29ca4433364baa75",
    consumerSecret: "cs_7efa0e005bd7816f0f80708a2aad8c4aaddfde46",
    version: "wc/v3"
});

export default function Dashboard() {

    const [wooComOrderData, setwooComOrderData] = useState([]);
    const [totalPageCount, settotalPageCount] = useState();
    const [currentPage, setcurrentPage] = useState(1);
    const [nextBtnDisable, setnextBtnDisable] = useState(false);
    const [prevBtnDisable, setprevBtnDisable] = useState(false);

    const [loader, setloader] = useState(true);
    useEffect(() => {
        const woocomData = async () => {
            setloader(true);
            await WooCommerce.get("orders", { per_page: 20, page: currentPage })
                .then((response) => {
                    console.log(response)
                    const xWpTotalPages = response.headers['x-wp-totalpages'];
                    settotalPageCount(xWpTotalPages);
                    if (response.status === 200) {
                        setwooComOrderData(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

            setloader(false);
        }

        woocomData();


    }, [currentPage])

    console.log(totalPageCount)

    const nextPageHandle = () => {
        if (totalPageCount > currentPage) {
            setcurrentPage(currentPage + 1);
        }
        else if (totalPageCount === currentPage) {
            setnextBtnDisable(true);
        }
    }
    const prevPageHandle = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1);
        }
        else if (currentPage === 1) {
            setprevBtnDisable(true);
        }
    }


    return (
        <div className="container mx-auto p-8">
            <div className="p-8">
                <h2 className="text-center mb-8">Woocommerec Order</h2>

                <div className={`relative ${loader ? 'w-full h-[500px]' : null}`}>
                    {
                        loader ? <Loader /> :
                            <div>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-500">
                                    <thead className="text-xs text-gray-300 uppercase bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-4">Order</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Billing Address</th>
                                            <th className="px-6 py-4">Total</th>
                                            <th className="px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            wooComOrderData && wooComOrderData.map((item, index) => {
                                                return (
                                                    <tr className="border-b border-gray-500 hover:bg-gray-800">
                                                        <td className="px-6 py-4">
                                                            {'# ' + item.id + ' ' + item.billing.first_name + ' ' + item.billing.last_name}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {moment(item.date_created).format('MMMM Do YYYY, h:mm:ss a')}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item.status}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item.billing.address_1 + ' ' + item.billing.address_2}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item.total}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <Link href={`/dashboard/woocom-shipment/${item.id}`}>
                                                                <button className='bg-purple-600 p-1.5 rounded-md text-gray-200'>Ship</button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>

                                <div >
                                    <div className="flex items-center justify-center mt-4">
                                        Page {currentPage} of {totalPageCount}
                                    </div>
                                    <ul className="pagenation-contain gap-3">
                                        {
                                            prevBtnDisable ? null : <li className='pagination-item' onClick={prevPageHandle}>Previous</li>
                                        }

                                        {
                                            nextBtnDisable ? null : <li className='pagination-item' onClick={nextPageHandle}>Next</li>
                                        }

                                    </ul>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
