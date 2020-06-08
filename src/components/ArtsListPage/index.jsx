import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import CustomPaginationActionsTable from '../ArtsTable/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export function ArtsListPage({history}) {
  const classes=useStyles();

  const category = useParams();

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.artsHeader}>Arts Page</h1>
      <CustomPaginationActionsTable category={category.category || ""}/>
    </div>
  );
}