import moment from 'moment';
import React from 'react'

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

  return (
    <div className="container mx-auto p-8">
      <div className="p-8 rounded-2xl">
        <h2 className="text-center">Track Shipment</h2>


        <div className="track-shipment-recode-part">

          <div className="w-9/12 mx-auto border border-gray-700 p-5 mt-5 rounded-lg">
            <h5 className='mb-3'>Processing on March 24, 2021</h5>

            <div className="bg-full-range w-full h-1.5 rounded-xl bg-slate-800">
              <div className="inner-range h-1.5 rounded-xl bg-purple-400 w-[25%]"></div>
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
                data && data.map((item, index) => {
                  return (
                    <div key={index} className='border-l border-gray-500 p-3 ps-5 see-details-item'>
                      <div>{item.public_description} <span className='text-gray-500 text-sm'>{moment(item.event_date).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
                      <div className='text-gray-500 text-sm'>Status : {item.status}</div>
                      <div className='text-gray-500 text-sm'>Hub Name : {item.hub_name}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>


        </div>

      </div>

    </div>
  )
}
