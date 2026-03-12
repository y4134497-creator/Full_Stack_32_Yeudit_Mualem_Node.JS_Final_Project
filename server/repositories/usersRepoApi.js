const axios= require('axios');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getUserApiAll = async () => {
  const {data} = await axios.get(USERS_URL);
  console.log(data);
  return data
};

module.exports = {getUserApiAll};