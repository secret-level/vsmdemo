const mysql = require('mysql');
const { mysqlConfig } = require('./config.js');
const mysqlConnection = mysql.createPool(mysqlConfig);

function getTableNamesMachines(machineNames)
{
  return new Promise((resolve, reject) =>
  {
    mysqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_name REGEXP '^wc[0-9]+'",
    (error, results, fields) =>
    {
      if(error) reject(console.log(error));
      else if(results.length)
      {
        resolve(results.forEach((tableName) => machineNames.push(tableName.table_name)));//no extra array
      }
      else reject(console.log('No table with such a name.'));
    });
  });
}

async function sendTableNamesMachines(machineNames, response)
{
  try
  {
    await getTableNamesMachines(machineNames);
    response.status(200).json(JSON.stringify(machineNames));
  }
  catch(error)
  {
    console.log(error);
    console.log('/machines catch()');
    response.status(500).end();
  }
}

module.exports = {
  //getTableNamesMachines,
  sendTableNamesMachines
};