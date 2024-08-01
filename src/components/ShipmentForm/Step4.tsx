import React, { useState } from 'react'
import { ProductData } from '@/interface/interface'
import { AiOutlineDelete } from "react-icons/ai";

interface ShipmentFormStep4Type {
    producData: ProductData[],
    addFields: () => void,
    removeFields: (index: number) => void,
    handleFormChange: (index: number, name:string, value:string | boolean) => void,
    submit: (e: React.FormEvent<HTMLFormElement>) => void,

}

export default function ShipmentFormStep4({
    producData, addFields, removeFields, handleFormChange, submit
}: ShipmentFormStep4Type) {


    return (
        <>
            <div className="step-header mb-4">
                <h2>Step 4 (Product Details)</h2>
            </div>
            <form onSubmit={submit}>
                {producData.map((item, index) => {
                    return (
                        <div key={index} className='border border-gray-600 rounded-lg p-5 relative mb-5'>

                            <div className='absolute -top-0 -left-3 '>{index + 1}</div>

                            <div className="grid grid-cols-2 gap-3">

                                <div className="mb-4 form-outer-div">
                                    <label htmlFor="tracking_id" className="form-label ">tracking id*</label>
                                    <input type="text" name="tracking_id" className="form-inp" required placeholder="tracking_id"
                                        onChange={(e) => handleFormChange(index, e.target.name, e.target.value)}
                                        value={'' || item.tracking_id} />
                                    {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                                </div>

                                <div className="mb-4 form-outer-div">
                                    <label htmlFor="product_id" className="form-label ">product id*</label>
                                    <input type="text" name="product_id" className="form-inp" required placeholder="product_id"
                                        onChange={(e) => handleFormChange(index, e.target.name, e.target.value)}
                                        value={'' || item.product_id} />
                                    {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                                </div>

                            </div>

                            <div className="mb-4 form-outer-div">
                                <label htmlFor="product_title" className="form-label ">product title*</label>
                                <input type="text" name="product_title" className="form-inp" required placeholder="product_title"
                                    onChange={(e) => handleFormChange(index, e.target.name, e.target.value)}
                                    value={'' || item.product_title} />
                                {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                            </div>

                            <div className="mb-4 form-outer-div">
                                <label htmlFor="category" className="form-label ">category*</label>
                                <input type="text" name="category" className="form-inp" required placeholder="category"
                                    onChange={(e) => handleFormChange(index, e.target.name, e.target.value)}
                                    value={'' || item.category} />
                                {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                            </div>

                            <div className="grid grid-cols-4 gap-3">

                                <div className="mb-4 form-outer-div">
                                    <label htmlFor="length" className="form-label ">length*</label>
                                    <input type="text" name="length" className="form-inp" required placeholder="length"
                                        onChange={(e) => handleFormChange(index, e.target.name, e.target.value)}
                                        value={'' || item.length} />
                                    {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                                </div>

                                <div className="mb-4 form-outer-div">
                                    <label htmlFor="height" className="form-label ">height*</label>
                                    <input type="text" name="height" className="form-inp" required placeholder="height"
                                        onChange={(e) => handleFormChange(index, e.target.name, e.target.value)}
                                        value={'' || item.height} />
                                    {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                                </div>

                                <div className="mb-4 form-outer-div">
                                    <label htmlFor="weight" className="form-label ">weight*</label>
                                    <input type="text" name="weight" className="form-inp" required placeholder="weight"
                                        onChange={(e) => handleFormChange(index, e.target.name, e.target.value)}
                                        value={'' || item.weight} />
                                    {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                                </div>

                                <div className="mb-4 form-outer-div">
                                    <label htmlFor="breadth" className="form-label ">breadth*</label>
                                    <input type="text" name="breadth" className="form-inp" required placeholder="breadth"
                                        onChange={(e) => handleFormChange(index, e.target.name, e.target.value)}
                                        value={'' || item.breadth} />
                                    {/* {errDestinationData.first_name && <span className="text-red-500">{errDestinationData.first_name}</span>} */}
                                </div>

                                <div className="form-outer-div checkbox-inline cursor-pointer ps-3">
                                    <input className="form-inp-check" type="checkbox" name="isDangerous" id="isDangerous"
                                        onChange={(e) => handleFormChange(index, e.target.name, e.target.checked)} />
                                    <label className="form-label" htmlFor="isDangerous">
                                        isDangerous
                                    </label>
                                </div>


                                <div className="form-outer-div checkbox-inline cursor-pointer ps-3">
                                    <input className="form-inp-check" type="checkbox" name="isFragile" id="isFragile"
                                        onChange={(e) => handleFormChange(index, e.target.name, e.target.checked)} />
                                    <label className="form-label" htmlFor="isFragile">
                                        isFragile
                                    </label>
                                </div>

                            </div>

                            {
                                (index !== 0) && <button
                                    className='absolute -top-2 -right-2 border border-red-400 rounded-full w-9 h-9 flex items-center justify-center bg-red-600'
                                    onClick={() => removeFields(index)}>
                                    <AiOutlineDelete className='w-6 h-6 text-red-200' />
                                </button>
                            }


                        </div>
                    )
                })}

                <div className='flex gap-2'>
                    {
                        producData.length !== 4 ?
                            <button
                                className='bg-green-800 text-green-200 py-1.5 px-4 rounded-lg text-base font-medium'
                                onClick={addFields}>Add More</button> : null
                    }


                    <button
                        className='bg-teal-800 text-teal-200 py-1.5 px-4 rounded-lg text-base font-medium'
                        type='submit'>Submit</button>
                </div>

            </form>
        </>
    )
}
