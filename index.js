const express = require('express');
const session = require('express-session');
const { sessionConfig } = require('./express_logic/config.js');
const { getSaltFromDatabase,
        createHash,
        compareHash } = require('./express_logic/login.js');
const { getUsername,
        getUserData } = require('./express_logic/userSettings.js');
const { /*getTableNamesMachines,*/
          sendTableNamesMachines } = require('./express_logic/machines.js');
const { /*getTableContentMachinesData,*/
          sendTableContentMachinesData } = require('./express_logic/machinesData.js');
const { /*getTableNamesAutoreport,
          getTableContentAutoreport,*/
          sendTableNamesContentAutoreport } = require('./express_logic/autoreport.js');
const app = express();
app.use(express.json());//POST/PUT json object
app.use(express.urlencoded({ extended: true }));//POST/PUT string/array
app.use(session(sessionConfig));//login session/cookie

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listening on port ${port}\n`));

app.post('/login', (request, response) =>
{
  const username = request.body.username;
  const password = request.body.password;

  if(username && password) compareHash(username, password, request, response);
  else console.log('Enter username/password.');
});//else doesn't seem to ever be the case since html already does it with 'required'

app.get('/machines', (request, response) =>
{
  if(request.session.loggedin)
  {
    let machineNames = [];
    sendTableNamesMachines(machineNames, response);
  }
  else
  {
    console.log('/machines not logged in.');
    response.status(401).redirect('/');//needs to be fixed in react
  }
});

app.post('/machinesData', (request, response) =>
{
  if(request.session.loggedin)
  {
    sendTableContentMachinesData(request.body.machineName, response);
  }
  else
  {
    console.log('/machinesData not logged in.');
    response.status(401).redirect('/');//needs to be fixed in react
  }
});

app.get('/autoreport', (request, response) =>
{
  if(request.session.loggedin)
  {
    sendTableNamesContentAutoreport(response);
  }
  else
  {
    console.log('/autoreport not logged in.');
    response.status(401).redirect('/');//needs to be fixed in react
  }
});

app.get('/usersettings', (request, response) =>
{
  if(request.session.loggedin) getUserData(response);
  else
  {
    console.log('/usersettings not logged in.');
    response.status(401).redirect('/');//needs to be fixed in react
  }
});

app.get('/logout', (request, response) =>
{
  request.session.destroy();
  response.status(200).end();
});

//I need this for heroku or it'll crash
app.use(express.static('client/build', { root: __dirname }));

app.get('*', (request, respond) =>
{
  respond.sendFile('/client/build/index.html', { root: __dirname });
});//https://stackoverflow.com/questions/44723509/react-routing-works-in-locally-but-not-heroku