const mysql = require('mysql');
const { mysqlConfig } = require('./config.js');
const mysqlConnection = mysql.createPool(mysqlConfig);

function getTableContentMachinesData(machineName)
{
  return new Promise((resolve, reject) =>
  {
    mysqlConnection.query(`SELECT * FROM ${machineName}`,
    (error, results, fields) =>
    {
      if(error) reject(console.log(error));
      else if(results.length)
      {
        results.forEach((object) => object.ime = machineName);
        resolve(results);
      }
      else
      {
        console.log(`getTableContentMachinesData() ${machineName} n/a`);
        resolve([{
          "ime": `${machineName}`,
          "id": "n/a",
          "deluje": "n/a",
          "alarm": "n/a",
          "izbira": "n/a",
          "reading_time": "n/a"
        }]);
      }
    });
  });
};

async function sendTableContentMachinesData(machineName, response)
{
  try
  {
    const sendContent = await getTableContentMachinesData(machineName);
    response.status(200).json(JSON.stringify(sendContent));
  }
  catch(error)
  {
    console.log(error);
    console.log('/machinesData catch()');
    response.status(500).end;
  }
}

module.exports = {
  //getTableContentMachinesData,
  sendTableContentMachinesData
};