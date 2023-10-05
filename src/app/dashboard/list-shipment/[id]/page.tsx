"use client";
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PerShipmentDetail, Ekartarray, Resultarray, Address2, ShipmentItem, Response, SourceData, Tracking, HistoryTrack } from '@/interface/interface';
import Label from '@/components/Label';
import Unauthorized from '@/helper/Unauthorize';
import Loader from '@/components/Loader';
import TrackPopup from '@/components/track/TrackPopup';


export default function PerListShipment({ params }: { params: { id: string } }) {

    const [perShipDetailData, setperShipDetailData] = useState<PerShipmentDetail>();
    const [perShipEkartData, setperShipEkartData] = useState<Ekartarray[]>([])
    const [perShipEkartRes, setperShipEkartRes] = useState<Resultarray[]>([])

    const [customerAdd, setcustomerAdd] = useState<Address2>();
    const [shipmentItems, setshipmentItems] = useState<ShipmentItem>();
    const [trackingDetails, settrackingDetails] = useState<Response>();
    const [sourceDetails, setsourceDetails] = useState<SourceData>();

    const [trackResponse, settrackResponse] = useState<Tracking>();
    const [trackingresHis, settrackingresHis] = useState<HistoryTrack[]>([]);
    const [loader, setloader] = useState<boolean>(false)
    const [openTractPop, setopenTractPop] = useState<boolean>(false)

    useEffect(() => {
        setloader(true);
        const tractData = async (id: string) => {
            const token = localStorage.getItem('token');

            await fetch('/api/ekart-shipment/track', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "HTTP_X_MERCHANT_CODE": "SPL",
                    "Authorization": `${token}`
                },
                body: JSON.stringify({ "tracking_ids": [`${id}`] })
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        const shipmentKey = Object.keys(res.responseData)[0];
                        const shipment = res.responseData[shipmentKey];
                        settrackResponse(shipment);
                        const data = shipment.history;
                        if (data.length) {
                            data.forEach((item: any) => {
                                item.event_date = new Date(item.event_date);
                            });

                            data.sort((a: any, b: any) => a.event_date - b.event_date);
                            settrackingresHis(data.reverse());
                        }
                    }
                    else if (res.status === 400) {
                        toast.error(res.message)
                    }
                    else if (res.status === 401) {
                        toast.error(res.message)
                        Unauthorized();
                    }
                    else if (res.status === 500) {
                        toast.error(res.message)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }

        const perShipDetail = async () => {
            await fetch(`/api/ekart-shipment/list/${params.id}`, {
                method: 'GET',
            cache: 'no-store',

            }).then(res => res.json())
                .then(res => {
                    console.log(res.result);
                    if (res.status === 200) {
                        toast.success(res.message);
                        setperShipDetailData(res.result);
                        setperShipEkartData(res.result.ekartarray);
                        setperShipEkartRes(res.result.resultarray);
                        setcustomerAdd(res.result.ekartarray[0].services[0].service_details[0].service_data.destination.address)
                        setsourceDetails(res.result.ekartarray[0].services[0].service_details[0].service_data.source)
                        setshipmentItems(res.result.ekartarray[0].services[0].service_details[0].shipment.shipment_items[0])
                        settrackingDetails(res.result.resultarray[0].response[0])
                        tractData(res.result.resultarray[0].response[0].tracking_id);
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
        perShipDetail();
        setloader(false);
    }, [params.id])

    return (
        <div className='container p-8'>
            <div className="mx-auto p-5 relative">
                <h2 className='text-center'>Shipment Details</h2>

                <div className="relative">
                    {
                        loader ? <div className='w-full h-[500px]'><Loader /></div> :


                            <div className="per-ship-data flex gap-5 mt-5 flex-wrap">
                                <div className=" border border-gray-500 p-5 rounded-xl sm:w-[48%] w-full">
                                    <h4>Customer Details</h4>


                                    <ul className='text-sm text-gray-400 p-3 leading-6 list-ship-detail' >
                                        {(customerAdd && customerAdd.first_name === '') ? null : <li>Name : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.first_name}</span></li>}
                                        {(customerAdd && customerAdd.email_id === '') ? null : <li>Email Id : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.email_id}</span></li>}
                                        {(customerAdd && customerAdd.primary_contact_number === '') ? null : <li>Phone No : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.primary_contact_number}</span></li>}
                                        {(customerAdd && customerAdd.alternate_contact_number === '') ? null : <li>Alt Phone No : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.alternate_contact_number}</span></li>}
                                        {(customerAdd && customerAdd.address_line1 === '') ? null : <li>Address1 : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.address_line1}</span></li>}
                                        {(customerAdd && customerAdd.address_line2 === '') ? null : <li>Address2 : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.address_line2}</span></li>}
                                        {(customerAdd && customerAdd.landmark === '') ? null : <li>Landmark : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.landmark}</span></li>}
                                        {(customerAdd && customerAdd.city === '') ? null : <li>City : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.city}</span></li>}
                                        {(customerAdd && customerAdd.state === '') ? null : <li>State : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.state}</span></li>}
                                        {(customerAdd && customerAdd.pincode === '') ? null : <li>Pincode : <span className='font-semibold text-gray-300'>{customerAdd && customerAdd.pincode}</span></li>}

                                    </ul>


                                </div>

                                <div className=" border border-gray-500 p-5 rounded-xl sm:w-[48%] w-full">
                                    <h4>Shipment Details</h4>


                                    <ul className='text-sm text-gray-400 p-3 leading-6 list-ship-detail'>
                                        <li>Model No : <span className='font-semibold text-gray-300'>{shipmentItems && shipmentItems.product_id}</span></li>
                                        <li>Product Name : <span className='font-semibold text-gray-300'>{shipmentItems && shipmentItems.product_title}</span></li>
                                        <li>Category : <span className='font-semibold text-gray-300'>{shipmentItems && shipmentItems.category}</span></li>
                                        <li>Quantity : <span className='font-semibold text-gray-300'>{shipmentItems && shipmentItems.quantity}</span></li>
                                        <li>
                                            <div>
                                                {shipmentItems && shipmentItems.item_attributes.map((item, index) => (
                                                    <div key={index} className=''>{item.name} :
                                                        <span className='ps-3 font-semibold text-gray-300'>
                                                            {(item.value === '') ? 'NULL OR EMPTY' : item.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </li>

                                    </ul>


                                </div>

                                <div className=" border border-gray-500 p-5 rounded-xl sm:w-[48%] w-full">
                                    <div className='flex justify-between items-center'>
                                        <h4>Tracking Details</h4>
                                        {
                                            (trackingresHis.length) ?
                                                <>
                                                    <button onClick={() => setopenTractPop(!openTractPop)} className='btn-main'>Track Deatils</button>
                                                    {
                                                        openTractPop ? <>
                                                        <TrackPopup
                                                        cancel={() => setopenTractPop(false)}
                                                        id={trackResponse && trackResponse.shipment_id} trackingresHis={trackingresHis && trackingresHis} /> 
                                                        {/* <div className="track-cancelbtn">Cancel</div> */}
                                                        </> : null
                                                    }

                                                </> : null
                                        }

                                    </div>
                                    <ul className='text-sm text-gray-400 p-3 leading-6 list-ship-detail'>
                                        <li>Tracking ID : <span className='font-semibold text-gray-300'>{trackResponse && trackResponse.shipment_id}</span></li>
                                        <li>expected_delivery_date : <span className='font-semibold text-gray-300'>{trackResponse && trackResponse.expected_delivery_date}</span></li>

                                    </ul>
                                </div>
                            </div>
                    }
                </div>

                <div className="label-part">
                    <div>
                        {
                            (customerAdd && shipmentItems && trackingDetails && sourceDetails && trackResponse) ?
                                <Label sourceDetails={sourceDetails} custDetail={customerAdd} shipDetail={shipmentItems} trackDetail={trackingDetails} />
                                : null
                        }
                    </div>
                </div>



            </div>
        </div>
    )
}
