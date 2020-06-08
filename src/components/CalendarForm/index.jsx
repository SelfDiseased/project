import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import useStyles from "./styles";
import axios from 'axios';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const CodeSchema = Yup.object().shape({
  code: Yup.string()
    .required('Required'),
});

export const CalendarForm = ({history}) => {
  const classes=useStyles();
  const [open, setOpen] = React.useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.wrapper}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Check out your email and come back here with code
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={EmailSchema}
        onSubmit={email => {
          email = email.email.toString();
          sessionStorage.setItem("email", email);
          const url = `http://localhost:${3001}/api/email?email=${email}`; //change port if needed
          axios.get(url);
          handleClick();
        }}
      >
        {() => (
          <Form className={classes.form}>
            <Field component={TextField} className={classes.inputField} label="email" name="email" type="email" />
            <Button type="submit" variant="contained" color="primary" className={classes.submitBtn}>
              Send me calendar code!
            </Button>
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={{
          code: '',
        }}
        validationSchema={CodeSchema}
        onSubmit={code => {
          history.push(`/calendar/${code.code}`);
        }}
      >
        {() => (
          <Form className={classes.form}>
            <Field component={TextField} className={classes.inputField} label="code from your email" name="code" />
            <Button type="submit" variant="contained" color="primary" className={classes.submitBtn}>
              Go to calendar!
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

