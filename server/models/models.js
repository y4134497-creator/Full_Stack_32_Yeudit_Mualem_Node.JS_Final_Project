const mongoose = require('mongoose')
 const userModel= new mongoose.Schema(
    {
       FullName : String,
       NumOfActions: Number,
    }
 );
 const departmentModel= new mongoose.Schema(
    {
       Name : String,
       Manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Employee'},
    }
 )
  const employeeModel= new mongoose.Schema(
    {
       FirstName : String,
       LastName : String,
       StartWorkYear : Number,
       DepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Department'},
        
    },    
 )
  const shiftModel= new mongoose.Schema(
    {
       Date : Date,
       StartingHour : Number,
       EndingHour : Number,
       Employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    }
 )

const User = mongoose.model('User', userModel,)
const Department = mongoose.model('Department', departmentModel)
const Employee = mongoose.model('Employee', employeeModel)
const Shift = mongoose.model('Shift', shiftModel)

module.exports={
    User,
    Department,
    Employee,
    Shift
}