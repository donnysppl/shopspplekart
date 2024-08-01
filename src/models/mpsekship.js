import { Schema, model, models } from "mongoose";

const MPSEkShipSchema = new Schema({
    sourcedata: {
        type: Object
    },
    destinationData: {
        type: Object
    },
    globalData: {
        type: Object
    },
    productData: {
        type: Array
    },
    globaltrackingid: {
        type: String
    },
    amount_to_collect: {
        type: Number
    },
    response: {
        type: Object
    }
}, { timestamps: true })

const MpsEkartShipment = models.MpsEkartShipment || model("MpsEkartShipment", MPSEkShipSchema);

export default MpsEkartShipment;