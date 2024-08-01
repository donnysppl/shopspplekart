"use client";
import { useRef } from 'react';
import Barcode from 'react-barcode'
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Swal from 'sweetalert2';
import { priceFormat } from '@/helper/Common';

interface AddressData {
    first_name: string;
    address_line1: string;
    address_line2: string;
    pincode: string;
    city: string;
    state: string;
    primary_contact_number: string;
    landmark?: string;
    email_id?: string;
    alternate_contact_number?: string;
}

interface GlobalData {
    client_reference_id: string;
    tracking_id: string;
    shipment_value: string;
    cost: {
        total_tax_value: string;
        total_sale_value: string;
        tax_breakup: {
            cgst: string;
            sgst: string;
            igst: string;
        };
    };
    attributes: {
        name: string;
        value: string;
    }[];
    hsn: string;
    ern: string;
    total_weight: string;
    seller_details: {
        seller_reg_name: string;
        gstin_id: string;
    };
}

interface ShipmentItem {
    product_id: string;
    product_title: string;
    category: string;
    handling_attributes: {
        name: string;
        value: string;
    }[];
}

interface ShipmentDimensions {
    length: {
        value: string;
    };
    height: {
        value: string;
    };
    weight: {
        value: string;
    };
    breadth: {
        value: string;
    };
}

interface ShipmentData {
    tracking_id: string;
    shipment_items: ShipmentItem[];
    shipment_dimensions: ShipmentDimensions;
}

const sourceData = {
    first_name: "SUPER PLASTRONICS PVT LTD",
    address_line1: "Shree Sai Warehousing Park Warehouse No.C, Surver No.167 and 68/2 Paiki,Village-Padgha,Taluka-Bhiwandi Bhiwandi",
    address_line2: "NEAR NARIMANPURA VILLAGE, DHOLKA ROAD, Ahmedabad",
    pincode: "421101",
    city: "Thane",
    state: "Maharashtra",
    primary_contact_number: "8460293604",
    landmark: "",
    email_id: ""
}

const destiData = {
    first_name: "BRAHME CLOUD ONE ENTERPRISE",
    address_line1: "BRAHME CLOUD ONE ENTERPRISE A/23, Shantinagar, Near Arunachal Soc, Subhanpura, Vadodara",
    address_line2: "BRAHME CLOUD ONE ENTERPRISE A/23, Shantinagar, Near Arunachal Soc, Subhanpura, Vadodara",
    pincode: "390023",
    city: "Gujarat",
    state: "Gujarat",
    primary_contact_number: "9840398208",
    landmark: "",
    email_id: "",
    alternate_contact_number: "8148658686"
}

const globalData = {
    client_reference_id: "SPLN1000000003",
    tracking_id: "SPLN1000000003",
    shipment_value: "31499",
    cost: {
        total_tax_value: "6890",
        total_sale_value: "24608",
        tax_breakup: {
            cgst: "0",
            sgst: "0",
            igst: "6890"
        }
    },
    attributes: [
        {
            name: "order_id",
            value: "SPLE013"
        },
        {
            name: "invoice_id",
            value: "MH/219/2024-25"
        },
        {
            name: "eway_bill_number",
            value: ""
        }
    ],
    hsn: "84151010",
    ern: "",
    total_weight: "35",
    seller_details: {
        seller_reg_name: "Super Plastronics Private Limited",
        gstin_id: "27AACCS1710N2ZB"
    }
}

