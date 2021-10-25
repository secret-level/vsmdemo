import './Home.css';

const Home = () =>
{
  return (
    <div className="home">
      
      <div className="intro">
        <h3>Greetings!</h3>
        <p>This is a simple express/react app that is part of a factory machine monitoring process.
          It's made of a couple of different elements which fetch the data from the database and display it in table format.</p>

        <h4>The login system</h4>
        <p>The apps checks the database for the submitted username, fetches the salt, calculates the hash based on the salt and
          the submitted password and ultimately authorizes the login.</p>

        <h4>Machines: Fetches the data for a single machine</h4>
        <p>The app checkes the database for existing machines and displays a button for each one.
           Clicking on a button fetches and displays the data for that machine.</p>

        <h4>Autoreport: Fetches all the data from the past 24h</h4>
        <p>The app checkes the database for existing machines,
           then runs a query that limits the results from 6 am yesterday to 6 am today and displays the results of the query.</p>

        <h4>User Settings</h4>
        <p>A work in progress. At the moment it does nothing except fetch and display the username and the email.</p>
        
        <h4>Logout: logs out the user</h4>
        <p>It redirects the user to the login page and destroys the session.</p>
      </div>

      <h3>To do</h3>
      <ul className="todo">
        <li>Rewrite the login logic in react instead of directly accessing html dom elements</li>
        <li>In autoreport, the machine name should be in big letters between different machine reports.
            Figure out how to deal with 'if' state logic</li>
        <li>Machines tab should have graphs (graph.js?)</li>
        <li>Figure out how to implement the email autoreport (cronjob in react?)</li>
        <li>Learn css and make it pretty on a wider range of devices</li>
        <li>Rendering full queries in /machines is starting to take a long time.
            It should be split up into pages (maybe 1000 per page).</li>
      </ul>

      <h3>To fix</h3>
      <ul className="tofix">
        <li>Logged-in permission logic should work in react.
            Make it show something like the 404 page with a link to login if not logged in.</li>
        <li>Properly cancel fetch on switching pages.
            Although it's not clear if the currect implementation on heroku still has the issue (it should have it)</li>
        <li>error: 'handleClick' is assigned a value but never used (heroku just gives a warning during compilation)</li>
        <li>Navbar routing in app.jsx is sketchy</li>
        <li>ccs positioning seems sketchy. Some of the reports move the navbar slightly.</li>
        <li>The time zone in the localhost app seems to be +0 instead of +2.
            The entries are correct, but the displayed time seems wrong and show -2 of what it should be.
            It seems alright on heroku though</li>
      </ul>

      <h3>To think about</h3>
      <ul className="tothink">
        <li>What should be in user settings?</li>
        <li>React function vs. class, what and why?</li>
      </ul>

      <h3>Changelog</h3>
      <ul className="changelog">
        <h4>25.10.2021</h4>
        <li>Added a basic IP logger to login.js.</li>
        <h4>22.9.2021</h4>
        <li>Made various code parts easier to read.</li>
        <h4>20.9.2021</h4>
        <li>Added a short description of the app in the Dashboard section</li>
        <h4>19.9.2021</h4>
        <li>Added onClick() fetching to Machines.jsx,
            corresponding server logic to machinesData.js and a /machinesData POST request to index.js</li>
        <li>Streamlined the names of various functions and variables, added response.status(200/401/500)
            and removed some unneeded server-side console.log() checks</li>
        <h4>18.9.2021</h4>
        <li>Added simple css styling to Machines.jsx fetched names buttons</li>
        <li>Added an onClick() function to Machines.jsx which returns the names of the machine-buttons clicked</li>
        <li>Fixed login/logout timeout crashing (lacked res.x())</li>
        <li>Removed an unnecessary array layer in machines.js/Machines.jsx query</li>
        <li>Removed static.json (apparently isn't needed)</li>
        <li>Commented out functions that don't need to be exported in index.js/machines.js/autoreport.js</li>
      </ul>

    </div>
  );
 }
        
export default Home;