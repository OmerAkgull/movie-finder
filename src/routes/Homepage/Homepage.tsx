import { useEffect, useMemo, useState } from "react";
import classes from "./Homepage.module.css";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";
import { Select, SelectChangeEvent } from "@mui/material/";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

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
  const [type, setType] = useState("");

  const navigate = useNavigate();

  async function getMovies() {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=f1ec40aa&s=${movie}&page=${page}&y=${year}&type=${type}`
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
  }, [page, movie, year, type]);

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

  const handleMovieSearch = () => {
    setMovie(searchInput);
    setPage(1);
    setYear(null);
  }

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
    setPage(1);
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
            onClick={handleMovieSearch}
            className={classes.searchButton}
          >
            Search
          </button>
          <div className={classes.yearFilter}>
          <DatePicker size="large" onChange={handleDatePickerChange} picker="year"/>
        </div>
        <FormControl style={{backgroundColor:"white", width: '150px', marginLeft: '30px', borderRadius:'7px'}}>
        <InputLabel  id="type-input">Type</InputLabel>
        <Select
          labelId="type-input"
          id="type-input"
          value={type}
          label="Type"
          onChange={handleTypeChange}
        >
          <MenuItem value={''}>All</MenuItem>
          <MenuItem value={'movie'}>Movie</MenuItem>
          <MenuItem value={'series'}>Series</MenuItem>
          <MenuItem value={'episode'}>Episode</MenuItem>
        </Select>
      </FormControl>
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
