import React from "react";
import useStyles from "./styles";

export function Header({text}) {
  const classes=useStyles();

  return (
      <h1>{text}</h1>
  );
}

