import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class NowPlaying extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      isReady: false,
    };
  }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`)
      .then((response) => {
        this.setState({ data: response.data.results, isReady: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async addToFav(item) {
    let getLocal = JSON.parse(localStorage.getItem("data"));
    if (getLocal) {
      let findItem = getLocal.findIndex((i) => item.id === i.id);
      if (findItem != -1) {
        let newItem = getLocal;
        getLocal.splice(findItem, findItem + 1);
        localStorage.removeItem("data");
        localStorage.setItem("data", JSON.stringify(newItem));
      } else {
        getLocal.push(item);
        localStorage.setItem("data", JSON.stringify(getLocal));
      }
    } else {
      localStorage.setItem("data", JSON.stringify([item]));
    }
  }

  render() {
    return (
      <div>
        <Navbar label="MyMovies" navpage1="Home" navpage2="Favorite" />
        <div className="container-fluid">
          <h4 className="text-center py-4">NOW PLAYING</h4>
          <div className="row d-flex flex-wrap gap-3 justify-content-center">
            {this.state.data.map((item) => {
              let getLocal = JSON.parse(localStorage.getItem("data"));
              let checkFav = getLocal.find((i) => i.id === item.id);
              return (
                <div key={item.id} className="card" style={{ width: "18rem" }}>
                  <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">Original Title : {item.original_title}.</p>
                    <p className="card-text">Release Date : {item.release_date}.</p>
                  </div>
                  <div className="d-flex justify-content-end mb-2">
                    <button className={checkFav ? "btn btn-outline-danger" : "btn btn-danger"} onClick={() => this.addToFav(item)}>
                      {checkFav ? "Favorited" : "Favorite"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
