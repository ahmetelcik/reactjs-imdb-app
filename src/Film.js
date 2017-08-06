import React, { Component } from 'react';
import superagent from 'superagent';

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    }
  }

  getHour = (hour) => {
    let min=hour%60;
      let h=Math.floor(hour/60);
    return(
      <span>{h}h {min}m </span>
    )
  };

  getMonth = (index) => {
    var month;
    switch (index) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
      default:
        month = "January";
    }
    return(
      month
    )
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
      }, (err) => {
        console.log(err.message);
      });

  };

  handleClick = () => {
    {
      console.log("Id var mı?" + this.props.id)
      this.props.id !== undefined ? (
        this.getFilmDetails(this.props.id),
        this.getFilmCredits(this.props.id)
      ) : ""
    }
  };

  render() {
    var filmDetail = this.state.filmDetail;
    var filmCredits = this.state.filmCredits;
    return (
      <div>
        <a onClick={this.handleClick}>Send</a>
        {
          filmDetail !== undefined ? (
            <div className="film-detail" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1000/${filmDetail.backdrop_path})`  }}>
              {
                filmDetail !== undefined ? (
                  <div className="film-detail-header">
                    <h1 className="film-detail-title">
                      {filmDetail.original_title}
                    </h1>
                    <span className="film-detail-year">
              {filmDetail.release_date.substring(0,4)}
            </span>
                    <ul className="film-detail-list">
                      <li className="film-detail-item">
                        {filmDetail.release_date.substring(5,7)}
                        { " " }
                        {this.getMonth(parseInt(filmDetail.release_date.substring(8,10)))}
                        { " " }
                        {filmDetail.production_countries[0].iso_3166_1}
                        { " " }
                      </li>
                      <li className="film-detail-item">
                        <ul className="film-detail-item-list">
                          {
                            filmDetail.genres.map((cv,i) => {
                              return(
                                <li className="film-detail-list-item" key={filmDetail.genres[i].id}>{filmDetail.genres[i].name}</li>
                              )
                            })
                          }
                        </ul>
                      </li>
                      <li className="film-detail-item">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        {
                          this.getHour(filmDetail.runtime)
                        }
                      </li>
                    </ul>
                    <p className="film-detail-overview">
                      {filmDetail.overview}
                    </p>
                    <div className="film-detail-vote">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <span className="film-detail-vote-average">
                {filmDetail.vote_average}
              </span>
                      <span className="film-detail-vote-count">
                {filmDetail.vote_count}
              </span>
                    </div>
                  </div>
                ) : ""
              }
              {
                filmCredits !== undefined ? (
                  <div className="film-stars">
                    <ul className="film-stars-list">
                      <li className="film-stars-item">
                        <img alt="" className="film-stars-image" src={`https://image.tmdb.org/t/p/w500/${filmCredits.cast[0].profile_path}`}  />
                        <div className="film-star-name">
                    <span className="film-star-first-name">
                      {filmCredits.cast[0].name}
                    </span>
                        </div>
                      </li>
                      <li className="film-stars-item">
                        <img alt="" className="film-stars-image" src={`https://image.tmdb.org/t/p/w500/${filmCredits.cast[1].profile_path}`} />
                        <div className="film-star-name">
                    <span className="film-star-first-name">
                      {filmCredits.cast[1].name}
                    </span>
                        </div>
                      </li>
                      <li className="film-stars-item">
                        <img alt="" className="film-stars-image" src={`https://image.tmdb.org/t/p/w500/${filmCredits.cast[2].profile_path}`}  />
                        <div className="film-star-name">
                    <span className="film-star-first-name">
                      {filmCredits.cast[2].name}
                    </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                ) : ""
              }
              {
                filmCredits !== undefined ? (
                  <div className="film-maker">
                    <ul className="film-maker-list">
                      <li className="film-maker-list-item">
                        <h4 className="film-maker-director-header">DIRECTOR</h4>
                        <span className="film-maker-director-name">
                  {
                    filmCredits.crew.map((cv,i) => {
                      if(filmCredits.crew[i].job === "Director") {
                        return(
                          filmCredits.crew[i].name
                        )
                      }
                    })
                  }
                </span>
                      </li>
                      <li className="film-maker-list-item">
                        <h4 className="film-maker-writer-header">WRITER</h4>
                        <ul className="film-maker-writers">
                          {
                            filmCredits.crew.map((cv,i) => {
                              if(filmCredits.crew[i].department === "Writing") {
                                return(
                                  <li key={filmCredits.crew[i].id} className="film-maker-writer-name">
                                    {filmCredits.crew[i].name}
                                  </li>
                                )
                              }
                            })
                          }
                        </ul>
                      </li>
                    </ul>
                  </div> ) : ""
              }
            </div>
          ) : ""
        }
      </div>
    )
  }
}

export default Film;