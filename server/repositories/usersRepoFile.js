const jf = require('jsonfile');
const path = require('path');

const ACTIONS_FILE = path.join(__dirname, '../data/actions.json');

const getActions= async () =>{
    try {
        return await jf.readFile(ACTIONS_FILE);
    } catch (error) { 
        console.error("Error reading from actions.json:", error.message);
        return { actions: [] };
    }
}

const saveActions= async (data) =>{
    try {
        await jf.writeFile(ACTIONS_FILE, data, { spaces: 2 });
        return true
    } catch (error) { 
        console.error("Error writing to actions.json:", error.message);
        return false;
    }
}

module.exports={
 getActions,
 saveActions,   
}