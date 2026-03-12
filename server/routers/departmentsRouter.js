const departmentsService = require('../services/departmentsService')
const express = require('express')

const router=express.Router()
//  פונקציה שמביאה את כל המחלקות כולל כל הפרטים של המחלקה
router.get('/', async (req, res) => {
try{
const department= await departmentsService.getAllDepartmentsFullData()
  res.send(department)
}catch(error){
    console.log(error);
    res.status(500).send({ message: error.message, stack: error.stack });
}
})
// פונקציה שמאחדת את המחלקות עם העובדים לאותה מחלקה למערך אחד
router.get('/:id', async (req, res) => {
try{
    const{id}=req.params
const employee= await departmentsService.getAllemployesDepartment(id)
if (!employee) {
            return res.status(404).send({ message: "Department not found" });
        }
  res.send(employee)
}catch(error){
    console.log(error);
    res.status(500).send({ message: error.message, stack: error.stack });
}
})
// עדכון נתוני מחלקה
router.put('/:id', async (req, res) => {
    try {
        const{id}=req.params
   const updatedData=req.body 
const user= await departmentsService.updateDepartment(id, updatedData)
  res.send(user)
    } catch (error) {
            res.status(500).send('Error updating department')
    }
})
// הוספת מחלקה חדשה
router.post('/', async (req, res) => {
try{
const credentials=req.body  
const result= await departmentsService.addDepartment(credentials)
res.status(201).send(result);
}catch (error){
    res.status(500).send('Server error: Connection cannot be established at this time')
}
   
})
// מחיקת מחלקה כולל כל העובדים וכולל במשמרות
router.delete('/:id', async (req, res) => {
try{
const{id}=req.params 
const result= await departmentsService.deleteDepartment(id)
res.send({ message: "Department deleted", result });
}catch (error){
    res.status(500).send('Server error: Connection cannot be established at this time')
}
   
})

module.exports=router;

