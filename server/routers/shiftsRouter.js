 const express = require('express');
 const shiftsService = require('../services/shiftsService')

 const router=express.Router()
 
 //קבלת כל המשמרות
 router.get('/', async (req,res) =>{
    try {
        const shifts = await shiftsService.getAllShift()
    res.send(shifts)
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message, stack: error.stack})  
    }
 })

  //קבלת משמרת ספציפית
 router.get('/:id', async (req,res) =>{
    try {
        const {id} = req.params
        const shift = await shiftsService.getShiftById(id)
    res.send(shift)
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message, stack: error.stack})  
    } 
 })
//עדכון משמרת
 router.put('/:id',async (req,res) =>{
    try {
        const {id} = req.params
        const updatedData=req.body
        const shift = await shiftsService.updateShift(id, updatedData)
    res.send(shift)
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message, stack: error.stack})  
    } 
 })
 //הוספת משמרת חדשה
 router.post('/', async (req, res) => {
 try{
 const credentials=req.body  
 const result= await shiftsService.addShift(credentials)
 res.status(201).send(result);
 }catch (error){
     res.status(500).send('Server error: Connection cannot be established at this time')
 }
    
 })
 //הקצאת עובד למשמרת
  router.post('/:id_shift/employee/:id_emp',async (req,res) =>{
    try {
        const { id_shift, id_emp } = req.params;
        const result = await shiftsService.getAllShiftEmp(id_shift, id_emp)
        if(result.success === false){
          return  res.status(400).send(result.message) 
        } else{
           res.status(200).send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message, stack: error.stack})  
    } 
 })

module.exports=router;