const shipmentData = [
    {
        tracking_id: "SPLP2000000005",
        shipment_items: [
            {
                product_id: "CPMI1505S",
                product_title: "SPLIT AIR CONDITIONER CPMI1505S 1.5TO THOMSON",
                category: "AIR CONDITIONER",
                handling_attributes: [
                    {
                        name: "isDangerous",
                        value: "false"
                    },
                    {
                        name: "isFragile",
                        value: "true"
                    }
                ]
            }
        ],
        shipment_dimensions: {
            length: {
                value: "80"
            },
            height: {
                value: "23"
            },
            weight: {
                value: "11"
            },
            breadth: {
                value: "30"
            }
        }
    },
    {
        tracking_id: "SPLP2000000006",
        shipment_items: [
            {
                product_id: "CPMI1505S",
                product_title: "SPLIT AIR CONDITIONER CPMI1505S 1.5TO THOMSON",
                category: "AIR CONDITIONER",
                handling_attributes: [
                    {
                        name: "isDangerous",
                        value: "false"
                    },
                    {
                        name: "isFragile",
                        value: "true"
                    }
                ]
            }
        ],
        shipment_dimensions: {
            length: {
                value: "78"
            },
            height: {
                value: "24"
            },
            weight: {
                value: "25"
            },
            breadth: {
                value: "56"
            }
        }
    }
]

