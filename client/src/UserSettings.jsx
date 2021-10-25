import { Component } from 'react';
import './UserSettings.css';

class UserSettings extends Component
{
  constructor()
  {
    super();
    this.state =
    {
      userData: []
    };
  }

  componentDidMount()
  {
    fetch('/userSettings',
    {
      method: 'GET'
    })
    .then(response => response.json())
    .then(fetchedData => this.setState({ userData: JSON.parse(fetchedData) }))
    .catch(error => console.log(error));
  }

  render()
  { 
    return (
        <div className="user">
          {this.state.userData.map(user => user.username)}
          {this.state.userData.map((user, index) => <div key={index}>{user.email}</div>)} 
        </div>
    );
  }
}
        
export default UserSettings;