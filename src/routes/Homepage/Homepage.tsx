import { useEffect, useMemo, useState } from "react";
import classes from "./Homepage.module.css";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

const Homepage = () => {
  interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }

  //get movies
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  async function getMovies() {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=f1ec40aa&s=Pokemon&page=${page}`
      );
      const json = await response.json();
      setData(json.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  console.log(data);

  useEffect(() => {
    getMovies();
  }, [page]);

  //fetch page on click
  const handlePageIncrease = () => {
    setPage((page) => page + 1);
  };

  const handlePageDecrease = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  //column definition

  const columns = useMemo<MRT_ColumnDef<Movie>[]>(
    () => [
      {
        accessorKey: "Title",
        header: "Title",
      },
      {
        accessorKey: "Year",
        header: "Year",
      },
      {
        accessorKey: "imdbID",
        header: "IMDb Id",
      },
    ],
    []
  );

  return (
    <>
      <div className={classes.appContainer}>
        <h1 className={classes.header}>
          <img className={classes.omdbLogo} src="/omdb-logo.svg"></img> MDB
          MOVIE FINDER
        </h1>
        <div className={classes.searchContainer}>
          <input className={classes.searchInput} type="text" placeholder="Search for a movie..." />
          <button className={classes.searchButton}>Search</button>
        </div>
        <div className={classes.tableWrapper}>
          <MaterialReactTable<Movie>
            data={data}
            columns={columns}
            enablePagination={false}
          />
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.paginationButton}
            onClick={handlePageDecrease}
          >
            Previous
          </button>
          <button
            className={classes.paginationButton}
            onClick={handlePageIncrease}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
