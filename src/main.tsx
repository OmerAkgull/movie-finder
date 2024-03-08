import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './routes/Homepage/Homepage';
import Movie from './routes/Movie/Movie';
import "./globalStyles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
    // children: [
    //   {
    //     path: "page/:pageNumber",
    //     element: <Homepage/>
    //   }
    // ]
  },
  {
    path: "movie/:movieId",
    element: <Movie/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
