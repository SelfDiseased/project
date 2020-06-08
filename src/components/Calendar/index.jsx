import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import useStyles from "./styles";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import  DateFnsUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const disabledDays = [
  "2020:6:10",
  "2020:6:11",
  "2020:6:12"
];

let chosenDate = {year: 0, month: 0, day: 0, hour: 0};

export function Calendar() {
  const classes=useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-06-09T21:11:54'));
  const [chosenDay, setChosenDay] = React.useState(false);
  const [chosenHour, setChosenHour] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  
  useEffect(() => {
    if (chosenDate.hour !== 0)
    {
      const clientMail = sessionStorage.getItem("email");
      const myEmail = 'sashkovandal@gmail.com';
      const url = `http://localhost:${3001}/api/emailAboutNewClient?email=${myEmail}&client=${clientMail}&year=${chosenDate.year}&month=${chosenDate.month}&day=${chosenDate.day}&hour=${chosenDate.hour}`; //change port if needed
      axios.get(url)
      
    }
  }, [chosenHour])


  const handleClick = () => {
    setOpen(true);
  };

  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function handleDay(date) {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    chosenDate.year = year;
    chosenDate.month = month;
    chosenDate.day = day;
    setChosenDay(true);
  }

  function handleHour(date) {
    const hour = new Date(date).getHours();
    if (hour > 17 || hour < 9)
    {
      handleClick();
    }
    else
    {
      chosenDate.hour = hour;
      setChosenHour(true);
      handleClickSuccess();
    }
  }

  function disableDays(date) {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return date.day() === 0 || date.day() === 6 || (disabledDays.includes(`${year}:${month}:${day}`));
  }


  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          You've entered an unsuitable time! Please, choose from 9 to 17!
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          You've been added to calendar, we'll write on your email.
        </Alert>
      </Snackbar>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around"  className={classes.calendar}>
        <KeyboardDatePicker
          margin="normal"
          disablePast={true}
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          shouldDisableDate={disableDays}
          onAccept={(date) => {handleDay(date)}}
        />
        <KeyboardTimePicker
          disabled={chosenDay ? false : true}
          ampm={false}
          margin="normal"
          id="time-picker"
          label="Time picker"
          openTo="hours"
          views={["hours"]}
          format="hh a"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          maxDate={new Date("6pm")}
          onAccept={(date) => {handleHour(date)}}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    </div>
  );
}