export default function MPSLabels() {


    const labelRefs = useRef<(HTMLDivElement | null)[]>([]);


    const createPDF = async () => {
        const pdf = new jsPDF("portrait", "pt", "a4");
        const scale = 1.5;
        for (const labelRef of labelRefs.current) {
            if (labelRef) {
                const canvas = await html2canvas(labelRef, { scale });
                const img = canvas.toDataURL("image/png", 0.8); // Set the quality to 1.0 (highest)
                const imgProperties = pdf.getImageProperties(img);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
                pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.addPage();
            }
        }
        // Remove the last extra page added
        if (pdf.getNumberOfPages() > 1) {
            pdf.deletePage(pdf.getNumberOfPages());
        }
        pdf.save(`shipping_labels.pdf`);
    };



    return (
        <section className='max-w-6xl mx-auto p-1.5'>
            <button className='fixed top-2 left-2 border border-white px-5 py-2' onClick={() => createPDF()}>Download</button>


            {
                shipmentData && shipmentData.map((item, index) => (
                    <div className="mps-label w-full mb-2" key={index} ref={el => labelRefs.current[index] = el}>
                        <div className="w-full bg-white p-5 min-h-screen">
                            <div className="w-full border-2 border-black p-1">

                                <table className="table-fixed ">
                                    <thead>
                                        <tr className='align-bottom'>
                                            <th className='w-1/2'>
                                                <div className='text-black font-semibold text-base text-left p-3'>

                                                    <div>DELIVERY ADDRESS: {destiData.first_name}</div>
                                                    <div>{destiData.address_line1}</div>
                                                    <div>{destiData.city} {destiData.state} {destiData.pincode}</div>
                                                    <div>Contact Number : {destiData.primary_contact_number}</div>
                                                </div>
                                            </th>
                                            <th className='w-1/2'>
                                                <div className='text-black font-semibold text-base text-right p-3'>
                                                    GLOBAL TID - {globalData.tracking_id}
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>

                                <table className="table-fixed border-2 border-black bg-gray-200 w-full">
                                    <thead>
                                        <tr className='align-middle'>
                                            <th className='w-1/2'>
                                                <div className='text-black font-semibold text-base text-left p-2'>
                                                    <div className='w-full'>CourierName : EKART_MPS</div>
                                                    <div className='w-full'>CourierAWBNo : {item.tracking_id}</div>
                                                </div>
                                            </th>
                                            <th className='w-1/2'>
                                                <div className='text-black font-semibold text-base text-right p-2'>
                                                    {index + 1}/{shipmentData.length}
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>

                                <table className='table-fixed w-full'>
                                    <tbody>
                                        <tr >
                                            <td className='align-middle justify-center'>
                                                <Barcode value={`${item.tracking_id}`} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                                <table className="table-fixed border-2 border-black w-full">
                                    <tbody>
                                        <tr className='align-middle'>
                                            <td className='w-full'>
                                                <div className='text-black font-semibold text-sm text-left p-2'>
                                                    <div> Sold By : {sourceData.first_name} {sourceData.address_line1} {sourceData.city} {sourceData.state} {sourceData.pincode}</div>

                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="table-fixed border-2 border-black w-full mb-1.5">
                                    <tbody>
                                        <tr className='align-middle'>
                                            <td className='w-full'>
                                                <div className='text-black font-semibold text-sm text-left p-2'>
                                                    GSTIN : {globalData.seller_details.gstin_id}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table-fixed border-2 border-black bg-gray-200 w-full mb-1.5">
                                    <thead>
                                        <tr className='align-middle'>
                                            <th className='w-full'>
                                                <div className='text-black font-semibold text-base text-left p-2'>
                                                    PREPAID-DO NOT COLLECT CASH
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>

                                <table className="table-auto border-2 border-black border-collapse text-black w-full mb-1.5">
                                    <thead>
                                        <tr className='border-2 border-black text-left'>
                                            <th className='border-2 border-black p-1'>PRODUCT</th>
                                            <th className='border-2 border-black p-1'>QTY</th>
                                            <th className='border-2 border-black p-1'>WT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='border-2 border-black text-left'>
                                            <td className='border-2 border-black p-1'>{item.shipment_items[0].product_title}</td>
                                            <td className='border-2 border-black p-1'>1</td>
                                            <td className='border-2 border-black p-1'>{parseInt(item.shipment_dimensions.weight.value) * 1000} GRAMS</td>
                                        </tr>
                                        <tr className='border-2 border-black text-left'>
                                            <td className='border-2 border-black p-1'>Total</td>
                                            <td className='border-2 border-black p-1'>1</td>
                                            <td className='border-2 border-black p-1'>{parseInt(item.shipment_dimensions.weight.value) * 1000} GRAMS</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table-fixed border-2 border-black bg-gray-200 w-full">
                                    <thead>
                                        <tr className='align-middle'>
                                            <th className='w-full'>
                                                <div className='text-black font-semibold text-sm text-left p-2'>
                                                    <div className='w-full'>Invoice NO : {globalData.attributes[1].value}</div>
                                                    <div className='w-full'>Total Price : {priceFormat(parseInt(globalData.shipment_value))}</div>
                                                    <div className='w-full'>DImensions :
                                                        {item.shipment_dimensions.length.value + ' x ' +
                                                            item.shipment_dimensions.breadth.value + ' x ' +
                                                            item.shipment_dimensions.height.value}
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>

                                <table className='table-fixed w-full'>
                                    <tbody>
                                        <tr >
                                            <td className=''>
                                                <div className='text-black font-semibold text-sm text-left p-2'>
                                                    <div className='w-full'>Handover to EKARTMPS</div>
                                                    <div className='w-full'>TrackingID : {item.tracking_id}</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle justify-center'>
                                                <Barcode value={`${globalData.attributes[0].value}`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle justify-center'>
                                                <div className='text-black font-semibold text-sm text-left p-2'>
                                                    OrderID : {globalData.attributes[0].value}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table-fixed border-2 border-black bg-gray-200 w-full mb-1.5">
                                    <thead>
                                        <tr className='align-middle'>
                                            <th className='w-full'>
                                                <div className='text-black font-semibold text-sm text-left p-2'>
                                                    <div className='w-full'>ReturnAddress:</div>
                                                    <div className='w-full'>{sourceData.first_name} {sourceData.address_line1} {sourceData.city} {sourceData.state} {sourceData.pincode}</div>
                                                    <div className='w-full'>Phone : {sourceData.primary_contact_number}</div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>

                                <table className="table-fixed border-2 border-black  w-full">
                                    <thead>
                                        <tr className='align-middle'>
                                            <th className='w-full'>
                                                <div className='text-black font-semibold text-sm text-left p-2'>
                                                    SO : Arvind kumar (8460293604)
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>

                            </div>
                        </div>
                    </div>
                ))
            }



        </section>
    )
}
