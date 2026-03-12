const shiftsRepo = require('../repositories/shiftsRepo')
const employeesRepo = require('../repositories/employeesRepo')

const getAllShift = async ()=>{
return await shiftsRepo.getAllShift();
}
const getShiftById = async (id)=>{
return await shiftsRepo.getShiftById(id)
}
const addShift = async (obj)=>{
return await shiftsRepo.addShift(obj);
}
const updateShift = async (id, obj)=>{
return await shiftsRepo.updateShift(id, obj)
}
//מקצה לעובד משמרת
const getAllShiftEmp = async (id_shift, id_emp)=>{
const shift = await getShiftById(id_shift)
const employee = await employeesRepo.getEmployeeById(id_emp)
if(!shift || !employee){
    return { success: false, message: "Shift or Employee not found" };
}else{
    if (!shift.Employees) {
            shift.Employees = [];
        }
        const shiftObj = shift.toObject ? shift.toObject() : shift;
        const employeesList = shiftObj.Employees || [];
    const isAlreadyAssigned = employeesList.some((emp) => {
            const idToCheck = emp._id ? emp._id.toString() : emp.toString();
            return idToCheck === id_emp.toString();
        });
    if (isAlreadyAssigned){
          return { success: false, message: "The employee is present on this shift. or Employee not found" };
    }else{
          shift.Employees.push(employee)
return await shiftsRepo.updateShift(id_shift, shift)
    }
}

}
module.exports ={
    getAllShift,
    getShiftById,
    addShift,
    updateShift,
    getAllShiftEmp
}
