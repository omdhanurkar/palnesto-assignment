const itineraryModel = require("../models/itineryModel")

const create = async (req, res) => {
    try {

        let data = await itineraryModel.create(req.body)
        return res.status(201).send({ Status: true, data: data });
    }
    catch (error) {
        res.status(500).send({ Status: false, Message: error.message });
    }
}

const view = async (req, res) => {
    try {
        let data = await itineraryModel.findById(req.params.id)
        if (!data) {
            return res.status(404).send({ Status: false, Message: "No record found" });
        }
        return res.status(201).send({ Status: Success, data: data });
    }
    catch (error) {
        res.status(500).send({ Status: false, Message: error.message });
    }
}

const edit = async (req, res) => {

    try {
        let updatedData = await itineraryModel.findByIdAndUpdate(req.params.id, req.body)
        if (!updatedData) {
            return res.status(404).send({ Status: false, Message: "No record found" });
        }
        return res.status(201).send({ Status: Success, data: updatedData });
    }
    catch (error) {
        res.status(500).send({ Status: false, Message: error.message });
    }
}





module.exports = { create, view, edit }