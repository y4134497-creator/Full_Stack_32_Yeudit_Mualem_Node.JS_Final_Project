const usersRepo = require('../repositories/usersRepo')
const usersRepoApi= require('../repositories/usersRepoApi')
const jf= require ('jsonfile')
const usersRepoFile= require('../repositories/usersRepoFile')

const getAllusers = async () => {
  return await usersRepo.getAllUsers();
};

const login = async (obj) => {
const arrUsersApi = await usersRepoApi.getUserApiAll()
const loginUserApi = arrUsersApi.find((user)=>user.username===obj.username && user.email ===obj.email)
if(loginUserApi){
    const arrUsers = await usersRepo.getAllUsers()
    const loginUser = arrUsers.find((user)=>user.FullName===loginUserApi.name)
    if (loginUser){
     return { success: true, user: loginUser }
    }else return { success: false, message: "User not authorized in system" };
} else 
    return { success: false, message: "Unauthorized" };
}

const checkAndUpdateActions = async (id)=>{
const user = await usersRepo.getUserById(id)

if(!user) return  { success: false, message: "User not found" };  
    
const today = new Date().toLocaleDateString('he-IL');
const arrActiv = await usersRepoFile.getActions()
const actions=arrActiv.actions
const actionsId = actions.filter((act)=>act.id == id)
const activeEnd = actionsId[actionsId.length-1]
const dateEnd = activeEnd ? activeEnd.date : null;

 let NumActions
 
if(dateEnd !== today){
     NumActions=100
}else{
    if(user.NumOfActions <= 0){
        return { success: false, message: "The activity quota for today has run out." };
}else{
    NumActions=user.NumOfActions-1
}}



const updatedUser = await usersRepo.updateUser(id, NumActions);
arrActiv.actions.push({ "id": id, "maxActions": 100, "date": today, "actionAllowd": NumActions })
// await usersRepoFile.saveActions(arrActiv)
return { success: true, user: updatedUser }    
}
const getUserById = async (id) => {
    return await usersRepo.getUserById(id);
};

module.exports ={
    getAllusers,
    login,
    checkAndUpdateActions,
    getUserById
}