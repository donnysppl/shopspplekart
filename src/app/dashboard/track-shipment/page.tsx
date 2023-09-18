"use client";
import moment from 'moment';
import React, { useState } from 'react'
import { Tracking, HistoryTrack } from '@/interface/interface';
import Swal from 'sweetalert2';
import Unauthorized from '@/helper/Unauthorize';
import Loader from '@/components/Loader';

const data = [
  {
    "city": "Nirsa",
    "status": "delivered",
    "hub_notes": "30161417, Vikash Kumar Saw_1087905, ",
    "cs_notes": "",
    "event_date": "2018-08-28T18:03:33+0530",
    "event_date_iso8601": "2018-08-28T18:03:33.000+05:30",
    "hub_name": "NirsaHub_NRA",
    "updated_datetime": "2018-08-28T18:03:33+0530",
    "public_description": "Delivered to Customer"
  },
  {
    "city": "Nirsa",
    "status": "out_for_delivery",
    "hub_notes": "30161417, Vikash Kumar Saw_1087905, ",
    "cs_notes": "",
    "event_date": "2018-08-28T07:38:28+0530",
    "event_date_iso8601": "2018-08-28T07:38:28.000+05:30",
    "hub_name": "NirsaHub_NRA",
    "updated_datetime": "2018-08-28T07:38:28+0530",
    "public_description": "Out for delivery"
  },
  {
    "city": "New Delhi",
    "status": "in_transit",
    "hub_notes": "",
    "cs_notes": "",
    "event_date": "2018-08-24T23:48:41+0530",
    "event_date_iso8601": "2018-08-24T23:48:41.000+05:30",
    "hub_name": "Bamnoli Sort Centre",
    "updated_datetime": "2018-08-24T23:48:41+0530",
    "public_description": "Received at Bamnoli Sort Centre"
  },
  {
    "city": "New Delhi",
    "status": "in_transit",
    "hub_notes": "",
    "cs_notes": "",
    "event_date": "2018-08-24T23:48:41+0530",
    "event_date_iso8601": "2018-08-24T23:48:41.000+05:30",
    "hub_name": "Bamnoli Sort Centre",
    "updated_datetime": "2018-08-24T23:48:41+0530",
    "public_description": "Shipment in-scanned at Bamnoli Sort Centre"
  },
  {
    "city": "New Delhi",
    "status": "in_transit",
    "hub_notes": "",
    "cs_notes": "",
    "event_date": "2018-08-24T23:48:41+0530",
    "event_date_iso8601": "2018-08-24T23:48:41.000+05:30",
    "hub_name": "Bamnoli Sort Centre",
    "updated_datetime": "2018-08-24T23:48:41+0530",
    "public_description": "Dispatched to Bamnoli Sort Centre"
  },
  {
    "status": "in_transit",
    "event_date": "2018-08-24T23:48:42+0530",
    "event_date_iso8601": "2018-08-24T23:48:42+05:30",
    "city": "Dwarka",
    "description": "Dispatched to Ekart Logistics",
    "public_description": "Dispatched to Ekart Logistics",
    "cs_notes": null
  },
  {
    "status": "in_transit",
    "event_date": "2018-08-24T23:48:40+0530",
    "event_date_iso8601": "2018-08-24T23:48:40+05:30",
    "city": "Dwarka",
    "description": "Received At EKL_Bamnoli1 ",
    "public_description": "Received At EKL_Bamnoli1 ",
    "cs_notes": null
  },
  {
    "status": "in_transit",
    "event_date": "2018-08-24T19:41:23+0530",
    "event_date_iso8601": "2018-08-24T19:41:23+05:30",
    "city": "Dwarka",
    "description": "dispatched_to_tc",
    "public_description": "dispatched_to_tc",
    "cs_notes": null
  },
  {
    "status": "pickup_complete",
    "event_date": "2018-08-24T17:27:14+0530",
    "event_date_iso8601": "2018-08-24T17:27:14+05:30",
    "city": "Dwarka",
    "description": "shipment_pickup_complete",
    "public_description": "shipment_pickup_complete",
    "cs_notes": null
  },
  {
    "status": "out_for_pickup",
    "event_date": "2018-08-24T10:24:02+0530",
    "event_date_iso8601": "2018-08-24T10:24:02+05:30",
    "city": "Bangalore",
    "description": "shipment_out_for_pickup",
    "public_description": "shipment_out_for_pickup",
    "cs_notes": null
  },
  {
    "status": "pickup_scheduled",
    "event_date": "2018-08-23T12:15:35+0530",
    "event_date_iso8601": "2018-08-23T12:15:35+05:30",
    "city": "Bangalore",
    "description": "Expected at ekl-marketplace ",
    "public_description": "Expected at ekl-marketplace ",
    "cs_notes": null
  },
  {
    "status": "shipment_created",
    "event_date": "2018-08-23T12:15:35+0530",
    "event_date_iso8601": "2018-08-23T12:15:35+05:30",
    "city": "Bangalore",
    "description": "Dispached by Seller",
    "public_description": "Dispached by Seller",
    "cs_notes": null
  }
]

