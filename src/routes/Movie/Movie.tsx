import { useLocation, useParams } from "react-router-dom"
import { useState, useEffect } from "react";

const Movie = () => {

   interface Movie {
    Title: string
    Year: string
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Poster: string
    Ratings: Rating[]
    Metascore: string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    Type: string
    totalSeasons: string
    Response: string
  }
  
   interface Rating {
    Source: string
    Value: string
  }

  const [data, setData] = useState<Movie>({});

  const location = useLocation();

  console.log(location);

  const {movieId} = useParams();
  console.log(movieId);

  async function getMovies() {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=f1ec40aa&i=${movieId}`
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
    <h1>{data.Title}</h1>
    </>
  )
}

export default Movie