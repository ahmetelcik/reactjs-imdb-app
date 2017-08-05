import React, { Component } from 'react';
import superagent from 'superagent';
import './App.css';

class App extends Component {

  getFilm = () => {
    const url = "https://api.themoviedb.org/3/search/movie?";
    const params = {
      api_key:"f681d442d64e8d1a866ef54693c4e2b0",
      query:"arrival"
    };

    superagent
      .get(url)
      .query(params)
      .set("Accept", "application/json")
      .then((data) => {
        console.log(data);
        console.log(url);
      },(err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div className="App">
        <a onClick={this.getFilm} >Click Me</a>
      </div>
    );
  }
}

export default App;
