import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./Movie.module.css";

const Movie = () => {
  interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    totalSeasons: string;
    Response: string;
  }

  interface Rating {
    Source: string;
    Value: string;
  }

  const [data, setData] = useState<Movie>({});

  const { movieId } = useParams();
  console.log(movieId);

  async function getMovies() {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=f1ec40aa&i=${movieId}&plot=full`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  console.log(data);

  return (
    <>
      <h1 className={classes.title}>{data.Title}</h1>
      <div className={classes.container}>
        <img src={data.Poster} alt="movie poster"></img>
        <div className={classes.details}>
          <p><span className={classes.pointer}>Genre</span>: {data.Genre}</p>
          <p><span className={classes.pointer}>Country</span>: {data.Country}</p>
          <p><span className={classes.pointer}>Release Date</span>: {data.Released}</p>
          <p><span className={classes.pointer}>Duration</span>: {data.Runtime}</p>
          <p><span className={classes.pointer}>Director</span> : {data.Director}</p>
          <p><span className={classes.pointer}>Cast</span>: {data.Actors}</p>
          <p><span className={classes.pointer}>IMDb Rating</span>: {data.imdbRating}</p>
        </div>
      </div>
      <h2 className={classes.plotHeader}>Plot</h2>
      <p className={classes.plotText}>{data.Plot}</p>
    </>
  );
};

export default Movie;
