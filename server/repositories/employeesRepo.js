const {Employee} = require('../models/models')

const getAllEmployees = async ()=>{
return await Employee.find({}).lean();
}
const getEmployeeById = async (id) =>{
return await Employee.findById(id).lean();
}
const addEmployee = async (obj) => {
return await Employee.create(obj)
}
const updateEmployee = async (id, obj) => {
return await Employee.findByIdAndUpdate(id, obj, { new: true })
}
const deleteEmployee = async (id) => {
return await Employee.findByIdAndDelete(id)
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
};