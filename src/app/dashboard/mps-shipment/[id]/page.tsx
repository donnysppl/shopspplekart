
import React from 'react'
import { mpslabelDataFetch } from './action'
import MPSlable from '@/components/lables/MPSlable';

export default async function MPSDetailLable({ params }: { params: { id: string } }) {

    const fetchData = await mpslabelDataFetch(params.id)

    const sourceData = fetchData?.sourcedata;
    const destiData = fetchData?.destinationData;
    const globalData = fetchData?.globalData;
    const shipmentData = fetchData?.productData;

    return (
        <div className='w-full mx-auto p-1.5'>

            <MPSlable sourceData={sourceData} destiData={destiData} globalData={globalData} shipmentData={shipmentData} amount={fetchData?.amount_to_collect} />

        </div>
    )
}
