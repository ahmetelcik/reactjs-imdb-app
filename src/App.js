import React, { Component } from 'react';
import superagent from 'superagent';
import './App.css';
import Film from './Film.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      film:[],
      query:"Grand Budapest Hotel"
    }
  }

  getFilm = () => {
    const url = "https://api.themoviedb.org/3/search/movie?";
    const params = {
      api_key:"f681d442d64e8d1a866ef54693c4e2b0",
      query:this.state.query
    };

    superagent
      .get(url)
      .query(params)
      .set("Accept", "application/json")
      .then((data) => {
        this.setState({
          film:data.body.results,
          id:data.body.results[0].id
        },()=>{
          this.getFilmDetails(this.state.id);
            this.getFilmCredits(this.state.id);
        });
      },(err) => {
        console.log(err.message);
      });
  };

  getFilmCredits = (id) => {
    const url = "https://api.themoviedb.org/3/movie/" + id + "/credits";

    const params = {
      api_key: "f681d442d64e8d1a866ef54693c4e2b0",
    };

    superagent
      .get(url)
      .query(params)
      .set("Accept", "application/json")
      .then((data) => {
        this.setState({
          filmCredits: data.body
        });
        console.log("Film Credit çalışıyp");
      }, (err) => {
        console.log(err.message);
      });

  };

  getFilmDetails = (id) => {
    const url = "https://api.themoviedb.org/3/movie/" + id;

    const params = {
      api_key: "f681d442d64e8d1a866ef54693c4e2b0",
    };

    superagent
      .get(url)
      .query(params)
      .set("Accept", "application/json")
      .then((data) => {
        this.setState({
          filmDetail: data.body
        });
        console.log("Film detail çalılıyo");
      }, (err) => {
        console.log(err.message);
      });

  };

  handleChange = (e) => {
    this.setState({
      query:e.target.value
    })
  };

  handleSend = (e) => {
    e.preventDefault();
    {
      this.getFilm();
    }
  };

  componentDidMount(){
    this.getFilm();
  }


  render() {
    const films = this.state.film;
    return (
      <div>
      {
        console.log(this.state.query),
        <div className="page">
          <form className="search-film" onSubmit={this.handleSend}>
            <input onChange={this.handleChange} className="search-film-name" type="text" placeholder="Movies, TV shows, Celebrities and more" />
            <button type="submit" className="search-film-button">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        {
          this.state.id !== undefined  ? (
              <Film id={this.state.film[0].id} filmDetail={this.state.filmDetail} filmCredits={this.state.filmCredits} />
          ) : ""
        }
        </div>
      }
      </div>
    );
  }
}

export default App;
