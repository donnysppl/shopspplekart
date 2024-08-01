import React from 'react'
import { GlobalData } from '@/interface/interface'

interface ShipmentFormStep3Type {
    globalData: GlobalData,
    setglobalData: React.Dispatch<React.SetStateAction<GlobalData>>,
    onStepThreeSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

export default function ShipmentFormStep3({
    globalData, setglobalData,
    onStepThreeSubmit
}: ShipmentFormStep3Type) {
    return (
        <>
            <div className="step-header mb-2.5">
                <h2>Step 3 (Global Shipment)</h2>
            </div>
            <form onSubmit={onStepThreeSubmit} >

                <div className='grid grid-cols-2 gap-3'>
                <div className="mb-4 form-outer-div">
                    <label htmlFor="g_tracking_id" className="form-label ">Global Tracking ID*</label>
                    <input type="text" name="g_tracking_id" className="form-inp" required placeholder="g_tracking_id"
                        onChange={(e) => setglobalData({ ...globalData, g_tracking_id: e.target.value })}
                        value={'' || globalData.g_tracking_id} />
                    {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                </div>

                <div className="mb-4 form-outer-div">
                    <label htmlFor="amount_to_collect" className="form-label ">Amount to Collect*</label>
                    <input type="text" name="amount_to_collect" className="form-inp" required placeholder="amount_to_collect"
                        onChange={(e) => setglobalData({ ...globalData, amount_to_collect: e.target.value })}
                        value={'' || globalData.amount_to_collect} />
                    {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                </div>
                </div>

                <div className="grid grid-cols-3 gap-3">

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="shipment_value" className="form-label ">shipment value*</label>
                        <input type="text" name="shipment_value" className="form-inp" required placeholder="shipment_value"
                            onChange={(e) => setglobalData({ ...globalData, shipment_value: e.target.value })}
                            value={'' || globalData.shipment_value} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="hsn" className="form-label ">hsn</label>
                        <input type="text" name="hsn" className="form-inp" placeholder="hsn"
                            onChange={(e) => setglobalData({ ...globalData, hsn: e.target.value })}
                            value={'' || globalData.hsn} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="ern" className="form-label ">ern</label>
                        <input type="text" name="ern" className="form-inp"  placeholder="ern"
                            onChange={(e) => setglobalData({ ...globalData, ern: e.target.value })}
                            value={'' || globalData.ern} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="total_weight" className="form-label ">total weight*</label>
                        <input type="text" name="total_weight" className="form-inp" required placeholder="total_weight"
                            onChange={(e) => setglobalData({ ...globalData, total_weight: e.target.value })}
                            value={'' || globalData.total_weight} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="total_sale_value" className="form-label ">total sale value*</label>
                        <input type="text" name="total_sale_value" className="form-inp" required placeholder="total_sale_value"
                            onChange={(e) => setglobalData({ ...globalData, total_sale_value: e.target.value })}
                            value={'' || globalData.total_sale_value} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="total_tax_value" className="form-label ">total tax value*</label>
                        <input type="text" name="total_tax_value" className="form-inp" required placeholder="total_tax_value"
                            onChange={(e) => setglobalData({ ...globalData, total_tax_value: e.target.value })}
                            value={'' || globalData.total_tax_value} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="cgst" className="form-label ">cgst</label>
                        <input type="text" name="cgst" className="form-inp" placeholder="cgst"
                            onChange={(e) => setglobalData({ ...globalData, cgst: e.target.value })}
                            value={'' || globalData.cgst} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="sgst" className="form-label ">sgst</label>
                        <input type="text" name="sgst" className="form-inp" placeholder="sgst"
                            onChange={(e) => setglobalData({ ...globalData, sgst: e.target.value })}
                            value={'' || globalData.sgst} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="igst" className="form-label ">igst</label>
                        <input type="text" name="igst" className="form-inp" placeholder="igst"
                            onChange={(e) => setglobalData({ ...globalData, igst: e.target.value })}
                            value={'' || globalData.igst} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="order_id" className="form-label ">order id*</label>
                        <input type="text" name="order_id" className="form-inp" required placeholder="order_id"
                            onChange={(e) => setglobalData({ ...globalData, order_id: e.target.value })}
                            value={'' || globalData.order_id} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="invoice_id" className="form-label ">invoice id*</label>
                        <input type="text" name="invoice_id" className="form-inp" required placeholder="invoice_id"
                            onChange={(e) => setglobalData({ ...globalData, invoice_id: e.target.value })}
                            value={'' || globalData.invoice_id} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="eway_bill_number" className="form-label ">eway bill number</label>
                        <input type="text" name="eway_bill_number" className="form-inp" placeholder="eway_bill_number"
                            onChange={(e) => setglobalData({ ...globalData, eway_bill_number: e.target.value })}
                            value={'' || globalData.eway_bill_number} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-3">

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="seller_reg_name" className="form-label ">seller reg name</label>
                        <input type="text" name="seller_reg_name" className="form-inp" placeholder="seller_reg_name"
                            onChange={(e) => setglobalData({ ...globalData, seller_reg_name: e.target.value })}
                            value={'' || globalData.seller_reg_name} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                    <div className="mb-4 form-outer-div">
                        <label htmlFor="gstin_id" className="form-label ">gstin id*</label>
                        <input type="text" name="gstin_id" className="form-inp" required placeholder="gstin_id"
                            onChange={(e) => setglobalData({ ...globalData, gstin_id: e.target.value })}
                            value={'' || globalData.gstin_id} />
                        {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                    </div>

                </div>

                <button className='btn-main' type="submit">Next Step</button>

            </form>
        </>
    )
}
