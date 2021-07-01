import React, { useState } from 'react'
import {Table,TableContainer,TableHead,TableRow,TableBody,TableCell,Paper,FormControl,InputLabel,Select,MenuItem,CircularProgress,Typography} from '@material-ui/core'

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        marginTop:10,
      },
    },
  };

const Compare = ({stock1}) => {

  const menu = [
    {
      "value":"AAPL",
      "name":"Apple"
    },
    {
      "value":"MSFT",
      "name":"Microsoft"
    },
    {
      "value":"AMZN",
      "name":"Amazon"
    },
    {
      "value":"FB",
      "name":"Facebook"
    },
    {
      "value":"GOOGL",
      "name":"Google"
    },
    {
      "value":"TSLA",
      "name":"Tesla"
    },
    {
      "value":"NVDA",
      "name":"Nvidia"
    },
    {
      "value":"PYPL",
      "name":"PayPal"
    },
    {
      "value":"ASML",
      "name":"ASML Holdings"
    },
    {
      "value":"INTC",
      "name":"Intel"
    },
    {
      "value":"CMCSA",
      "name":"Comcast"
    },
    {
      "value":"NFLX",
      "name":"Netflix"
    },
    {
      "value":"ADBE",
      "name":"Adobe"
    },
    {
      "value":"CSCO",
      "name":"Cisco Systems"
    },
    {
      "value":"PEP",
      "name":"PepsiCo"
    },
    {
      "value":"AVGO",
      "name":"Broadcom"
    },
    {
      "value":"TXN",
      "name":"Texas Instruments"
    },
    {
      "value":"PDD",
      "name":"Pinduoduo"
    },
    {
      "value":"TMUS",
      "name":"T-Mobile US"
    },
  ]

      let filtered = []

      filtered = menu.filter((stock)=>{
          return stock.value !== stock1
      })

      function createData(Name, val1, val2) {
        return { Name, val1,val2 };
      }
      

      const [stock2,setStock2] = useState("")
      const [stock2Bool,setStock2Bool] = useState(false)

      const [fetchStatus,setFetchStatus] = useState(false)
      const [fetchData,setFetchData] = useState([])

      const [latest_time,setLatest_time] =useState("")

      var rows = []

      const API_KEY = '00UIR2I85RJBRPFO'

    function select_stock2(e){
        setStock2(e.target.value)

        const stock_2 = e.target.value
        
        Promise.all([
          fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock1}&apikey=${API_KEY}`).then(value=>value.json()),
          fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock_2}&apikey=${API_KEY}`).then(value=>value.json())
        ]).then(response => {

          const response0 = response[0]["Time Series (Daily)"];
          const response1 = response[1]["Time Series (Daily)"];

          const time0 = Object.keys(response0)[0];
          const time1 = Object.keys(response1)[0];

          setLatest_time(time0)

          const open0 = response0[time0]["1. open"]
          const high0 = response0[time0]["2. high"]
          const low0 = response0[time0]["3. low"]

          const open1 = response1[time1]["1. open"]
          const high1 = response1[time1]["2. high"]
          const low1 = response1[time1]["3. low"]

          rows = [
            createData('Open',open0,open1),
            createData('High',high0,high1),
            createData('Low',low0,low1)
          ]

          setFetchData(rows)
          setFetchStatus(true)
          
        })
        setStock2Bool(true)        
    }

    return (
        <>
        {stock2Bool ?
        <>
        <Typography variant="subtitle1" color="primary" style={{textAlign:"center"}}>Daily adjusted data as of : {latest_time}</Typography>
            <TableContainer component={Paper} style={{marginTop:10}}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell>{stock1}</TableCell>
                  <TableCell>{stock2}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              
              {fetchStatus ?
                <>
                  {fetchData.map((row)=>(
                    <TableRow key={row.Name}> 
                    <TableCell>{row.Name}</TableCell>
                    <TableCell>$ {row.val1}</TableCell>
                    <TableCell>$ {row.val2}</TableCell>
                    </TableRow>
                  ))}
                  </>
                :
                <TableRow>
                  <TableCell>Fetching data...</TableCell>
                  <TableCell><CircularProgress/></TableCell>
                  <TableCell><CircularProgress/></TableCell>
                </TableRow> 
              }
              
              </TableBody>
             </Table> 
            </TableContainer>
            </>
            :
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">{stock1}</TableCell>
              <TableCell align="right">
                <FormControl style={{width:"200px"}}>
                    <InputLabel id="stock">Stock</InputLabel>
                    <Select
                        labelId="stock"
                        id="stock-select"
                        MenuProps={MenuProps}
                        onChange={select_stock2}
                        defaultValue = ""
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        
                        {filtered.map((row)=>(<MenuItem key={row.name} value={row.value}>{row.name}</MenuItem>))}

                    </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
         </Table> 
        </TableContainer>}
            </>
    )
}

export default Compare
