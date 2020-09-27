import React from "react";
import * as actions from "../GameStore/Actions/FunctionalActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const FunctionalComponent = () => {
  return (
    <div className="component">
      <h2>Functional Component</h2>
      <Grid container spacing={1} justify="center">
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

export default FunctionalComponent;