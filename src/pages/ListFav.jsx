import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const ListFav = () => {
  const [movie, setMovie] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let getLocal = JSON.parse(localStorage.getItem("data"));
    setMovie(getLocal);
    setIsReady(true);
  };

  const addToFav = (item) => {
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
    fetchData();
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <h4 className="text-center py-4">LIST FAVORITE</h4>
        <div className="row d-flex flex-wrap gap-3 justify-content-center">
          {movie.map((item) => {
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
                  <button className={checkFav ? "btn btn-outline-danger" : "btn btn-danger"} onClick={() => addToFav(item)}>
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
};
export default ListFav;
