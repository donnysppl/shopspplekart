import React, { useRef, useState } from 'react'
import QRCode from "react-qr-code";
import Barcode from 'react-barcode';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Swal from 'sweetalert2';
import EkartImg from '../../public/assets/img/ekart.png';
import Image from 'next/image'
import { Address2, ShipmentItem, Response, SourceData } from '@/interface/interface';

interface Label {
    custDetail: Address2 | undefined,
    shipDetail: ShipmentItem | undefined,
    trackDetail: Response | undefined,
    sourceDetails: SourceData | undefined
}

export default function Label({ custDetail, shipDetail, trackDetail, sourceDetails }: Label) {

    const labelRef = useRef<HTMLInputElement>(null);
    const [showLabel, setshowLabel] = useState<boolean>(false)

    const createPDF = async () => {
        if (labelRef.current) {
            const pdf = new jsPDF("portrait", "pt", "a4");
            const data = await html2canvas(labelRef.current);
            const img = data.toDataURL("image/png");
            const imgProperties = pdf.getImageProperties(img);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
            pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${trackDetail?.tracking_id}_shipping_label.pdf`);
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }).then(function () {
                window.location.reload;
            })
        }

    };

    return (
        <>
            <div className="btn flex gap-5 my-5">
                
                <button className='btn-main' onClick={(e) => setshowLabel(!showLabel)}>Show Label</button>
                {
                    showLabel ? <button className='btn-main' onClick={createPDF}>Download Label</button> : null
                }
            </div>
            {
                showLabel ?
                    <div className='lable' id="lable" ref={labelRef}>
                        <div className="lable-outer">
                            <div className="label-big-part">
                                <div className="label-w-80">
                                    <div className="label-content-part">
                                        <div style={{
                                            width: '100%',
                                            height: '35px',
                                            backgroundColor: '#000',

                                        }}>
                                            <p className="label-prepard-part lable-head-text" >
                                                Prepaid - Do Not Collect Cash
                                            </p>
                                        </div>


                                        <div className="lable-partition">
                                            <div className="label-w50">
                                                <div className="lable-head-text pad-10">
                                                    delivery address :
                                                </div>
                                                <div className="label-text-part padlr-10">
                                                    {custDetail?.first_name},<br />
                                                    {custDetail?.address_line1}, {custDetail?.address_line2}, <br />
                                                    {custDetail?.city}, {custDetail?.state}, <br />
                                                    {custDetail?.pincode}
                                                </div>
                                            </div>
                                            <div className="label-w50">
                                                <div className="label-bar-code-outer">
                                                    <div className="label-bar-code-inner">
                                                        <QRCode value={`${trackDetail?.tracking_id}`} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="label-sold-part padlr-10">
                                        <div className="sold-text">
                                            <span className='lable-head-text'>sold by : </span>
                                            <span className='label-text-part'>
                                                {
                                                    (sourceDetails?.location_code === 'SPL_BLR_01') ?
                                                        "SUPER PLASTRONICS PVT LTD, # 1030. Avigiri, 20th Main, 5th Block West of Chord Road, Rajajinagar.Bangalore - 560010. Tel.: 23144561" :
                                                        (sourceDetails?.location_code === 'SPL_HYD_02') ?
                                                            "SUPER PLASTRONICS PVT LTD, Gurunanak Enterprises complex, 8-4-325, Ashok Marg, Erragadda, Hyderabad - 500018." :
                                                            (sourceDetails?.location_code === 'SPL_THA_03') ?
                                                                "SUPER PLASTRONICS PVT LTD, clinic Citi Solutions warehousing & Distribution Pvt.LtdShree Sai Warehousing Park, Warehouse no. C Survey No. 167 & 68/2, Paiki, at village - Padgha Taluka : Bhiwandi District : Thane - 421101" :
                                                                (sourceDetails?.location_code === 'SPL_HOW_04') ?
                                                                    "SUPER PLASTRONICS PVT LTD, IRC WAREHOUSE COMPLEXRAGHUDEVPUR PANCHILA PS RAJAPUR HOWRAH-711322" :
                                                                    "SUPER PLASTRONICS PVT LTD B-29,30 & 31, SECTOR-81, PHASE-II NOIDA U.P 201305"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="label-gst-part padlr-10">
                                        <span className='lable-head-text'>GSTIN no : </span>
                                        <span className='label-text-part'>{shipDetail?.seller_details.gstin_id}</span>
                                    </div>
                                    <div className="label-table-part">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Qty</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{shipDetail?.product_title}</td>
                                                    <td>1</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>1</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div className="label-w-20">
                                    <div className="label-barline-code-outer">
                                        <div className="label-barline-code-inner vertical">
                                            <Barcode value={`${trackDetail?.tracking_id}`} height={50} displayValue={false} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="label-small-part">
                                <div className="label-w50">
                                    <div className="label-handover-part">
                                        <span>Handover to E-Kart Logistics</span>
                                    </div>
                                    <div className="label-track-order-part">
                                        <div className="tracting-part">
                                            <span className='lable-head-text'>Tracking ID : </span>
                                            <span className='label-text-part'>{trackDetail?.tracking_id}</span>
                                        </div>
                                        <div className="tracking-bar-lin-code">
                                            <div className="label-barcode-bottom">
                                                <div className="label-barline-code-inner">
                                                    <Barcode value={`${trackDetail?.tracking_id}`} height={50} displayValue={false} />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="order-id-part">
                                            <span className='lable-head-text'>Order Id :</span>
                                            <span className='label-text-part'>{shipDetail?.item_attributes[0].value}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="label-w50">
                                    <div className="ekart-logo">
                                        <Image className='mx-auto float-right'
                                            src={EkartImg}
                                            width={200}
                                            height={200}
                                            alt="EkartImg" placeholder="blur" layout="fixed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div > : null
            }

        </>
    )
}
