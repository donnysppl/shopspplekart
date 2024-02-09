import {Schema, model, models}  from "mongoose";

const EkartShipmentSchema = new Schema({
    trackingid:{
        type: String,
    },
    ekartarray:{
        type: Array,
    },
    resultarray:{
        type: Array,
    },
    cancelarray:{
        type: Array,
    },
    cancelResarray:{
        type: Array,
    },
    orderid:{
        type: String,
    },

},{ timestamps: true })

const EkartShipment = models.EkartShipment || model("EkartShipment", EkartShipmentSchema);

export default EkartShipment;