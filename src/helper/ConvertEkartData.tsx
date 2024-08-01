import { DestinationData, GlobalData, ProductData, SourceData } from "@/interface/interface";

export const convertDataForElart = async (
    sourceData: SourceData, 
    destinationData: DestinationData, 
    globalData: GlobalData, 
    productData: ProductData[]
) => {

    const shipmentArr = productData.map((item) => {
        return {
            tracking_id: item.tracking_id,
            shipment_items: [
                {
                    product_id: item.product_id,
                    product_title: item.product_title,
                    category: item.category,
                    handling_attributes: [
                        {
                            name: "isDangerous",
                            value: `${item.isDangerous}`
                        },
                        {
                            name: "isFragile",
                            value: `${item.isFragile}`
                        }
                    ]
                }
            ],
            shipment_dimensions: {
                length: { value: item.length },
                height: { value: item.height },
                weight: { value: item.weight },
                breadth: { value: item.breadth }
            }
        };
    });

    const data = {
        client_name: 'SPL',
        services: [
            {
                service_code: "REGULAR",
                service_details: [
                    {
                        service_leg: "FORWARD",
                        service_data: {
                            vendor_name: "Ekart",
                            amount_to_collect: globalData.amount_to_collect,
                            delivery_type: "LARGE",
                            source: {
                                address: {
                                    first_name: sourceData.first_name,
                                    address_line1: sourceData.address_line1,
                                    address_line2: sourceData.address_line2,
                                    pincode: sourceData.pincode,
                                    city: sourceData.city,
                                    state: sourceData.state,
                                    primary_contact_number: sourceData.primary_contact_number,
                                    landmark: sourceData.landmark,
                                    email_id: sourceData.email_id
                                }
                            },
                            destination: {
                                address: {
                                    first_name: destinationData.first_name,
                                    address_line1: destinationData.address_line1,
                                    address_line2: destinationData.address_line2,
                                    pincode: destinationData.pincode,
                                    city: destinationData.city,
                                    state: destinationData.state,
                                    primary_contact_number: destinationData.primary_contact_number,
                                    landmark: destinationData.landmark,
                                    email_id: destinationData.email_id,
                                    alternate_contact_number: destinationData.alternate_contact_number
                                }
                            }
                        },
                        global_shipment: {
                            client_reference_id: globalData.g_tracking_id,
                            tracking_id: globalData.g_tracking_id,
                            shipment_value: globalData.shipment_value,
                            cost: {
                                total_tax_value: globalData.total_tax_value,
                                total_sale_value: globalData.total_sale_value,
                                tax_breakup: {
                                    cgst: globalData.cgst,
                                    sgst: globalData.sgst,
                                    igst: globalData.igst
                                }
                            },
                            attributes: [
                                {
                                    name: "order_id",
                                    value: globalData.order_id
                                },
                                {
                                    name: "invoice_id",
                                    value: globalData.invoice_id
                                },
                                {
                                    name: "eway_bill_number",
                                    value: globalData.eway_bill_number
                                }
                            ],
                            hsn: globalData.hsn,
                            ern: globalData.ern,
                            total_weight: globalData.total_weight,
                            seller_details: {
                                seller_reg_name: globalData.seller_reg_name,
                                gstin_id: globalData.gstin_id
                            }
                        },
                        shipments: shipmentArr
                    }
                ]
            }
        ]
    };

    return data;
};
