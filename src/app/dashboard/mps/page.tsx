"use client";
import ShipmentFormStep1 from '@/components/ShipmentForm/Step1'
import ShipmentFormStep2 from '@/components/ShipmentForm/Step2'
import React, { useEffect, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { DestinationData, SourceDatab, GlobalData, ProductData } from '@/interface/interface';
import ShipmentFormStep3 from '@/components/ShipmentForm/Step3';
import ShipmentFormStep4 from '@/components/ShipmentForm/Step4';
import { convertDataForElart } from '@/helper/ConvertEkartData';
import Swal from 'sweetalert2';
import Unauthorized from '@/helper/Unauthorize';

export default function Demo() {

    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    // source step 1 states
    const [sourceData, setSourceData] = useState<SourceDatab>({
        first_name: "",
        address_line1: "",
        address_line2: "",
        pincode: "",
        city: "",
        state: "",
        primary_contact_number: "",
        landmark: "",
        email_id: ""
    });
    const [errsourceData, setErrsourceData] = useState<SourceDatab>({
        first_name: "",
        address_line1: "",
        address_line2: "",
        pincode: "",
        city: "",
        state: "",
        primary_contact_number: "",
        landmark: "",
        email_id: ""
    })

    // destination step 2 states
    const [destinationData, setDestinationData] = useState<DestinationData>({
        first_name: "",
        address_line1: "",
        address_line2: "",
        pincode: "",
        city: "",
        state: "",
        primary_contact_number: "",
        landmark: "",
        email_id: "",
        alternate_contact_number: ""
    });
    const [errDestinationData, seterrDestinationData] = useState<DestinationData>({
        first_name: "",
        address_line1: "",
        address_line2: "",
        pincode: "",
        city: "",
        state: "",
        primary_contact_number: "",
        landmark: "",
        email_id: "",
        alternate_contact_number: ""
    });

    // global step 3 states
    const [globalData, setglobalData] = useState<GlobalData>({
        g_tracking_id: "",
        amount_to_collect: "",
        shipment_value: "",
        hsn: "",
        ern: "",
        total_weight: "",
        total_tax_value: "",
        total_sale_value: "",
        cgst: "",
        sgst: "",
        igst: "",
        order_id: "",
        invoice_id: "",
        eway_bill_number: "",
        seller_reg_name: "Super Plastronics Pvt. Ltd",
        gstin_id: "",
    });

    // Product step 4 states
    const [producData, setproducData] = useState<ProductData[]>([{
        tracking_id: "",
        product_id: "",
        product_title: "",
        category: "",
        length: "",
        height: "",
        weight: "",
        breadth: "",
        isDangerous: false,
        isFragile: false,
    }])


    useEffect(() => {
        // testing in development server
        const checkServerType = process.env.NODE_ENV;
        if (checkServerType === 'development') {
            console.log(process.env.NODE_ENV)

            setSourceData({
                ...sourceData,
                first_name: "AVThamizhmahan",
                address_line1: "123/22 Garden Vazhudaretty Post Villupuram",
                address_line2: "Tamil Nadu",
                pincode: "400066",
                city: "Villupuram",
                state: "Tamil Nadu",
                primary_contact_number: "1234567890",
                landmark: "landmark",
                email_id: "donny@sppl.ind.in"
            })

            setDestinationData({
                ...destinationData,
                first_name: "surbhi ranjan",
                address_line1: "Saidpur hat chowk samastipur near mahima mobile",
                address_line2: "Saidpur",
                pincode: "848125",
                city: "Dholi",
                state: "Bihar",
                primary_contact_number: "6207313580",
                landmark: "landmark",
                email_id: "donny@sppl.ind.in",
                alternate_contact_number: "1234567890"
            })

            setglobalData({
                ...globalData,
                g_tracking_id: "",
                amount_to_collect: "0",
                shipment_value: "1657",
                hsn: "452453",
                ern: "587527",
                total_weight: "10",
                total_tax_value: "252.76",
                total_sale_value: "1950",
                cgst: "0",
                sgst: "0",
                igst: "252.76",
                order_id: "SPPLW12345",
                invoice_id: "MH/228/2023-24",
                eway_bill_number: "",
                seller_reg_name: "Super Plastronics Pvt. Ltd",
                gstin_id: "27AACCS1710N2ZB",
            })
        }

    }, [])

    // common function
    const saveStepsDataLocal = (step: string, stepData: {}) => {

        const existingDataPart = window.localStorage.getItem('ekartmps-data');
        const existingData: any = existingDataPart ? JSON.parse(existingDataPart) : [];

        window.localStorage.setItem(
            'ekartmps-data',
            JSON.stringify({ ...existingData, ...stepData })
        );

    }

    // source step 1 functions starts
    const onStepOneInputValid = () => {
        let isValid = true;
        const errorsCopy: SourceDatab = { ...errsourceData };

        const validationRules = [
            {
                field: 'first_name',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'First name is required',
            },
            {
                field: 'address_line1',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'Address is required',
            },
            {
                field: 'pincode',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'pincode is required',
            },
            {
                field: 'city',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'city is required',
            },
            {
                field: 'state',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'state is required',
            },
            {
                field: 'primary_contact_number',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'primary contact number is required',
            },

        ];

        validationRules.forEach(({ field, validate, errorMessage }) => {
            const value = sourceData[field as keyof SourceDatab];
            if (!validate(value)) {
                errorsCopy[field as keyof SourceDatab] = errorMessage;
                isValid = false;
            } else {
                errorsCopy[field as keyof SourceDatab] = '';
            }
        });
        // console.log(errorsCopy)
        setErrsourceData(errorsCopy);
        return isValid;
    }

    const onStepOneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isvalid = onStepOneInputValid()
        if (isvalid) {
            const data = { source: sourceData }
            saveStepsDataLocal('step1', data)
            setSelectedIndex(1)

        }
    }

    // source step 2 functions starts
    const onStepTwoInputValid = () => {
        let isValid = true;
        const errorsCopy: DestinationData = { ...errDestinationData };


        const validationRules = [
            {
                field: 'first_name',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'First name is required',
            },
            {
                field: 'address_line1',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'Address is required',
            },
            {
                field: 'pincode',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'pincode is required',
            },
            {
                field: 'city',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'city is required',
            },
            {
                field: 'state',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'state is required',
            },
            {
                field: 'primary_contact_number',
                validate: (value: string) => value.trim() !== '',
                errorMessage: 'primary contact number is required',
            },

        ];

        validationRules.forEach(({ field, validate, errorMessage }) => {
            const value = destinationData[field as keyof DestinationData];
            if (!validate(value)) {
                errorsCopy[field as keyof DestinationData] = errorMessage;
                isValid = false;
            } else {
                errorsCopy[field as keyof DestinationData] = '';
            }
        });
        // console.log(errorsCopy)
        seterrDestinationData(errorsCopy);
        return isValid;
    }

    const onStepTwoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isvalid = onStepTwoInputValid()
        if (isvalid) {
            const data = { destination: destinationData }
            saveStepsDataLocal('step2', data)
            setSelectedIndex(2)

        }
    }


    // global step 3 functions starts
    const onStepThreeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const isvalid = onStepTwoInputValid()
        // if (isvalid) {
        const data = { global: globalData }
        saveStepsDataLocal('step3', data)
        setSelectedIndex(3)

        // }
    }


    // Product step 4 functions starts
    const addFields = () => {
        let newfield = {
            tracking_id: "",
            product_id: "",
            product_title: "",
            category: "",
            length: "",
            height: "",
            weight: "",
            breadth: "",
            isDangerous: false,
            isFragile: false,
        }
        setproducData([...producData, newfield])
    }

    const removeFields = (index: number) => {
        let data = [...producData];
        data.splice(index, 1)
        setproducData(data)
    }

    const handleFormChange = (index: number, name: string, value: string | boolean) => {
        let data: ProductData[] = [...producData];
        data[index][name] = value;
        setproducData(data);
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(producData)

        const data = { product: producData }
        saveStepsDataLocal('step4', data)

        const bodyData = await convertDataForElart(sourceData, destinationData, globalData, producData);

        const token = window.localStorage.getItem('token');

        console.log(bodyData)

        // const url = id ? `/api/ekart-shipment/add?order=${id}` : '/api/ekart-shipment/add?new=true';
        const url = '/api/ekart-shipment/large/create';
        await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
                "HTTP_X_MERCHANT_CODE": "SPL",
                "Authorization": `${token}`
            },
            body: JSON.stringify({
                sourcedata: sourceData,
                destinationData: destinationData,
                globalData: globalData,
                productData: producData,
                globaltrackingid: globalData.g_tracking_id,
                amount_to_collect: globalData.amount_to_collect,
                data: bodyData
            })
        }).then(res => res.json())
            .then(res => {
                console.log(res);

                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: res.result.response[0].entity_id,
                        text: res.result.response[0].status
                    }).then(function () {
                        // redirect(`/dashboard/list-shipment/mps`)
                        window.location.href = '/dashboard/mps-shipment'
                    })

                }
                else if (res.status === 207) {
                    // const textdata = JSON.stringify(res.result, null, 2);
                    const textdata = res.result.map((obj: any) => {
                        return `tracking_id: ${obj.tracking_id}, status: ${obj.status}, message: ${obj.message}`;
                    }).join('\n');

                    Swal.fire({
                        icon: 'error',
                        title: 'Somthing Went Wrong',
                        text: textdata
                    })
                }
                else if (res.status === 400) {
                    const message = res.result.response[0].message;
                    const messageStr = message.toString();

                    console.log('400', message, messageStr)
                    Swal.fire({
                        icon: 'error',
                        title: res.result.response[0].status,
                        text: res.result.response[0].tracking_id + ' ' + messageStr,
                    })
                }
                else if (res.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: res.result.unauthorised,
                        text: res.result.unauthorised,
                    }).then(function () {
                        Unauthorized();
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Somthing Went Wrong',
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })

        // console.log(bodyData);

    }



    // 
    // console.log(process.env.NODE_ENV)

    return (
        <>

            <div className="flex h-screen w-full gap-5 justify-center pt-10 px-4">
                <div className="w-full max-w-3xl">

                    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>

                        <TabList className="flex gap-4">

                            <Tab
                                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white" >
                                Step 1
                            </Tab>

                            <Tab
                                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white" >
                                Step 2
                            </Tab>

                            <Tab
                                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white" >
                                Step 3
                            </Tab>

                            <Tab
                                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white" >
                                Step 4
                            </Tab>

                        </TabList>

                        <TabPanels className="mt-3">

                            <TabPanel className="rounded-xl bg-white/5 p-5">
                                <ShipmentFormStep1
                                    sourceData={sourceData} setSourceData={setSourceData}
                                    errsourceData={errsourceData}

                                    onStepOneSubmit={onStepOneSubmit}

                                />
                            </TabPanel>

                            <TabPanel className="rounded-xl bg-white/5 p-5">
                                <ShipmentFormStep2
                                    destinationData={destinationData} setDestinationData={setDestinationData}
                                    errDestinationData={errDestinationData}
                                    onStepTwoSubmit={onStepTwoSubmit}
                                />
                            </TabPanel>


                            <TabPanel className="rounded-xl bg-white/5 p-5">
                                <ShipmentFormStep3
                                    globalData={globalData} setglobalData={setglobalData}
                                    onStepThreeSubmit={onStepThreeSubmit}
                                />
                            </TabPanel>

                            <TabPanel className="rounded-xl bg-white/5 p-5">
                                <ShipmentFormStep4
                                    producData={producData} addFields={addFields} removeFields={removeFields}
                                    handleFormChange={handleFormChange} submit={submit}
                                />
                            </TabPanel>

                        </TabPanels>

                    </TabGroup>

                </div>

                {/* <div>
                    {
                        (selectedIndex === 0) ?
                            <div className='mb-2'>
                                <h4>Source Data</h4>
                                <ul>
                                    <li>first_name : {sourceData?.first_name}</li>
                                    <li>address_line1 : {sourceData?.address_line1}</li>
                                    <li>address_line2 : {sourceData?.address_line2}</li>
                                    <li>pincode : {sourceData?.pincode}</li>
                                    <li>city : {sourceData?.city}</li>
                                    <li>state : {sourceData?.state}</li>
                                    <li>primary_contact_number : {sourceData?.primary_contact_number}</li>
                                    <li>landmark : {sourceData?.landmark}</li>
                                    <li>email_id : {sourceData?.email_id}</li>
                                </ul>
                            </div>

                            :

                            (selectedIndex === 1) ?

                                <div className='mb-2'>
                                    <h4>Destination Data</h4>
                                    <ul>
                                        <li>first_name : {destinationData?.first_name}</li>
                                        <li>address_line1 : {destinationData?.address_line1}</li>
                                        <li>address_line2 : {destinationData?.address_line2}</li>
                                        <li>pincode : {destinationData?.pincode}</li>
                                        <li>city : {destinationData?.city}</li>
                                        <li>state : {destinationData?.state}</li>
                                        <li>primary_contact_number : {destinationData?.primary_contact_number}</li>
                                        <li>landmark : {destinationData?.landmark}</li>
                                        <li>email_id : {destinationData?.email_id}</li>
                                    </ul>
                                </div>

                                :

                                (selectedIndex === 2) ?

                                    <div className='mb-2'>
                                        <h4>Global Data</h4>
                                        <ul>
                                            <li>g_tracking_id : {globalData?.g_tracking_id} </li>
                                            <li>shipment_value : {globalData?.shipment_value} </li>
                                            <li>hsn : {globalData?.hsn} </li>
                                            <li>ern : {globalData?.ern} </li>
                                            <li>total_weight : {globalData?.total_weight} </li>
                                            <li>total_tax_value : {globalData?.total_tax_value} </li>
                                            <li>total_sale_value : {globalData?.total_sale_value} </li>
                                            <li>cgst : {globalData?.cgst} </li>
                                            <li>sgst : {globalData?.sgst} </li>
                                            <li>igst : {globalData?.igst} </li>
                                            <li>order_id : {globalData?.order_id} </li>
                                            <li>invoice_id : {globalData?.invoice_id} </li>
                                            <li>eway_bill_number : {globalData?.eway_bill_number} </li>
                                            <li>seller_reg_name : {globalData?.seller_reg_name} </li>
                                            <li>gstin_id : {globalData?.gstin_id} </li>
                                        </ul>
                                    </div> :

                                    (selectedIndex === 3) ?
                                        producData.map((item, index) => (
                                            <div className='mb-2'>
                                                <h4>Product Data</h4>
                                                <ul key={index}>

                                                    <li>tracking_id: {item.tracking_id}</li>
                                                    <li>product_id: {item.product_id}</li>
                                                    <li>product_title: {item.product_title}</li>
                                                    <li>category: {item.category}</li>
                                                    <li>length: {item.length}</li>
                                                    <li>height: {item.height}</li>
                                                    <li>weight: {item.weight}</li>
                                                    <li>breadth: {item.breadth}</li>
                                                    <li>isDangerous: {item.isDangerous}</li>
                                                    <li>isFragile: {item.isFragile}</li>
                                                </ul>
                                            </div>
                                        ))
                                        : null



                    }

                </div> */}
            </div>

        </>
    )
}
