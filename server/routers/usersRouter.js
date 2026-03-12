
const express=require('express')
const usersService=require('../services/usersService')

const router=express.Router()
// מביא את רשימת כל המשתמשים
router.get('/', async (req, res) => {
try{
const users= await usersService.getAllusers()
  res.send(users)
}catch(error){console.log("--- DEBUG ERROR ---");
    console.log(error); 
    res.status(500).send({ message: error.message, stack: error.stack });
}
})
// פונקציה שבודקת את הלוגין אם המשתמש יכול להכנס
router.post('/login', async (req, res) => {
try{
const credentials=req.body  
const result= await usersService.login(credentials)
if(result.success){
   res.send(result) 
}else res.status(401).send("Invalid Username or Email")
  
}catch (error){
    res.status(500).send('Server error: Connection cannot be established at this time')
}
   
})
// עדכון פעולות ובדיקת מכסה
router.put('/:id', async (req, res) => {
    try {
        const{id}=req.params
   const updatedData=req.body 
const result= await usersService.checkAndUpdateActions(id, updatedData)
if (result.success) {
  res.send(result.user) } else{
    res.status(403).json({ 
                message: result.message, 
                outOfActions: true});
  }
    } catch (error) {
            res.status(500).send('Error updating user actions"')
    }
   
})


module.exports=router;

