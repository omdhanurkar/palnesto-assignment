const mongoose = require("mongoose");

const itinerySchema = {
    destination: String,
    travelDates: String,
    activities: String,
    accommodations: String,
        
    
};

module.exports = mongoose.model("Itinery", itinerySchema);