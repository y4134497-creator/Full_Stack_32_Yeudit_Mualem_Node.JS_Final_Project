const departmentsRepo = require('../repositories/departmentsRepo')
const employeesRepo = require('../repositories/employeesRepo')
const employeesService = require('../services/employeesService')

const {Department} = require('../models/models')

// פונקציה שמביאה את כל המחלקות
const getAllDepartments = async ()=>{
return await departmentsRepo.getAllDepartments();
}
// פונקציה שמביאה מחלקה לפי ID
const getDepartmentById = async (id) =>{
return await departmentsRepo.getDepartmentById(id);
}
//פונקציה שמוסיפה מחלקה
const addDepartment = async (obj) => {
return await departmentsRepo.addDepartment(obj)
}
// פונקציה שמעדכנת את המחלקה
const updateDepartment = async (id, obj) => {
return await departmentsRepo.updateDepartment(id, obj)
}
// פוקציה שמוחקת את המחלקה ואת כל העובדים באותה מחלקה
const deleteDepartment = async (id) => {
    try {
        const employees = await employeesRepo.getAllEmployees()
const employeesToDelete = employees.filter((emp) => emp.DepartmentId?.toString() === id.toString())
await Promise.all(
        employeesToDelete.map(emp => employeesService.deleteEmployee(emp._id)) );
        const delDep = await departmentsRepo.deleteDepartment(id)
        return { 
        departmentDeleted: delDep, 
        deletedEmployeesCount: employeesToDelete.length 
    };
    } catch (error) {
        console.error("Deleting the department failed:", error);
        return { success: false, error: error.message }; 
    }

}
// פונקציה שמאחדת את המחלקות עם העובדים לאותה מחלקה למערך אחד
const getAllemployesDepartment = async (id) => {
    const dep = await getDepartmentById(id);
    if (!dep) return null;
    const arrEmployes = await employeesRepo.getAllEmployees()
const arrShEmloy = arrEmployes.filter((emp) => 
    emp.DepartmentId?.toString() === id.toString());    
    const empSifts = {...dep, Employe : arrShEmloy}
return empSifts
}
//פונקציה שמוסיפה עובד למחלקה עי כפתור הוסף בתיבה המשולבת
const addEmpToDepart = async (id_emp, id_dep) =>{
const emp = await employeesRepo.getEmployeeById(id_emp)
if (!emp) throw new Error("Employee not found");
const updatedData = emp.toObject();
updatedData.DepartmentId = id_dep;
return await employeesRepo.updateEmployee(id_emp, updatedData)
}

//  פונקציה שמביאה את כל המחלקות כולל כל הפרטים של המחלקה
const getAllDepartmentsFullData = async () => {
    const departments = await departmentsRepo.getAllDepartments();
    const allEmployees = await employeesRepo.getAllEmployees();

    return departments.map(dep => {
        const deptEmployees = allEmployees.filter(emp => {
            console.log("Emp DeptId:", emp.DepartmentId, " | Dep _id:", dep._id);
            console.log("Emp:", emp);
             return    emp.DepartmentId?.toString() === dep._id.toString()
        }
        );
        const manager = allEmployees.find(emp => emp._id.toString() === dep.Manager?.toString());
        return {
            _id: dep._id,
            Name: dep.Name,
            ManagerName: manager ? `${manager.FirstName} ${manager.LastName}` : "N/A",
            Employee: deptEmployees.map(e => ({id : e._id , FullName : `${e.FirstName} ${e.LastName}`}))
        };
    });
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    getAllemployesDepartment,
    getAllDepartmentsFullData
};