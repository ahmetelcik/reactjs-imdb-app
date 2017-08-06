import React, { Component } from 'react';
import superagent from 'superagent';

class Film extends Component {
  constructor(props) {
    super(props);
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


  render() {
    return (
      <div>
        {
          this.props.filmDetail !== undefined ? (
            <div onClick={this.handleClick}  className="film-detail" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1000/${this.props.filmDetail.backdrop_path})`  }}>
              {
                this.props.filmDetail !== undefined ? (
                  <div className="film-detail-header">
                    <h1 className="film-detail-title">
                      {this.props.filmDetail.original_title}
                    </h1>
                    <span className="film-detail-year">
              {this.props.filmDetail.release_date.substring(0,4)}
            </span>
                    <ul className="film-detail-list">
                      <li className="film-detail-item">
                        {this.props.filmDetail.release_date.substring(5,7)}
                        { " " }
                        {this.getMonth(parseInt(this.props.filmDetail.release_date.substring(8,10)))}
                        { " " }
                        {this.props.filmDetail.production_countries[0].iso_3166_1}
                        { " " }
                      </li>
                      <li className="film-detail-item">
                        <ul className="film-detail-item-list">
                          {
                            this.props.filmDetail.genres.map((cv,i) => {
                              return(
                                <li className="film-detail-list-item" key={this.props.filmDetail.genres[i].id}>{this.props.filmDetail.genres[i].name}</li>
                              )
                            })
                          }
                        </ul>
                      </li>
                      <li className="film-detail-item">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        {
                          this.getHour(this.props.filmDetail.runtime)
                        }
                      </li>
                    </ul>
                    <p className="film-detail-overview">
                      {this.props.filmDetail.overview}
                    </p>
                    <div className="film-detail-vote">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <span className="film-detail-vote-average">
                {this.props.filmDetail.vote_average}
              </span>
                      <span className="film-detail-vote-count">
                {this.props.filmDetail.vote_count}
              </span>
                    </div>
                  </div>
                ) : ""
              }
              {
                this.props.filmCredits !== undefined ? (
                  <div className="film-stars">
                    <ul className="film-stars-list">
                      {
                        this.props.filmCredits.cast.map((cv,i) => {
                          if(i<3){
                            return(
                              <li key={this.props.filmCredits.cast[i].id} className="film-stars-item">
                                <img alt="" className="film-stars-image" src={`https://image.tmdb.org/t/p/w500/${this.props.filmCredits.cast[i].profile_path}`}  />
                                <div className="film-star-name">
                                  <span className="film-star-first-name">
                                    {this.props.filmCredits.cast[i].name}
                                  </span>
                                </div>
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </div>
                ) : ""
              }
              {
                this.props.filmCredits !== undefined ? (
                  <div className="film-maker">
                    <ul className="film-maker-list">
                      <li className="film-maker-list-item">
                        <h4 className="film-maker-director-header">DIRECTOR</h4>
                        <span className="film-maker-director-name">
                  {
                    this.props.filmCredits.crew.map((cv,i) => {
                      if(this.props.filmCredits.crew[i].job === "Director") {
                        return(
                          <span>{this.props.filmCredits.crew[i].name}</span>
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
                            this.props.filmCredits.crew.map((cv,i) => {
                              if(this.props.filmCredits.crew[i].department === "Writing") {
                                return(
                                  <li key={this.props.filmCredits.crew[i].id + i} className="film-maker-writer-name">
                                    <span>{this.props.filmCredits.crew[i].name}</span>
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