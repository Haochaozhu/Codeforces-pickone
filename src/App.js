import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

const axios = require("axios");
const rand = require("random-number");
const baseUrl = "https://codeforces.com/problemset/problem";

function App() {
  const [picked, setPicked] = useState();
  const [fetching, setFetching] = useState(false);

  const handleFetchProblems = () => {
    setFetching(true);
    axios
      .get("https://codeforces.com/api/problemset.problems")
      .then((res) => {
        console.log(res);
        setFetching(false);
        filterProblems(res);
      })
      .catch((err) => {
        setFetching(false);
        console.log(err);
      });
  };

  const filterProblems = (res) => {
    const problems = res.data.result.problems;
    const options = {
      min: 0,
      max: problems.length - 1,
      integer: true,
    };
    const pickedIndex = rand(options);
    const pickedProblem = problems[pickedIndex];
    console.log(pickedProblem);
    const pickedProblemUrl = `${baseUrl}/${pickedProblem.contestId}/${pickedProblem.index}`;
    setPicked({
      name: pickedProblem.name,
      url: pickedProblemUrl,
      index: pickedProblem.index,
      contestId: pickedProblem.contestId,
    });
  };

  return (
    <div className="App" style={{ height: "600px" }}>
      <h1>Codeforces</h1>
      <h2 style={{ color: "#475f98" }}>Pick one</h2>
      <Container
        style={{
          height: "100%",
        }}
      >
        <Grid container direction="column" spacing={2} justify="center">
          <Grid item>Difficulty Rating</Grid>
          <Grid item>
            <TextField label="From" />
          </Grid>
          <Grid item>
            <TextField label="To" />
          </Grid>
          <Grid item>
            <Button
              startIcon={<SearchIcon></SearchIcon>}
              size="large"
              variant="contained"
              color="primary"
              onClick={() => handleFetchProblems()}
            >
              Pick
            </Button>
          </Grid>
        </Grid>
        <CircularProgress
          style={{
            visibility: fetching ? "visible" : "hidden",
            margin: "20px",
          }}
        ></CircularProgress>
        {picked && (
          <Typography
            variant="h5"
            align="center"
            children={
              <a
                style={{ color: "black" }}
                href={picked.url}
              >{`${picked.contestId}${picked.index}. ${picked.name}`}</a>
            }
          ></Typography>
        )}
      </Container>
    </div>
  );
}

export default App;
