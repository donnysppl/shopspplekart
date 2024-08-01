import { DestinationData } from '@/interface/interface'
import React from 'react'

interface ShipmentFormStep1Type {
  destinationData: DestinationData,
  setDestinationData: React.Dispatch<React.SetStateAction<DestinationData>>,
  errDestinationData: DestinationData,

  onStepTwoSubmit: (e: React.FormEvent<HTMLFormElement>) => void,

}

export default function ShipmentFormStep2({
  destinationData, setDestinationData, errDestinationData,

  onStepTwoSubmit
}: ShipmentFormStep1Type) {
  return (
    <>
      <div className="step-header mb-2.5">
        <h2>Step 2 (Destination Details)</h2>
      </div>
      <form onSubmit={onStepTwoSubmit} >
        <div className="">

          <div className="mb-4 form-outer-div">
            <label htmlFor="first_name" className="form-label ">Name*</label>
            <input type="text" name="first_name" className="form-inp" required placeholder="Name"
              onChange={(e) => setDestinationData({ ...destinationData, first_name: e.target.value })}
              value={'' || destinationData.first_name} />
            {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>}
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
            {errDestinationData.address_line1 && <span className="text-red-500">{errDestinationData.address_line1}</span>}
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
            {errDestinationData.pincode && <span className="text-red-500">{errDestinationData.pincode}</span>}

          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="city" className="form-label ">City*</label>
            <input type="text" name="city" className="form-inp" required placeholder="City"
              onChange={(e) => setDestinationData({ ...destinationData, city: e.target.value })}
              value={'' || destinationData.city} />
            {errDestinationData.city && <span className="text-red-500">{errDestinationData.city}</span>}

          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="state" className="form-label ">State*</label>
            <input type="text" name="state" className="form-inp" required placeholder="State"
              onChange={(e) => setDestinationData({ ...destinationData, state: e.target.value })}
              value={'' || destinationData.state} />
            {errDestinationData.state && <span className="text-red-500">{errDestinationData.state}</span>}

          </div>
          <div className="mb-4 form-outer-div">
            <label htmlFor="primary_contact_number" className="form-label ">Primary Contact Number*</label>
            <input type="tel" name="primary_contact_number" className="form-inp" required placeholder="Primary Contact Number"
              onChange={(e) => setDestinationData({ ...destinationData, primary_contact_number: e.target.value })}
              value={'' || destinationData.primary_contact_number} />
            {errDestinationData.primary_contact_number && <span className="text-red-500">{errDestinationData.primary_contact_number}</span>}
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

          <button className='btn-main' type="submit">Next Step</button>

        </div>
      </form>
    </>
  )
}
