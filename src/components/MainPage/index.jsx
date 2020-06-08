import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Carousel } from '../Carousel/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

export function MainPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const classes=useStyles();

  useEffect(() => {
    const url = `http://localhost:${3001}/api/arts`; //change port if needed
    axios.get(url)
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.arts);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div><CircularProgress /></div>;
  } else {
    return (
      <div >
        <div className={classes.wrapper}>
          <h1>Main Page</h1>
          <Carousel />
          <p>This site contains arts of young painter Anastasia Zell</p>
        </div>
      </div>
    );
  }
}