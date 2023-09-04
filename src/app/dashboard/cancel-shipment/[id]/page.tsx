"use client";
import React from 'react'

export default function page({ params }: { params: { id: string } }) {

    const onCancelShipment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await fetch(`/api/ekart-shipment/cancel/${params.id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "HTTP_X_MERCHANT_CODE": "SPL",
                "Authorization": `${token}`
            },
        }).then(res => res.json())
            .then(res => {
                console.log(res);

            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="text-center">
                <div>page {params.id}</div>
                <form onSubmit={onCancelShipment}>
                    <button className='btn-main' >Cancel</button>

                </form>
            </div>
        </>
    )
}
