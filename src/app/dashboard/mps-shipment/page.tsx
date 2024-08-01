import MpsDataTable from '@/components/table/MpsDataTable';
import React from 'react'

export const dynamic = 'force-dynamic';

async function fetchMPSlist() {
    'use server';
    const fetchApi = await fetch(`${process.env.NEXT_PUBLIC_ALLOW_ORIGIN}/api/mps/list`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = fetchApi.json();
    return data;
}


export default async function ListMps() {

    const fetchData = await fetchMPSlist()

    return (
        <div className='w-full mx-auto p-5'>

            <h2 className='text-center mb-4'>MPS Shipment List</h2>
            <MpsDataTable data={fetchData} />
        </div>
    )
}
