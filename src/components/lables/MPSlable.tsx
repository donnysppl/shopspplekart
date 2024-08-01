"use client";

import { priceFormat } from "@/helper/Common";
import { ShipmentInfo } from "@/interface/interface";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import { BsDownload } from "react-icons/bs";

export default function MPSlable({ sourceData, destiData, globalData, shipmentData,amount }: ShipmentInfo) {

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
        pdf.save(`${globalData?.g_tracking_id}_shipping_labels.pdf`);
    };


    return (
        <section className='max-w-6xl mx-auto p-1.5 relative'>

            <button className=' top-2 left-2 border border-white px-5 py-2 mb-4 w-60 flex justify-center items-center gap-2' onClick={() => createPDF()}>
            <BsDownload /> Download Label</button>

            {
                shipmentData && shipmentData.map((item: any, index: number) => (
                    <div className="mps-label w-full mb-2" key={index}
                        ref={el => labelRefs.current[index] = el}
                    >
                        <div className="w-full bg-white p-5 min-h-screen">
                            <div className="w-full border-2 border-black p-1">

                                <table className="table-fixed ">
                                    <thead>
                                        <tr className='align-bottom'>
                                            <th className='w-1/2'>
                                                <div className='text-black font-semibold text-base text-left p-3'>

                                                    <div>DELIVERY ADDRESS: {destiData?.first_name}</div>
                                                    <div>{destiData?.address_line1}</div>
                                                    <div>{destiData?.city} {destiData?.state} {destiData?.pincode}</div>
                                                    <div>Contact Number : {destiData?.primary_contact_number}</div>
                                                </div>
                                            </th>
                                            <th className='w-1/2'>
                                                <div className='text-black font-semibold text-base text-right p-3'>
                                                    GLOBAL Tracking ID - {globalData?.g_tracking_id}
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
                                                    <div> Sold By : {sourceData?.first_name} {sourceData?.address_line1} {sourceData?.city} {sourceData?.state} {sourceData?.pincode}</div>

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
                                                    GSTIN : {globalData?.gstin_id}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table-fixed border-2 border-black bg-gray-200 w-full mb-1.5">
                                    <thead>
                                        <tr className='align-middle'>
                                            <th className='w-full'>
                                                <div className='text-black font-bold text-base text-left p-2'>
                                                    {
                                                        (amount !== 0) ? `CASH ON DELIVERY, COLLECT CASH ${priceFormat(amount)}` : 'PREPAID-DO NOT COLLECT CASH'
                                                    }
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
                                            <td className='border-2 border-black p-1'>{item.product_title}</td>
                                            <td className='border-2 border-black p-1'>1</td>
                                            <td className='border-2 border-black p-1'>{parseInt(item.weight) * 1000} GRAMS</td>
                                        </tr>
                                        <tr className='border-2 border-black text-left'>
                                            <td className='border-2 border-black p-1'>Total</td>
                                            <td className='border-2 border-black p-1'>1</td>
                                            <td className='border-2 border-black p-1'>{parseInt(item.weight) * 1000} GRAMS</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table-fixed border-2 border-black bg-gray-200 w-full">
                                    <thead>
                                        <tr className='align-middle'>
                                            <th className='w-full'>
                                                <div className='text-black font-semibold text-sm text-left p-2'>
                                                    <div className='w-full'>Invoice NO : {globalData?.invoice_id}</div>
                                                    <div className='w-full'>Total Price : {priceFormat(parseInt(globalData?.shipment_value))}</div>
                                                    <div className='w-full'>DImensions :
                                                        {item.length + ' x ' +
                                                            item.breadth + ' x ' +
                                                            item.height}
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
                                                <Barcode value={`${globalData?.order_id}`} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle justify-center'>
                                                <div className='text-black font-semibold text-sm text-left p-2'>
                                                    OrderID : {globalData?.order_id}
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
                                                    <div className='w-full'>{sourceData?.first_name} {sourceData?.address_line1} {sourceData?.city} {sourceData?.state} {sourceData?.pincode}</div>
                                                    <div className='w-full'>Phone : {sourceData?.primary_contact_number}</div>
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
