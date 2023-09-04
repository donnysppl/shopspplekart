"use client";

import { useEffect, useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// import ShipmentForm from "@/components/forms/ShipmentForm";
import {
    WoocomOrder, ProductWoocom,
    SourceData,
    DestinationData,
    ShipmentItemDetail,
    ShipmentDimension
} from "@/interface/interface";
import Loader from "@/components/Loader";
import Swal from 'sweetalert2';
import Unauthorized from "@/helper/Unauthorize";

type ParamsType = {
    id: string,
}


// - Source / Return PIN code: 400066
// - Destination PIN code: 848125
const WooCommerce = new WooCommerceRestApi({
    url: "https://shopsppl.in",
    consumerKey: "ck_362c79346df5045a8354633e29ca4433364baa75",
    consumerSecret: "cs_7efa0e005bd7816f0f80708a2aad8c4aaddfde46",
    version: "wc/v3"
});

export default function WoocomShip({ params }: { params: ParamsType }) {

    const [woocomPerOrderData, setwoocomPerOrderData] = useState([]);
    const [loader, setloader] = useState(true);
    const [woocomProdId, setwoocomProdId] = useState();
    const [wooProductFilt, setwooProductFilt] = useState<ProductWoocom>()

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
        value: 0
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

        const woocomPerData = async () => {
            setloader(true);
            WooCommerce.get(`orders/${params.id}`)
                .then((response) => {
                    console.log(response.data);
                    if (response.status === 200) {
                        setwoocomPerOrderData(response.data);
                        dataValueInp(response.data);
                        wooComOrderProd(response.data.line_items[0].product_id)
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

        const wooComOrderProd = async (id: number) => {
            WooCommerce.get(`products/${id}`)
                .then((response) => {
                    console.log(response.data)
                    if (response.status === 200) {
                        setwooProductFilt(response.data);
                        dataValuInpPro(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

        const dataValueInp = (data: WoocomOrder) => {
            setDestinationData({
                first_name: data.billing.first_name + data.billing.last_name,
                address_line1: data.billing.address_1,
                address_line2: data.billing.address_2,
                pincode: data.billing.postcode,
                city: data.billing.city,
                state: data.billing.state,
                primary_contact_number: data.billing.phone,
                landmark: '',
                email_id: data.billing.email,
                alternate_contact_number: ''
            });
            if (data && data.line_items && data.line_items[0]) {

                setShipmentItemDetail((shipmentItemDetail) => ({
                    ...shipmentItemDetail,
                    product_id: data.line_items[0].sku,
                    product_title: data.line_items[0].name,
                    total_sale_value: parseInt(data.line_items[0].total),
                    quantity: 1,
                    order_id: `SP${data.id}PL`,
                    value: parseInt(data.line_items[0].total),
                }))
            }
        }

        const dataValuInpPro = (data: ProductWoocom) => {
            setShipmentItemDetail((shipmentItemDetail) => ({
                ...shipmentItemDetail,
                category: data.categories[0].name,
                brand_name: data.etheme_brands[0].name,
                item_dimensions: `${data.dimensions.length}:${data.dimensions.width}:${data.dimensions.height}:${data.weight}`,
            }))
            setShipmentDimension({
                length: parseInt(data.dimensions.length),
                height: parseInt(data.dimensions.height),
                weight: parseInt(data.weight),
                breadth: parseInt(data.dimensions.width),
            })
            setloader(false);
        }

        woocomPerData();

    }, [params.id])


    const oncreateShipment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const data = {
            client_name: 'SPL',
            services: [
                {
                    service_code: "REGULAR",
                    service_details: [
                        {
                            service_leg: "FORWARD",
                            service_data: {
                                vendor_name: 'EKART',
                                amount_to_collect: 0,
                                delivery_type: "LARGE",
                                source: {
                                    location_code: sourceLocationCode,
                                    // address: {
                                    //     first_name: sourceData.first_name,
                                    //     address_line1: sourceData.address_line1,
                                    //     address_line2: sourceData.address_line2,
                                    //     pincode: sourceData.pincode,
                                    //     city: sourceData.city,
                                    //     state: sourceData.state,
                                    //     primary_contact_number: sourceData.primary_contact_number,
                                    //     landmark: sourceData.landmark,
                                    //     email_id: sourceData.email_id
                                    // }
                                },
                                destination: {
                                    address: {
                                        first_name: destinationData.first_name,
                                        address_line1: destinationData.address_line1,
                                        address_line2: destinationData.address_line2,
                                        pincode: destinationData.pincode,
                                        city: destinationData.city,
                                        state: destinationData.state,
                                        primary_contact_number: destinationData.primary_contact_number,
                                        landmark: destinationData.landmark,
                                        email_id: destinationData.email_id,
                                        alternate_contact_number: destinationData.alternate_contact_number
                                    }
                                },
                                return_location: {
                                    location_code: sourceLocationCode,
                                    // address: {
                                    //     first_name: sourceData.first_name,
                                    //     address_line1: sourceData.address_line1,
                                    //     address_line2: sourceData.address_line2,
                                    //     pincode: sourceData.pincode,
                                    //     city: sourceData.city,
                                    //     state: sourceData.state,
                                    //     primary_contact_number: sourceData.primary_contact_number,
                                    //     landmark: sourceData.landmark,
                                    //     email_id: sourceData.email_id
                                    // }
                                }
                            },
                            shipment: {
                                client_reference_id: shipmentItemDetail.tracking_id,
                                return_label_desc_1: shipmentItemDetail.product_title,
                                return_label_desc_2: shipmentItemDetail.product_title,
                                tracking_id: shipmentItemDetail.tracking_id,
                                shipment_value: shipmentItemDetail.value,
                                shipment_items: [
                                    {
                                        product_id: shipmentItemDetail.product_id,
                                        product_title: shipmentItemDetail.product_title,
                                        category: shipmentItemDetail.category,
                                        quantity: 1,
                                        cost: {
                                            total_tax_value: shipmentItemDetail.total_tax_value,
                                            total_sale_value: shipmentItemDetail.total_sale_value,
                                            tax_breakup: {
                                                cgst: shipmentItemDetail.cgst,
                                                sgst: shipmentItemDetail.sgst,
                                                igst: shipmentItemDetail.igst
                                            }
                                        },
                                        hsn: shipmentItemDetail.hsn,
                                        ern: shipmentItemDetail.ern,
                                        discount: shipmentItemDetail.discount,
                                        item_attributes: [
                                            {
                                                name: "order_id",
                                                value: shipmentItemDetail.order_id
                                            },
                                            {
                                                name: "invoice_id",
                                                value: shipmentItemDetail.invoice_id
                                            },
                                            {
                                                name: "item_dimensions",
                                                value: `${shipmentDimension.length} : ${shipmentDimension.breadth} : ${shipmentDimension.height} : ${shipmentDimension.weight}`
                                            },
                                            {
                                                name: "brand_name",
                                                value: shipmentItemDetail.brand_name
                                            },
                                            {
                                                name: "eway_bill_number",
                                                value: shipmentItemDetail.eway_bill_number
                                            }
                                        ],
                                        handling_attributes: [
                                            {
                                                name: "isDangerous",
                                                value: handlingAttrisDangerous
                                            },
                                            {
                                                name: "isFragile",
                                                value: handlingAttrisFragile
                                            }
                                        ],
                                        seller_details: {
                                            seller_reg_name: "Super Plastronics Private Limited",
                                            gstin_id: shipmentItemDetail.gstin_id
                                        }

                                    }
                                ],
                                shipment_dimensions: {
                                    length: {
                                        value: shipmentDimension.length
                                    },
                                    height: {
                                        value: shipmentDimension.height
                                    },
                                    weight: {
                                        value: shipmentDimension.weight
                                    },
                                    breadth: {
                                        value: shipmentDimension.breadth
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }

        console.log(data)

        await fetch('/api/ekart-shipment/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "HTTP_X_MERCHANT_CODE": "SPL",
                "Authorization": `${token}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: res.message
                    })
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.message
                })
            })


    };

    return (
        <div className="container mx-auto p-8">
            <div className="border border-gray-500 p-8 rounded-2xl">
                <h2 className="text-center">Create Shipment Woocommerce Product </h2>
                <div className="text-center">Order ID : SP{params.id}PL</div>
                <div>
                    - Source / Return PIN code: 400066
                    - Destination PIN code: 848125
                    Invoice No.MH/228/2023-24

                </div>


                <div className={`relative ${loader ? "w-full h-[500px]" : null}`}>
                    {
                        loader ? <Loader /> :

                            <form onSubmit={oncreateShipment}>



                                <div className="form-partition">
                                    <div className="form-partition-heading">
                                        <div className="uppercase font-semibold text-lg pt-5">Source Address </div>
                                    </div>

                                    <div className="form-inp-part">
                                        <div className="mb-4 form-outer-div">
                                            <label htmlFor="sourceLocationCode" className="form-label ">Source Location Code</label>
                                            {/* <input type="text" name="sourceLocationCode" className="form-inp" placeholder="Source Location Code"
                                                onChange={(e) => setSourceLocationCode(e.target.value)}
                                                value={'' || sourceLocationCode} /> */}
                                            <select className="form-inp" placeholder="Source Location Code"
                                                onChange={(e) => setSourceLocationCode(e.target.value)}
                                                value={'' || sourceLocationCode} >
                                                <option selected>Select The Location</option>
                                                <option value="SPL_BLR_01">Bengaluru / SPL_BLR_01</option>
                                                <option value="SPL_HYD_02">Hyderabad / SPL_HYD_02</option>
                                                <option value="SPL_THA_03">Thane(Maharashtra) / SPL_THA_03</option>
                                                <option value="SPL_HOW_04">Kolkata / SPL_HOW_04</option>
                                                <option value="SPL_NOI_05">Noida / SPL_NOI_05</option>
                                            </select>
                                        </div>
                                        {/* <div className="mb-4 form-outer-div">
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
                                        </div> */}
                                    </div>

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
                                            <label htmlFor="value" className="form-label ">Value</label>
                                            <input type="number" name="value" className="form-inp" placeholder="value"
                                                onChange={(e) => setShipmentItemDetail({ ...shipmentItemDetail, value: parseFloat(e.target.value) })}
                                                value={shipmentItemDetail.value} />
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
                                            <input type="text" name="invoice_id" className="form-inp" placeholder="Invoice ID" required
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
                                            <input type="text" name="tracking_id" className="form-inp" placeholder="Tracking ID" required
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
                    }
                </div>

            </div>

        </div>
    )
}
