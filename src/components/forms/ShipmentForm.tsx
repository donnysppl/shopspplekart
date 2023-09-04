"use client";

import { useState, useEffect } from "react";
import { WoocomOrder } from "@/interface/interface";

interface SourceData {
  first_name: string;
  address_line1: string;
  address_line2: string;
  pincode: string;
  city: string;
  state: string;
  primary_contact_number: string;
  landmark: string;
  email_id: string;
}
interface DestinationData {
  first_name: string;
  address_line1: string;
  address_line2: string;
  pincode: string;
  city: string;
  state: string;
  primary_contact_number: string;
  landmark: string;
  email_id: string;
  alternate_contact_number: string;
}
interface ShipmentItemDetail {
  product_id: string;
  product_title: string;
  category: string;
  quantity: number;
  total_tax_value: number;
  total_sale_value: number;
  cgst: number;
  sgst: number;
  igst: number;
  discount: number;
  seller_reg_name: string;
  gstin_id: string;
  hsn: string;
  ern: string;
  order_id: string;
  invoice_id: string;
  item_dimensions: string;
  brand_name: string;
  eway_bill_number: string;
  tracking_id: string;
}
interface ShipmentDimension {
  length: number;
  height: number;
  weight: number;
  breadth: number;
}

interface ParamsTypeShipForm {
  data: WoocomOrder,
  id: string,
  loading: boolean,
}

