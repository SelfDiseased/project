import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import useStyles from "./styles";
import { Art } from '../Art/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


export function ArtPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const classes=useStyles();

  let { id } = useParams();

  useEffect(() => {
    const url = `http://localhost:${3001}/api/arts/${id}`; //change port if needed
    axios.get(url)
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [id])

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div><CircularProgress /></div>;
  } else {
    return (
      <div className={classes.wrapper}>
        <h1 className={classes.artsHeader}>Arts Page</h1>
        <Art name={items.name} category={items.category} description={items.description} createdAt={items.createdAt} price={items.price} imageUrl={items.imageUrl} />
      </div>
    );
  }
}