export default function TrackShipment() {

  const [inpTrack, setinpTrack] = useState<string>('');
  const [trackResponse, settrackResponse] = useState<Tracking>();
  const [trackingresHis, settrackingresHis] = useState<HistoryTrack[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  const onShipTrack = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    settrackingresHis([]);
    const token = localStorage.getItem('token');

    await fetch('/api/ekart-shipment/track', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "HTTP_X_MERCHANT_CODE": "SPL",
        "Authorization": `${token}`
      },
      body: JSON.stringify({ "tracking_ids": [`${inpTrack}`] })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          const shipmentKey = Object.keys(res.responseData)[0];
          const shipment = res.responseData[shipmentKey];
          settrackResponse(shipment);
          const data = shipment.history;
          if(data.length){
            data.forEach((item: any) => {
              item.event_date = new Date(item.event_date);
            });
  
            data.sort((a: any, b: any) => a.event_date - b.event_date);
            settrackingresHis(data.reverse());
          }
        }
        else if (res.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.message
          })
        }
        else if (res.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.message
          })
          Unauthorized();
        }
        else if (res.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.message
          })
        }
      })
      .catch(err => {
        console.log(err);
      })

    setloading(false);

  }



  return (
    <div className="container mx-auto p-8">
      <div className="p-8 rounded-2xl">
        <h2 className="text-center">Track Shipment</h2>

        <div className="track-shipment-recode-part">

          <div className="w-9/12 mx-auto border border-gray-700 p-5 mt-5 rounded-lg">

            <div className="tracking-inp py-5 ">
              <form onSubmit={onShipTrack}>
                <div className="mb-4 flex flex-row gap-5 w-[50%] mx-auto">
                  <input type="text" name="tracking_id" className="form-inp" placeholder="Tracking ID"
                    onChange={(e) => setinpTrack(e.target.value)} />
                  <button type="submit" className='btn-main'>Submit</button>
                </div>
              </form>

            </div>

            <div className='relative'>
              {
                loading ? <div className='w-full h-[500px]'><Loader /></div> : null
              }
              {
                trackingresHis.length ?
                  <div className='border-t border-gray-700 pt-5'>
                    <h5 className='mb-3'>Processing on March 24, 2021</h5>

                    <div className="bg-full-range w-full h-1.5 rounded-xl bg-slate-800">
                      <div className={`inner-range h-1.5 rounded-xl bg-purple-400 
                      ${(trackingresHis[0].status === 'shipment_delivered') ? 'w-[100%]' :
                          (trackingresHis[0].status === 'shipment_out_for_delivery') ? 'w-[75%]' :
                            (trackingresHis[0].status === 'received_at_dh') ? 'w-[70%]' :
                              (trackingresHis[0].status === 'received') ? 'w-[65%]' :
                                (trackingresHis[0].status === 'shipment_pickup_complete') ? 'w-[65%]' :
                                  (trackingresHis[0].status === 'pickup_out_for_pickup') ? 'w-[50%]' :
                                    (trackingresHis[0].status === 'pickup_reattempt') ? 'w-[50%]' : 'w-[25%]'} `}></div>
                    </div>

                    <div className="range-text-part mt-4">
                      <div className="range-inner-text grid grid-cols-4">
                        <h6 className='text-center'>Order placed</h6>
                        <h6 className='text-center'>Processing</h6>
                        <h6 className='text-center'>Shipped</h6>
                        <h6 className='text-center'>Delivered</h6>
                      </div>
                    </div>



                    <div className="see-details-part mt-8">
                      {
                        trackingresHis && trackingresHis.map((item, index) => {
                          return (
                            <div key={index} className='border-l border-gray-500 p-3 ps-5 see-details-item'>
                              <div>{item.description} <span className='text-gray-500 text-sm'>{moment(item.event_date).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
                              <div className='text-gray-500 text-sm'>Status : {item.status}</div>
                              <div className='text-gray-500 text-sm'>Hub Name : {item.hub_name}</div>
                            </div>
                          )
                        })
                      }
                    </div>

                  </div>
                  : <div className='text-center'>Data Is Empty or Not Found. Please Retry</div>
              }
            </div>


          </div>


        </div>

      </div>

    </div>
  )
}
