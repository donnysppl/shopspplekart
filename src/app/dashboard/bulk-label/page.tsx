"use client";

import Label from "@/components/Label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from 'react-select';

export default function BulkLabel() {


    const [listdata, setlistdata] = useState<any>([]);
    const [selectedData, setselectedData] = useState<any>([]);

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
                        setlistdata(data);
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



    return (
        <div className='p-5'>

            <div className='text-center mb-2.5'>
                <h1>Bulk Label Download</h1>
            </div>

            <div className="border border-gray-500 w-full p-5 rounded-md">

                <Select

                    onChange={(option: any | null) => {
                        setselectedData(option)
                    }}

                    isMulti
                    name="tracking_id"
                    options={listdata}
                    getOptionLabel={(allProd: any) => allProd.resultarray[0].response[0].tracking_id}
                    getOptionValue={(allProd: any) => allProd.resultarray[0].response[0].tracking_id}

                    isClearable={true}
                    backspaceRemovesValue={true}

                    className="basic-multi-select"
                    classNamePrefix="select"
                />


                <div className="grid grid-cols-1 gap-4">
                    {

                        selectedData && selectedData.map((item: any, ind: number) => (
                            <div key={ind} className="border border-gray-400 rounded-md p-4  w-full">
                                <div >{item.resultarray[0].response[0].tracking_id}</div>
                                <Label
                                    sourceDetails={item.ekartarray[0].services[0].service_details[0].service_data.source}
                                    custDetail={item.ekartarray[0].services[0].service_details[0].service_data.destination.address} shipDetail={item.ekartarray[0].services[0].service_details[0].shipment.shipment_items[0]}
                                    trackDetail={item.resultarray[0].response[0]} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
