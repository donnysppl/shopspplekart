"use client";
import Loader from '@/components/Loader';
import { HistoryTrack, Tracking } from '@/interface/interface';
import moment from 'moment';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image'

interface CustomerTrackState {
    phone: string,
    trackingid: string
}

export default function CustomerTracking() {

    const [custTrackInp, setcustTrackInp] = useState<CustomerTrackState>({
        phone: '',
        trackingid: ''
    })

    const [trackResponse, settrackResponse] = useState<Tracking>();
    const [trackingresHis, settrackingresHis] = useState<HistoryTrack[]>([]);
    const [showTrack, setshowTrack] = useState<boolean>(false);
    const [loader, setloader] = useState<boolean>(false);

    const onCustomerTrack = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloader(true);
        settrackingresHis([])
        await fetch('/api/customer/track', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "HTTP_X_MERCHANT_CODE": "SPL",
            },
            body: JSON.stringify(custTrackInp)
        }).then(res => res.json())
            .then(res => {
                // console.log(res);
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
                    setshowTrack(true);
                }
                else if (res.status === 400) {
                    toast.error(res.message)
                }
                else if (res.status === 401) {
                    toast.error(res.message)

                }
                else if (res.status === 500) {
                    toast.error(res.message)
                }
            }).catch(err => {
                console.log(err);
            })
        setloader(false);
    }

    return (
        <div className='flex items-center justify-center min-h-screen p-2 flex-col'>
            <div className="logo flex p-4 mb-3">
                <Image className='mx-auto'
                    src={'/assets/img/sppl-logo.png'}
                    width={200}
                    height={200}
                    alt="logo" layout="fixed"
                />
            </div>
            <main className='relative max-w-2xl w-full mx-auto border border-gray-700 shadow-xl rounded-2xl md:p-8 p-4'>

                <div>

                    <h2 className='mb-5'>Track Your Order</h2>
                    <div className={`relative ${loader ? 'w-full h-[500px]' : null}`}>
                        {
                            loader ? <Loader /> :
                                <>
                                    <div className="customer-tracking-form">
                                        <form onSubmit={onCustomerTrack} >
                                            <div className="mb-4">
                                                <label htmlFor="phone" className="form-label ">Phone Number</label>
                                                <input type="text" name="phone" className="form-inp" required placeholder="Phone Number"
                                                    onChange={(e) => setcustTrackInp({ ...custTrackInp, phone: e.target.value })} />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="trackingid" className="form-label ">Tracking ID</label>
                                                <input type="text" name="trackingid" className="form-inp" required placeholder="Tracking ID"
                                                    onChange={(e) => setcustTrackInp({ ...custTrackInp, trackingid: e.target.value })} />
                                            </div>
                                            <button type='submit' className='btn-main mt-3'>Submit</button>
                                        </form>
                                    </div>

                                    {
                                        showTrack ?
                                            <div className="customer-track-data p-5">
                                                {
                                                    trackingresHis.length ?
                                                        <>
                                                            <h5 className='mb-3'>Expected Date : {moment(trackResponse?.expected_delivery_date).format('MMMM Do YYYY')} </h5>
                                                            {trackingresHis?.map((item, index) => {
                                                                return (
                                                                    <div key={index} className='border-l border-gray-500 p-3 ps-5 see-details-item'>
                                                                        <div>{item.description} <span className='text-gray-500 text-sm'>{moment(item.event_date).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
                                                                        <div className='text-gray-500 text-sm'>Status : {item.status}</div>
                                                                        <div className='text-gray-500 text-sm'>Hub Name : {item.hub_name}</div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </> : <div className='text-center text-sm mt-5'>
                                                            Ekart data not created, Please wait for 12 to 24 hours to create a ekart shipment data
                                                        </div>
                                                }

                                            </div> : null
                                    }
                                </>}

                    </div>

                </div>



            </main>
        </div>
    )
}
