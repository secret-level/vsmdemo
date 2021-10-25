const mysql = require('mysql');
const { mysqlConfig } = require('./config.js');
const mysqlConnection = mysql.createPool(mysqlConfig);

function getTableNamesAutoreport(dataAutoreport)
{
  return new Promise((resolve, reject) =>
  {
    mysqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_name REGEXP '^wc[0-9]+'",
    (error, results, fields) =>
    {
      if(error) reject(console.log(error));
      else if(results.length)
      {
        resolve(results.forEach((tableName) => dataAutoreport.push([tableName.table_name])));//extra array
      }
      else reject(console.log('No table with such a name.'));
    });
  });
}

function getTableContentAutoreport(dataAutoreport, index)
{
  return new Promise((resolve, reject) =>
  {
    let today = new Date().toISOString().slice(0, 10) + " 06:00:00";
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday = yesterday.toISOString().slice(0, 10) + " 06:00:00";

    mysqlConnection.query(`SELECT * FROM ${dataAutoreport[index]} WHERE reading_time BETWEEN '${yesterday}' AND '${today}'`,
    /*mysqlConnection.query("SELECT * FROM ? WHERE reading_time BETWEEN ? AND ?",
    [dataAutoreport[index], yesterday, today],*///why doesnt this work?
    (error, results, fields) =>
    {
      if(error) reject(console.log(error));
      else if(results.length) resolve(dataAutoreport[index].push(results));
      else
      {
        console.log(`getTableContentAutoreport(): ${dataAutoreport[index]} n/a`);
        resolve(dataAutoreport[index].push([]));
      }
    });
  });
};

async function sendTableNamesContentAutoreport(response)
{
  try
  {
    let dataAutoreport = [];

    await getTableNamesAutoreport(dataAutoreport);
    for(let index = 0; index < dataAutoreport.length; index++)
    {
      await getTableContentAutoreport(dataAutoreport, index);
    }
    response.status(200).json(JSON.stringify(dataAutoreport));
  }
  catch(error)
  {
    console.log(error);
    console.log('catch sendTableNamesContentAutoreport()');
    response.status(500).end();
  }
}

module.exports = {
  //getTableNamesAutoreport,
  //getTableContentAutoreport,
  sendTableNamesContentAutoreport
};