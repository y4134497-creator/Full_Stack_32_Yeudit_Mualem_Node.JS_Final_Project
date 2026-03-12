const employeesRepo= require('../repositories/employeesRepo')
const shiftsRepo = require('../repositories/shiftsRepo')
const departmentsRepo = require('../repositories/departmentsRepo')


const {Employee} = require('../models/models')
// קבלת כל העובדים
const getAllEmployees = async ()=>{
return await employeesRepo.getAllEmployees();
}
// קבלת עובד ע"פ ID
const getEmployeeById = async (id) =>{
return await employeesRepo.getEmployeeById(id);
}
// הוספת עובד
const addEmployee = async (obj) => {
return await employeesRepo.addEmployee(obj)
}
// עדכון עובד
const updateEmployee = async (id, obj) => {
return await employeesRepo.updateEmployee(id, obj)
}
// מחיקת עובד כולל מחיקת עובד מהמשמרות  
const deleteEmployee = async (id) => {
    const result = await employeesRepo.deleteEmployee(id);
    const allShifts = await shiftsRepo.getAllShift();
    const updatePromises = allShifts
        .filter(shift => {
            if (!shift.Employees || !Array.isArray(shift.Employees)) {
                return false;
            } else {
                return shift.Employees.some(eId => eId.toString() === id.toString());
            }
        }) 
        .map(shift => {
            const updatedEmployeesList = shift.Employees.filter(eId => eId.toString() !== id.toString());
            return shiftsRepo.updateShift(shift._id, { Employees: updatedEmployeesList });
        });
    await Promise.all(updatePromises);
    
    return result;
}

//פונקציה למציאת משמרות של עובד ת
const ShiftsEmployee = async (id) => {
    const arrShifts = await shiftsRepo.getAllShift();
    const arrShEmloy = arrShifts.filter((shift) => {
        if (!shift.Employees || !Array.isArray(shift.Employees)) {
            return false;
        } else {
return shift.Employees.some((emp) => String(emp) === String(id));
        }
    });
    return arrShEmloy;
};

// לשימוש בדף "עריכת עובד" (עובד אחד + משמרותיו)
const getAllShiftsEmployee = async (id) => {
    const allEmp = await getEmployeeById(id);
    const allShifts = await ShiftsEmployee(id)
    const empSifts = {...allEmp, Shift : allShifts}
return empSifts
}
const getAllEmployeesFullData = async () => {
    const arrEmp = await employeesRepo.getAllEmployees(); 
    const arrShifts = await shiftsRepo.getAllShift();
    const arrDeps = await departmentsRepo.getAllDepartments();

    return arrEmp.map(emp => {
        const myDep = arrDeps.find(d => String(d._id) === String(emp.DepartmentId));
        const hisShifts = arrShifts.filter(shift => {
            return shift.Employees && 
                   Array.isArray(shift.Employees) && 
                   shift.Employees.some(eId => String(eId) === String(emp._id));
        });

        return {
            ...emp, 
            DepartmentName: myDep ? myDep.Name : "No Department",
            Shifts: hisShifts
        };
    });
};
module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    ShiftsEmployee,
    getAllShiftsEmployee,
    getAllEmployeesFullData
};