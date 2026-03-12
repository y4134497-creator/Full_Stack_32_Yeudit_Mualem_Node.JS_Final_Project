
const express=require('express')
const employeeService=require('../services/employeesService')

const router=express.Router()
// קבלת נתוני כל העובדים כולל מחלקות ומשמרות 
router.get('/', async (req, res) => {
try{
const employees= await employeeService.getAllEmployeesFullData()
  res.send(employees)
}catch(error){
    console.log(error);
    res.status(500).send({ message: error.message, stack: error.stack });
}
})
// קבלת עובד ע"פ ID
router.get('/:id', async (req, res) => {
try{
    const{id}=req.params
const employee= await employeeService.getAllShiftsEmployee(id)
  res.send(employee)
}catch(error){
    console.log(error);
    res.status(500).send({ message: error.message, stack: error.stack });
}
})
// עדכון נתוני עובד
router.put('/:id', async (req, res) => {
    try {
        const{id}=req.params
   const updatedData=req.body 
const user= await employeeService.updateEmployee(id, updatedData)
  res.send(user)
    } catch (error) {
            console.log("השגיאה האמיתית היא:", error.message);
        res.status(500).send({ message: error.message });
    }
})
// הוספת עובד חדש
router.post('/', async (req, res) => {
try{
const credentials=req.body  
const result= await employeeService.addEmployee(credentials)
res.status(201).send(result);
}catch (error){
    res.status(500).send('Server error: Connection cannot be established at this time')
}
   
})
// מחיקת עובד
router.delete('/:id', async (req, res) => {
try{
const{id}=req.params 
const result= await employeeService.deleteEmployee(id)
res.send({ message: "Employee deleted", result });
}catch (error){
    res.status(500).send('Server error: Connection cannot be established at this time')
}
   
})

module.exports=router;

