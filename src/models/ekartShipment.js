import {Schema, model, models}  from "mongoose";

const EkartShipmentSchema = new Schema({
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
    }

})

const EkartShipment = models.EkartShipment || model("EkartShipment", EkartShipmentSchema);

export default EkartShipment;