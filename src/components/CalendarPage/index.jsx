import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import useStyles from "./styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { NotFound } from '../NotFound/index';
import { Calendar } from '../Calendar/index';


export default function CalendarPage() {
  const classes=useStyles();
  const [couldSeeCalendar, setCouldSeeCalendar] = useState(false);

  const { code } = useParams();

  useEffect(() => {
      const url = `http://localhost:${3001}/api/couldSeeCalendar?code=${code}`; //change port if needed
      axios.get(url)
      .then(res => {
        setCouldSeeCalendar(res.data);
      })
      .catch(err => console.log(err));
  }, [])




  return (
    <div className={classes.wrapper}>
      {couldSeeCalendar ? <Calendar /> : <NotFound message={"Seems like you've entered wrong code"} />}
    </div>
  );
}