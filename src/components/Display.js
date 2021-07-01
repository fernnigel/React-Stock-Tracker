import React from "react";
import { Box, Paper, Typography, Button,CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 550,
    marginTop: theme.spacing(10),
  },
  pad: {
    paddingTop: 10,
    paddingLeft: 25,
  },
  mar: {
    marginTop: 10,
    marginLeft: 25,
  },
  btnMar: {
    marginLeft: 10,
  },
  underline:{
    textDecoration:"none"
  },
  top:{
    marginTop:"20%"
  }
}));

function Display({ stock }) {
  const classes = useStyles();

  const API_KEY = "00UIR2I85RJBRPFO";
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState({});
  const [latest_rate,set_latest_rate] = useState("");

  let options = {};

  var stockXValue = [],
    stockYValue = [],
    dataPlot = [];

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {

        // console.log(result)
        for (var key in result["Time Series (Daily)"]) {
          stockXValue.push(key);
        }

        for (key in result["Time Series (Daily)"]) {
          stockYValue.push(
            Number(result["Time Series (Daily)"][key]["1. open"])
          );
        }

        for (var elem in stockXValue) {
          var temp = new Date(stockXValue[elem]);
          var seconds = temp.getTime();

          dataPlot.push([seconds, stockYValue[elem]]);
        }

        dataPlot.reverse();

        options = {
          rangeSelector: {
            selected: 1,
          },
          title: {
            text: stock,
          },
          series: [
            {
              name: stock,
              data: dataPlot,
              tooltip: {
                valueDecimals: 2,
              },
            },
          ],
        };

        setConfig(options);
        set_latest_rate(dataPlot[dataPlot.length -1][1])
        setVisible(true);
        // console.log(options, dataPlot);
      });
  }, []);

  return (
    <>
      <Paper className={classes.paper}>
      <a href="/" className={classes.underline}>
      <Button color="primary" className={classes.mar}>Back</Button>
      </a>
        <Box display="flex" alignItems="center" className={classes.pad}>
        
          <Typography varirant="subtitle1">NASDAQ: {stock}</Typography>
          <Link to='/compare' className={classes.underline}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.btnMar}
          >
            Compare
          </Button>
          </Link>
          
        </Box>

        {visible ? (
          <>
            <Box display="flex" alignItems="center" className={classes.mar}>
              <Typography variant="h6">${latest_rate}</Typography>
            </Box>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"stockChart"}
              options={config}
            />
          </>
        ) 
        : 
        <Box display="flex" justifyContent="center">
        <CircularProgress className={classes.top} color="secondary" />
        </Box>
        }
      </Paper>
    </>
  );
}

export default Display;