export default function ShipmentForm({ id, data, loading }: ParamsTypeShipForm) {

  const [loader, setloader] = useState(true)
  const [woocomData, setwoocomData] = useState<WoocomOrder>();

  const [sourceData, setSourceData] = useState<SourceData>({
    first_name: "",
    address_line1: "",
    address_line2: "",
    pincode: "",
    city: "",
    state: "",
    primary_contact_number: "",
    landmark: "",
    email_id: ""
  });

  const [sourceLocationCode, setSourceLocationCode] = useState('');

  const [returnData, setReturnData] = useState<SourceData>({
    first_name: "",
    address_line1: "",
    address_line2: "",
    pincode: "",
    city: "",
    state: "",
    primary_contact_number: "",
    landmark: "",
    email_id: ""
  });
  const [returnLocationCode, setReturnLocationCode] = useState('');

  const [destinationData, setDestinationData] = useState<DestinationData>({
    first_name: "",
    address_line1: "",
    address_line2: "",
    pincode: "",
    city: "",
    state: "",
    primary_contact_number: "",
    landmark: "",
    email_id: "",
    alternate_contact_number: ""
  });

  const [sameAddressCheck, setSameAddressCheck] = useState(false);

  const [shipmentItemDetail, setShipmentItemDetail] = useState<ShipmentItemDetail>({
    product_id: '',
    product_title: '',
    category: '',
    quantity: 1,
    total_tax_value: 0,
    total_sale_value: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    discount: 0,
    seller_reg_name: '',
    gstin_id: '',
    hsn: '',
    ern: '',
    order_id: '',
    invoice_id: '',
    item_dimensions: '',
    brand_name: '',
    eway_bill_number: '',
    tracking_id: '',
  });
  const [handlingAttrisDangerous, setHandlingAttrisDangerous] = useState(false);
  const [handlingAttrisFragile, setHandlingAttrisFragile] = useState(false);

  const [shipmentDimension, setShipmentDimension] = useState<ShipmentDimension>({
    length: 0,
    height: 0,
    weight: 0,
    breadth: 0,
  });

  useEffect(() => {
    setloader(true);
    if(data){
      setloader(false);
    }
  }, [])

  const onSameReturnAdd = () => {
    if (!sameAddressCheck) {
      setSameAddressCheck(true);
      setReturnData({ ...sourceData });
    }
    else {
      setSameAddressCheck(false);
    }
  }

  const oncreateShipment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const data = {
    //     client_name: 'SPL',
    //     services: [
    //         {
    //             service_code: "REGULAR",
    //             service_details: [
    //                 {
    //                     service_leg: "FORWARD",
    //                     service_data: {
    //                         vendor_name: 'ELART',
    //                         amount_to_collect: shipmentItemDetail.total_sale_value,
    //                         delivery_type: "LARGE",
    //                         source: {
    //                             location_code: sourceLocationCode,
    //                             address: {
    //                                 first_name: sourceData.first_name,
    //                                 address_line1: sourceData.address_line1,
    //                                 address_line2: sourceData.address_line2,
    //                                 pincode: sourceData.pincode,
    //                                 city: sourceData.city,
    //                                 state: sourceData.state,
    //                                 primary_contact_number: sourceData.primary_contact_number,
    //                                 landmark: sourceData.landmark,
    //                                 email_id: sourceData.email_id
    //                             }
    //                         },
    //                         destination: {
    //                             address: {
    //                                 first_name: destinationData.first_name,
    //                                 address_line1: destinationData.address_line1,
    //                                 address_line2: destinationData.address_line2,
    //                                 pincode: destinationData.pincode,
    //                                 city: destinationData.city,
    //                                 state: destinationData.state,
    //                                 primary_contact_number: destinationData.primary_contact_number,
    //                                 landmark: destinationData.landmark,
    //                                 email_id: destinationData.email_id,
    //                                 alternate_contact_number: destinationData.alternate_contact_number
    //                             }
    //                         },
    //                         return_location: {
    //                             location_code: returnLocationCode,
    //                             address: {
    //                                 first_name: returnData.first_name,
    //                                 address_line1: returnData.address_line1,
    //                                 address_line2: returnData.address_line2,
    //                                 pincode: returnData.pincode,
    //                                 city: returnData.city,
    //                                 state: returnData.state,
    //                                 primary_contact_number: returnData.primary_contact_number,
    //                                 landmark: returnData.landmark,
    //                                 email_id: returnData.email_id
    //                             }
    //                         }
    //                     },
    //                     shipment: {
    //                         client_reference_id: shipmentItemDetail.tracking_id,
    //                         return_label_desc_1: shipmentItemDetail.product_title,
    //                         return_label_desc_2: shipmentItemDetail.product_title,
    //                         tracking_id: shipmentItemDetail.tracking_id,
    //                         shipment_value: 1657,
    //                         shipment_items: [
    //                             {
    //                                 product_id: shipmentItemDetail.product_id,
    //                                 product_title: shipmentItemDetail.product_title,
    //                                 category: shipmentItemDetail.category,
    //                                 quantity: 1,
    //                                 cost: {
    //                                     total_tax_value: shipmentItemDetail.total_tax_value,
    //                                     total_sale_value: shipmentItemDetail.total_sale_value,
    //                                     tax_breakup: {
    //                                         cgst: shipmentItemDetail.cgst,
    //                                         sgst: shipmentItemDetail.sgst,
    //                                         igst: shipmentItemDetail.igst
    //                                     },
    //                                     hsn: shipmentItemDetail.hsn,
    //                                     ern: shipmentItemDetail.ern,
    //                                     discount: shipmentItemDetail.discount,
    //                                     item_attributes: [
    //                                         {
    //                                             name: "order_id",
    //                                             value: shipmentItemDetail.order_id
    //                                         },
    //                                         {
    //                                             name: "invoice_id",
    //                                             value: shipmentItemDetail.invoice_id
    //                                         },
    //                                         {
    //                                             name: "item_dimensions",
    //                                             value: `${shipmentDimension.length} : ${shipmentDimension.breadth} : ${shipmentDimension.height} : ${shipmentDimension.weight}`
    //                                         },
    //                                         {
    //                                             name: "brand_name",
    //                                             value: shipmentItemDetail.brand_name
    //                                         },
    //                                         {
    //                                             name: "eway_bill_number",
    //                                             value: shipmentItemDetail.eway_bill_number
    //                                         }
    //                                     ],
    //                                     handling_attributes: [
    //                                         {
    //                                             name: "isDangerous",
    //                                             value: handlingAttrisDangerous
    //                                         },
    //                                         {
    //                                             name: "isFragile",
    //                                             value: handlingAttrisFragile
    //                                         }
    //                                     ],
    //                                     seller_details: {
    //                                         seller_reg_name: "Super Plastronics Private Limited",
    //                                         gstin_id: shipmentItemDetail.gstin_id
    //                                     }
    //                                 }
    //                             }
    //                         ],
    //                         shipment_dimensions: {
    //                             length: {
    //                                 value: shipmentDimension.length
    //                             },
    //                             height: {
    //                                 value: shipmentDimension.height
    //                             },
    //                             weight: {
    //                                 value: shipmentDimension.weight
    //                             },
    //                             breadth: {
    //                                 value: shipmentDimension.breadth
    //                             }
    //                         }
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // }

    //   await fetch('https://staging.ekartlogistics.com/v2/shipment', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type' : 'application/json',
    //     'HTTP_X_MERCHANT_CODE': 'SPL',
    //     'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJla2wtZHVyaW4tc3RhZ2UiLCJhdWQiOiJ7XCJtZXJjaGFudFwiOlwiU1BMXCJ9IiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInNjb3BlIjpbInVzZXIucHJvZmlsZSJdLCJpc3MiOiJodHRwczovL3NlcnZpY2UuYXV0aG4tcHJvZC5ma2Nsb3VkLmluIiwiZXhwIjoxNjkwNTMxNzE2LCJpYXQiOjE2OTA1MjgyNDIsImp0aSI6ImE2NGZlNzgyLTczNWUtNDIzNi04YWI1LWQyOGVkMWIxOWI2NSIsImNsaWVudF9pZCI6ImVrbC1kdXJpbi1zdGFnZSJ9.Epb2M1uyc5sd9467F1dCbAHaJ9ToOyNaaHBHH0BpZfiaRTD4nqkBHbczthBZVcoodl8HmRviO_xOaN99otnwee2FmkX9pSc5P5Lx2ztn9l0dmxUY17fhcVRAoJuI0t5FDtKBeNLB7mDHYKIuhkh22QCsqx-RS9RoMsrqt7aQA1lZFdRijzF-8-sitRGCbgkay5ZEgfvG71Md9pxLYmPWCa9k8z4GLpUvpoKzwgqHr95JhQQx8FbLQMvN5ypi0ANV_hkW2QYN9f75Mxd8AxeBXzdZ6U_6DBI6lOiC_heeGA0xAywdb8ZKMuaQ0XIvK-YfUVABIdF6a_k3HDWS1UTUQQ'
    //   },
    //   mode: 'no-cors',
    //   body: JSON.stringify(data)
    // }).then(res => res.json())
    //   .then(res => {
    //     console.log(res);

    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    //   console.log(data)
  };

  if (loader) {
    return <div>Loading...</div>;
  }
  return (
    <form onSubmit={oncreateShipment}>
      

      <div className="form-partition">
        <div className="form-partition-heading">
          <div className="uppercase font-semibold text-lg pt-5">Source Address </div>
        </div>

        <div className="form-inp-part">
          <div className="mb-4 form-outer-div">
            <label htmlFor="sourceLocationCode" className="form-label ">Source Location Code</label>
            <input type="text" name="sourceLocationCode" className="form-inp" placeholder="Source Location Code"
              onChange={(e) => setSourceLocationCode(e.target.value)}
              value={'' || sourceLocationCode} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="first_name" className="form-label ">Name*</label>
            <input type="text" name="first_name" className="form-inp" required placeholder="Name of the Seller"
              onChange={(e) => setSourceData({ ...sourceData, first_name: e.target.value })}
              value={'' || sourceData.first_name} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="address_line1" className="form-label ">Address Line 1*</label>
            <input type="text" name="address_line1" className="form-inp" required placeholder="Address"
              onChange={(e) => setSourceData({ ...sourceData, address_line1: e.target.value })}
              value={'' || sourceData.address_line1} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="address_line2" className="form-label ">Address Line 2</label>
            <input type="text" name="address_line2" className="form-inp" placeholder="Address"
              onChange={(e) => setSourceData({ ...sourceData, address_line2: e.target.value })}
              value={'' || sourceData.address_line2} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="pincode" className="form-label ">Pincode*</label>
            <input type="text" name="pincode" className="form-inp" required placeholder="Pincode"
              onChange={(e) => setSourceData({ ...sourceData, pincode: e.target.value })}
              value={'' || sourceData.pincode} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="city" className="form-label ">City*</label>
            <input type="text" name="city" className="form-inp" required placeholder="City"
              onChange={(e) => setSourceData({ ...sourceData, city: e.target.value })}
              value={'' || sourceData.city} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="state" className="form-label ">State*</label>
            <input type="text" name="state" className="form-inp" required placeholder="State"
              onChange={(e) => setSourceData({ ...sourceData, state: e.target.value })}
              value={'' || sourceData.state} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="primary_contact_number" className="form-label ">Primary Contact Number*</label>
            <input type="tel" name="primary_contact_number" className="form-inp" required placeholder="Primary Contact Number"
              onChange={(e) => setSourceData({ ...sourceData, primary_contact_number: e.target.value })}
              value={'' || sourceData.primary_contact_number} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="landmark" className="form-label ">Landmark</label>
            <input type="text" name="landmark" className="form-inp" placeholder="Landmark"
              onChange={(e) => setSourceData({ ...sourceData, landmark: e.target.value })}
              value={'' || sourceData.landmark} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="email_id" className="form-label ">Email ID</label>
            <input type="email" name="email_id" className="form-inp" placeholder="Email ID"
              onChange={(e) => setSourceData({ ...sourceData, email_id: e.target.value })}
              value={'' || sourceData.email_id} />
          </div>
        </div>

      </div>

      <div className="form-partition">
        <div className="form-partition-heading">
          <div className="uppercase font-semibold text-lg pt-5">Return Address </div>
          <div className="mb-4 mt-3 form-outer-div checkbox-inline cursor-pointer ps-3">
            <input className="form-inp-check" type="checkbox" name="sameAddCheck" id="sameAddCheck"
              onChange={onSameReturnAdd} />
            <label className="form-label" htmlFor="sameAddCheck">
              Same as Source Address
            </label>
          </div>

        </div>

        {
          !sameAddressCheck ?
            <div className="form-inp-part">
              <div className="mb-4 form-outer-div">
                <label htmlFor="returnLocationCode" className="form-label ">Return Location Code</label>
                <input type="text" name="returnLocationCode" className="form-inp" placeholder="Return Location Code"
                  onChange={(e) => setReturnLocationCode(e.target.value)}
                  value={'' || returnLocationCode} />
              </div>
              <div className="mb-4 form-outer-div">
                <label htmlFor="first_name" className="form-label ">Name*</label>
                <input type="text" name="first_name" className="form-inp" required placeholder="Name of the Seller"
                  onChange={(e) => setReturnData({ ...returnData, first_name: e.target.value })}
                  value={'' || returnData.first_name} />
              </div>
              <div className="mb-4 form-outer-div">
                <label htmlFor="address_line1" className="form-label ">Address Line 1*</label>
                <input type="text" name="address_line1" className="form-inp" required placeholder="Address"
                  onChange={(e) => setReturnData({ ...returnData, address_line1: e.target.value })}
                  value={'' || returnData.address_line1} />
              </div>
              <div className="mb-4 form-outer-div">
                <label htmlFor="address_line2" className="form-label ">Address Line 2</label>
                <input type="text" name="address_line2" className="form-inp" placeholder="Address"
                  onChange={(e) => setReturnData({ ...returnData, address_line2: e.target.value })}
                  value={'' || returnData.address_line2} />
              </div>
              <div className="mb-4 form-outer-div">
                <label htmlFor="pincode" className="form-label ">Pincode*</label>
                <input type="text" name="pincode" className="form-inp" required placeholder="Pincode"
                  onChange={(e) => setReturnData({ ...returnData, pincode: e.target.value })}
                  value={'' || returnData.pincode} />
              </div>
              <div className="mb-4 form-outer-div">
                <label htmlFor="city" className="form-label ">City*</label>
                <input type="text" name="city" className="form-inp" required placeholder="City"
                  onChange={(e) => setReturnData({ ...returnData, city: e.target.value })}
                  value={'' || returnData.city} />
              </div>
              <div className="mb-4 form-outer-div">
                <label htmlFor="state" className="form-label ">State*</label>
                <input type="text" name="state" className="form-inp" required placeholder="State"
                  onChange={(e) => setReturnData({ ...returnData, state: e.target.value })}
                  value={'' || returnData.state} />
              </div>
              <div className="mb-4 form-outer-div">
                <label htmlFor="primary_contact_number" className="form-label ">Primary Contact Number*</label>
                <input type="tel" name="primary_contact_number" className="form-inp" required placeholder="Primary Contact Number"
                  onChange={(e) => setReturnData({ ...returnData, primary_contact_number: e.target.value })}
                  value={'' || returnData.primary_contact_number} />
              </div>
              <div className="mb-4 form-outer-div">
                <label htmlFor="landmark" className="form-label ">Landmark</label>
                <input type="text" name="landmark" className="form-inp" placeholder="Landmark"
                  onChange={(e) => setReturnData({ ...returnData, landmark: e.target.value })}
                  value={'' || returnData.landmark} />
              </div>
              <div className="mb-4 form-outer-div">
                <label htmlFor="email_id" className="form-label ">Email ID</label>
                <input type="email" name="email_id" className="form-inp" placeholder="Email ID"
                  onChange={(e) => setReturnData({ ...returnData, email_id: e.target.value })}
                  value={'' || returnData.email_id} />
              </div>
            </div>
            : null
        }


      </div>

      <div className="form-partition">
        <div className="form-partition-heading">
          <div className="uppercase font-semibold text-lg pt-5">destination Address </div>
        </div>

        <div className="form-inp-part">

          <div className="mb-4 form-outer-div">
            <label htmlFor="first_name" className="form-label ">Name*</label>
            <input type="text" name="first_name" className="form-inp" required placeholder="Name of the Seller"
              onChange={(e) => setDestinationData({ ...destinationData, first_name: e.target.value })}
              value={'' || destinationData.first_name} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="email_id" className="form-label ">Email ID</label>
            <input type="email" name="email_id" className="form-inp" placeholder="Email ID"
              onChange={(e) => setDestinationData({ ...destinationData, email_id: e.target.value })}
              value={'' || destinationData.email_id} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="address_line1" className="form-label ">Address Line 1*</label>
            <input type="text" name="address_line1" className="form-inp" required placeholder="Address"
              onChange={(e) => setDestinationData({ ...destinationData, address_line1: e.target.value })}
              value={'' || destinationData.address_line1} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="address_line2" className="form-label ">Address Line 2</label>
            <input type="text" name="address_line2" className="form-inp" placeholder="Address"
              onChange={(e) => setDestinationData({ ...destinationData, address_line2: e.target.value })}
              value={'' || destinationData.address_line2} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="pincode" className="form-label ">Pincode*</label>
            <input type="text" name="pincode" className="form-inp" required placeholder="Pincode"
              onChange={(e) => setDestinationData({ ...destinationData, pincode: e.target.value })}
              value={'' || destinationData.pincode} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="city" className="form-label ">City*</label>
            <input type="text" name="city" className="form-inp" required placeholder="City"
              onChange={(e) => setDestinationData({ ...destinationData, city: e.target.value })}
              value={'' || destinationData.city} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="state" className="form-label ">State*</label>
            <input type="text" name="state" className="form-inp" required placeholder="State"
              onChange={(e) => setDestinationData({ ...destinationData, state: e.target.value })}
              value={'' || destinationData.state} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="primary_contact_number" className="form-label ">Primary Contact Number*</label>
            <input type="tel" name="primary_contact_number" className="form-inp" required placeholder="Primary Contact Number"
              onChange={(e) => setDestinationData({ ...destinationData, primary_contact_number: e.target.value })}
              value={'' || destinationData.primary_contact_number} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="alternate_contact_number" className="form-label ">Alternate Contact Number</label>
            <input type="tel" name="alternate_contact_number" className="form-inp" placeholder="Alternate Contact Number"
              onChange={(e) => setDestinationData({ ...destinationData, alternate_contact_number: e.target.value })}
              value={'' || destinationData.alternate_contact_number} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="landmark" className="form-label ">Landmark</label>
            <input type="text" name="landmark" className="form-inp" placeholder="Landmark"
              onChange={(e) => setDestinationData({ ...destinationData, landmark: e.target.value })}
              value={'' || destinationData.landmark} />
          </div>

        </div>

      </div>

      <div className="form-partition">
        <div className="form-partition-heading">
          <div className="uppercase font-semibold text-lg pt-5">Shipment Item Details</div>


          <div className="note-part mt-5 text-sm pe-10 text-gray-300">
            <strong>Note : </strong>Tracking ID Format<br />
            1. Merchant Code - SPL<br />
            2. P - Prepaid, C - COD(cash on Delivery), R - Reverse<br />
            3. Unique Id - 10 digit unique code<br />
            The tracking ID is a unique ID formed by the combination of the above 3 components.ex: <span className="bg-purple-400 text-black p-1">SPLC0000010055, SPLP0000010056</span>, etc.
          </div>
        </div>

        <div className="form-inp-part">

          <div className="mb-4 form-outer-div">
            <label htmlFor="product_id" className="form-label ">Product ID*</label>
            <input type="text" name="product_id" className="form-inp" required placeholder="Product ID"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, product_id: e.target.value })}
              value={'' || shipmentItemDetail.product_id} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="product_title" className="form-label ">Product Title*</label>
            <input type="text" name="product_title" className="form-inp" placeholder="Product Title"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, product_title: e.target.value })}
              value={'' || shipmentItemDetail.product_title} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="category" className="form-label ">Category*</label>
            <input type="text" name="category" className="form-inp" required placeholder="Category"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, category: e.target.value })}
              value={'' || shipmentItemDetail.category} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="brand_name" className="form-label ">Brand Name</label>
            <input type="text" name="brand_name" className="form-inp" placeholder="Brand Name"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, brand_name: e.target.value })}
              value={'' || shipmentItemDetail.brand_name} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="length" className="form-label ">Product Lenght</label>
            <input type="text" name="length" className="form-inp" placeholder="Product Lenght"
              onChange={(e) => setShipmentDimension({ ...shipmentDimension, length: parseFloat(e.target.value) })}
              value={shipmentDimension.length.toString()} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="height" className="form-label ">Product Height</label>
            <input type="text" name="height" className="form-inp" placeholder="Product Height"
              onChange={(e) => setShipmentDimension({ ...shipmentDimension, height: parseFloat(e.target.value) })}
              value={'' || shipmentDimension.height} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="weight" className="form-label ">Product Weight</label>
            <input type="text" name="weight" className="form-inp" placeholder="Product Weight"
              onChange={(e) => setShipmentDimension({ ...shipmentDimension, weight: parseFloat(e.target.value) })}
              value={'' || shipmentDimension.weight} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="breadth" className="form-label ">Product Breadth</label>
            <input type="text" name="breadth" className="form-inp" placeholder="Product Breadth"
              onChange={(e) => setShipmentDimension({ ...shipmentDimension, breadth: parseFloat(e.target.value) })}
              value={'' || shipmentDimension.breadth} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="total_tax_value" className="form-label ">Total Tax Value</label>
            <input type="number" name="total_tax_value" className="form-inp" required placeholder="Total Tax Value"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, total_tax_value: parseFloat(e.target.value) })}
              value={shipmentItemDetail.total_tax_value} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="total_sale_value" className="form-label ">Total Sale Value*</label>
            <input type="number" name="total_sale_value" className="form-inp" required placeholder="Total Sale Value"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, total_sale_value: parseFloat(e.target.value) })}
              value={shipmentItemDetail.total_sale_value} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="cgst" className="form-label ">CGST*</label>
            <input type="number" name="cgst" className="form-inp" required placeholder="CGST"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, cgst: parseFloat(e.target.value) })}
              value={shipmentItemDetail.cgst} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="sgst" className="form-label ">SGST*</label>
            <input type="number" name="sgst" className="form-inp" required placeholder="SGST"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, sgst: parseFloat(e.target.value) })}
              value={shipmentItemDetail.sgst} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="igst" className="form-label ">IGST*</label>
            <input type="number" name="igst" className="form-inp" required placeholder="IGST"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, igst: parseFloat(e.target.value) })}
              value={shipmentItemDetail.igst} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="discount" className="form-label ">Discount</label>
            <input type="number" name="discount" className="form-inp" placeholder="Discount"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, discount: parseFloat(e.target.value) })}
              value={shipmentItemDetail.discount} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="gstin_id" className="form-label ">GST NO</label>
            <input type="text" name="gstin_id" className="form-inp" required placeholder="GST NO"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, gstin_id: e.target.value })}
              value={'' || shipmentItemDetail.gstin_id} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="hsn" className="form-label ">HSN</label>
            <input type="text" name="hsn" className="form-inp" placeholder="HSN"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, hsn: e.target.value })}
              value={'' || shipmentItemDetail.hsn} />
          </div>

          <div className="mb-4 form-outer-div">
            <label htmlFor="ern" className="form-label ">ERN</label>
            <input type="text" name="ern" className="form-inp" placeholder="ERN"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, ern: e.target.value })}
              value={'' || shipmentItemDetail.ern} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="order_id" className="form-label ">Order ID</label>
            <input type="text" name="order_id" className="form-inp" required placeholder="Order ID"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, order_id: e.target.value })}
              value={'' || shipmentItemDetail.order_id} />
          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="invoice_id" className="form-label ">Invoice ID</label>
            <input type="text" name="invoice_id" className="form-inp" placeholder="Invoice ID"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, invoice_id: e.target.value })}
              value={'' || shipmentItemDetail.invoice_id} />
          </div>

          <div className="mb-4 form-outer-div">
            <label htmlFor="eway_bill_number" className="form-label ">EWAY Bill Number</label>
            <input type="text" name="eway_bill_number" className="form-inp" placeholder="EWAY Bill Number"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, eway_bill_number: e.target.value })}
              value={'' || shipmentItemDetail.eway_bill_number} />
          </div>

          <div className="mb-4 form-outer-div">
            <label htmlFor="tracking_id" className="form-label ">Tracking ID</label>
            <input type="text" name="tracking_id" className="form-inp" placeholder="Tracking ID"
              onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, tracking_id: e.target.value })}
              value={'' || shipmentItemDetail.tracking_id} />
          </div>

          <div>
            <div className="mb-4 mt-3 form-outer-div checkbox-inline cursor-pointer ps-3">
              <input className="form-inp-check" type="checkbox" name="isDangerous" id="isDangerous"
                onChange={(e) => setHandlingAttrisDangerous(!handlingAttrisDangerous)} />
              <label className="form-label" htmlFor="isDangerous">
                isDangerous
              </label>
            </div>
            <div className="mb-4 mt-3 form-outer-div checkbox-inline cursor-pointer ps-3">
              <input className="form-inp-check" type="checkbox" name="isFragile" id="isFragile"
                onChange={(e) => setHandlingAttrisFragile(!handlingAttrisFragile)} />
              <label className="form-label" htmlFor="isFragile">
                isFragile
              </label>
            </div>
          </div>

        </div>

      </div>

      <div className="submit-part mt-4 flex justify-center">
        <button type="submit" className="btn-main">Submit</button>
      </div>

    </form>
  )
}
