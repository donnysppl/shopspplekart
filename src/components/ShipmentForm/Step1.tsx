import { SourceDatab } from '@/interface/interface';
import React, { useState } from 'react'


interface ShipmentFormStep1Type {
    sourceData: SourceDatab,
    setSourceData: React.Dispatch<React.SetStateAction<SourceDatab>>,
    onStepOneSubmit: (e: React.FormEvent<HTMLFormElement>) => void,

    errsourceData: SourceDatab,
}

export default function ShipmentFormStep1({
    sourceData, setSourceData,
    onStepOneSubmit,

    errsourceData
}: ShipmentFormStep1Type) {


    return (
        <>
            <div className="step-header mb-2.5">
                <h2>Step 1 (Source Details)</h2>
            </div>
            <form onSubmit={onStepOneSubmit}>
                <div>
                    <div className="mb-4 form-outer-div">
                        <label htmlFor="first_name" className="form-label ">Name*</label>
                        <input type="text" name="first_name" className="form-inp" placeholder="Name of the Seller"
                            onChange={(e) => setSourceData({ ...sourceData, first_name: e.target.value })}
                            value={'' || sourceData.first_name} />
                        {errsourceData.first_name && <span className="text-red-500">{errsourceData.first_name}</span>}
                    </div>
                    <div className="mb-4 form-outer-div">
                        <label htmlFor="address_line1" className="form-label ">Address Line 1*</label>
                        <input type="text" name="address_line1" className="form-inp" placeholder="Address"
                            onChange={(e) => setSourceData({ ...sourceData, address_line1: e.target.value })}
                            value={'' || sourceData.address_line1} />
                        {errsourceData.address_line1 && <span className="text-red-500">{errsourceData.address_line1}</span>}
                    </div>
                    <div className="mb-4 form-outer-div">
                        <label htmlFor="address_line2" className="form-label ">Address Line 2</label>
                        <input type="text" name="address_line2" className="form-inp" placeholder="Address"
                            onChange={(e) => setSourceData({ ...sourceData, address_line2: e.target.value })}
                            value={'' || sourceData.address_line2} />
                    </div>
                    <div className="mb-4 form-outer-div">
                        <label htmlFor="pincode" className="form-label ">Pincode*</label>
                        <input type="text" name="pincode" className="form-inp" placeholder="Pincode"
                            onChange={(e) => setSourceData({ ...sourceData, pincode: e.target.value })}
                            value={'' || sourceData.pincode} />
                        {errsourceData.pincode && <span className="text-red-500">{errsourceData.pincode}</span>}
                    </div>
                    <div className="mb-4 form-outer-div">
                        <label htmlFor="city" className="form-label ">City*</label>
                        <input type="text" name="city" className="form-inp" placeholder="City"
                            onChange={(e) => setSourceData({ ...sourceData, city: e.target.value })}
                            value={'' || sourceData.city} />
                        {errsourceData.city && <span className="text-red-500">{errsourceData.city}</span>}
                    </div>
                    <div className="mb-4 form-outer-div">
                        <label htmlFor="state" className="form-label ">State*</label>
                        <input type="text" name="state" className="form-inp" placeholder="State"
                            onChange={(e) => setSourceData({ ...sourceData, state: e.target.value })}
                            value={'' || sourceData.state} />
                        {errsourceData.state && <span className="text-red-500">{errsourceData.state}</span>}
                    </div>
                    <div className="mb-4 form-outer-div">
                        <label htmlFor="primary_contact_number" className="form-label ">Primary Contact Number*</label>
                        <input type="tel" name="primary_contact_number" className="form-inp" placeholder="Primary Contact Number"
                            onChange={(e) => setSourceData({ ...sourceData, primary_contact_number: e.target.value })}
                            value={'' || sourceData.primary_contact_number} />
                        {errsourceData.primary_contact_number && <span className="text-red-500">{errsourceData.primary_contact_number}</span>}
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

                <button className='btn-main' type="submit">Next Step</button>

            </form>
        </>
    )
}
