import { useEffect, useState } from "react"
import classes from "./Homepage.module.css"

const Homepage = () => {

  const [data, setData] = useState("");

  async function getMovies() {
    const data = await fetch(`http://www.omdbapi.com/?apikey=f1ec40aa&s=Pokemon`)
    const json = await data.json()
    setData(json);
  }

  console.log(data);

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <>
      <div className={classes.appContainer}>
      <h1 className={classes.header}> <img className={classes.omdbLogo} src="/omdb-logo.svg"></img> MDB MOVIE FINDER</h1>
      </div>
    </>
  )
}

export default Homepage