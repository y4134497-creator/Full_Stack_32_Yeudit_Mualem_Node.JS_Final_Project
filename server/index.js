const express=require('express')
const cors =require('cors')
const connectDB=require('./configs/db')
const usersRouter=require('./routers/usersRouter')
const departmentsRouter=require('./routers/departmentsRouter')
const employeesRouter=require('./routers/employeesRouter')
const shiftsRouter=require('./routers/shiftsRouter')
const { verifyActions } = require('./middleware/authMiddleware');


const app=express();
const PORT=3000;
connectDB();
app.use(cors());
app.use(express.json())

app.use('/users',usersRouter);
app.use(verifyActions)
app.use('/departments',departmentsRouter);
app.use('/employees',employeesRouter);
app.use('/shifts',shiftsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
