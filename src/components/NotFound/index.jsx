import React from "react";
import useStyles from "./styles";

export function NotFound({message}) {
  const classes=useStyles();

  return (
    <div className={classes.wrapper}>
        <h1 className={classes.header}>404 NOT FOUND</h1>
        <h3 className={classes.errMessage}>{message}</h3>
    </div>
  );
}

