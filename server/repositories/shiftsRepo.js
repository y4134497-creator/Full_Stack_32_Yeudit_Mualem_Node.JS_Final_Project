const {Shift} = require('../models/models')

const getAllShift = async ()=>{
return await Shift.find({}).lean();
}
const getShiftById = async (id) =>{
return await Shift.findById(id).lean();
}
const addShift = async (obj) => {
return await Shift.create(obj)
}
const updateShift = async (id, obj) => {
return await Shift.findByIdAndUpdate(id, obj, { new: true })
}


module.exports = {
    getAllShift,
    getShiftById,
    addShift,
    updateShift,
};
