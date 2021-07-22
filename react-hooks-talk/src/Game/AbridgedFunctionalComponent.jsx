import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../GameStore/Actions/FunctionalActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";


const AbridgedFunctionalComponent = () => {
  
  return (
    <div className="component">
      <h2>Functional Component</h2>
      <Grid container spacing={1} justifyContent="center">
        <Grid
          container
          item
          xs={6}
          spacing={1}
          direction="column"
          alignItems="center"
        >
        </Grid>
      </Grid>
    </div>
  );
};

export default AbridgedFunctionalComponent;