import {Schema, model, models}  from "mongoose";

const EkartShipmentSchema = new Schema({
    ekartarray:{
        type: Array,
    },
    sourcedata:{
        type: Array,
        required: [true, "Please provide a Ekart Source data"],
    },
    destinationdata:{
        type: Array,
        required: [true, "Please provide a Ekart Destination data"],
    },
    shipmentItemDetail:{
        type: Array,
        required: [true, "Please provide a Ekart Shipment data"],
    },
    requestID:{
        type: String,
    },
    trackingID:{
        type: String,
    },
    status:{
        type: String,
    }

})

const EkartShipment = models.EkartShipment || model("EkartShipment", EkartShipmentSchema);

export default EkartShipment;