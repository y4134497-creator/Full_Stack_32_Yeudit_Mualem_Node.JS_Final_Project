const {Department} = require('../models/models')

const getAllDepartments = async ()=>{
return await Department.find({}).lean();
}
const getDepartmentById = async (id) =>{
return await Department.findById(id).lean();
}
const addDepartment = async (obj) => {
return await Department.create(obj)
}
const updateDepartment = async (id, obj) => {
return await Department.findByIdAndUpdate(id, obj, { new: true })
}
const deleteDepartment = async (id) => {
return await Department.findByIdAndDelete(id)
}



module.exports = {
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment
};