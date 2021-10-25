//a placeholder file that doesn't do anything meaningful yet

const mysql = require('mysql');
const { mysqlConfig } = require('./config.js');
const mysqlConnection = mysql.createPool(mysqlConfig);

function getUsername()
{
  return new Promise((resolve, reject) =>
  {
    mysqlConnection.query("SELECT * FROM accounts WHERE username = ?",
    ['demo'], (error, results, fields) =>
    {
      if(error) reject(console.log(error));
      else if(results.length) resolve(results);
      else reject(console.log('Couldnt find the user.'));
    });
  });
}

async function getUserData(response)
{
  try
  {
    let userData = await getUsername();
    response.status(200).json(JSON.stringify(userData));
  }
  catch(error)
  {
    console.log(error);
    console.log('/usersettings catch()');
    response.status(500).end();
  }
}

  module.exports = {
  /*getUsername,*/
  getUserData
};