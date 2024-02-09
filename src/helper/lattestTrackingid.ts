// fetch lattest tracking id

export async function lattestTrackingid() {

    const trackingId = await fetch(`/api/ekart-shipment/accesstrackingid`, {
        method: 'GET',
        cache: 'no-store',
    })

    const data = await trackingId.json();
    const numericalValue = parseInt(data.result.match(/\d+/)[0], 10);

    const incrementedValue = numericalValue + 1;

    const outpuString = data.result.replace(/\d+/, incrementedValue);
    

    return outpuString;
}