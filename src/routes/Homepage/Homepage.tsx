import { useEffect, useMemo, useState } from "react";
import classes from "./Homepage.module.css";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";

const Homepage = () => {
  interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }

  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [movie, setMovie] = useState("Pokemon");
  const [year, setYear] = useState<number | null>(null);

  const navigate = useNavigate();

  async function getMovies() {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=f1ec40aa&s=${movie}&page=${page}&y=${year}`
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
  }, [page, movie, year]);

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
        Cell: ({ cell }) => (
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate(`/movie/${cell?.row?.original?.imdbID}`)}
          >
            {cell.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "Poster",
        header: "Poster",
        Cell: ({ cell }) => (
          <img style={{width:'150px'}} src=            {cell.getValue<string>()}
          >
          </img>
        ),
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

  
  const handleDatePickerChange = (date: moment.Moment | null) => {
    if (date) {
      const year = date.year(); 
      setYear(year);
      setPage(1);
    }
  };


  return (
    <>
      <div className={classes.appContainer}>
        <h1 className={classes.header}>
          <img className={classes.omdbLogo} src="/omdb-logo.svg"></img> MDB
          MOVIE FINDER
        </h1>
        <div className={classes.searchContainer}>
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            className={classes.searchInput}
            type="text"
            placeholder="Search for a movie..."
          />
          <button
            onClick={() => setMovie(searchInput)}
            className={classes.searchButton}
          >
            Search
          </button>
          <div className={classes.yearFilter}>
          <p>Filter by year</p>
          <DatePicker onChange={handleDatePickerChange} picker="year"/>
        </div>
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
