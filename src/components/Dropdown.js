import React from 'react'
import {FormControl,InputLabel,Select,MenuItem,Grid,Typography/*TextField*/} from '@material-ui/core'
// import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles' 
import bg from '../images/pixeltrue-data-analyse-1.png'

const phone = '@media (max-width:500px)'

const useStyles = makeStyles((theme)=>({
  length:{
    width:"75%",
    maxHeight:300,
    [phone]:{
      position:"absolute",
      left:"15%",
      top:"50%"
      }
  },
  bg:{
    maxWidth:500,
    [phone]:{
      position:"absolute",
      top:"10%",
      left:"10%",
      maxWidth:350,
    }
  },
  GridStyle:{
    marginTop:theme.spacing(16),
  },
  head:{
    marginTop:theme.spacing(6),
    [phone]:{
      position:"absolute",
      left:"15%",
      top:"35%"
      }
  },
  left:{
    [phone]:{
      position:"absolute",
      left:"15%",
      top:"45%"
      }
  },
  small:{
    fontSize:"12px",
    [phone]:{
      fontSize:"10px",
    }
  },
  footer:{
    [phone]:{
      position:"absolute",
      top:"70%",
      }
  }
}))


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      marginTop:10,
    },
  },
};



const Dropdown = ({dropDownSelect,}) => {

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

  const classes = useStyles();

    return (
        <>
        <Grid container spacing={5} className={classes.GridStyle} justify='center'>
        <Grid item xs={12} sm={6}>
          <img className={classes.bg} src={bg} alt="background"/>
        </Grid>
          <Grid item xs = {12} sm={6}>
          <Typography variant='h4' color="primary" className={classes.head}>Stocks Tracker.</Typography>
          <Typography variant="subtitle1" className={classes.left}>Get Information On Stocks Now! </Typography>
          <FormControl className={classes.length}>
          <InputLabel id="stock">Stock</InputLabel>
          <Select
            labelId="stock"
            id="stock-select"
            MenuProps={MenuProps}
            onChange={dropDownSelect}
            defaultValue = ""
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {menu.map((item)=>(<MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>))}
          </Select>
        </FormControl>
        </Grid>
        
      </Grid>
      <footer className={classes.footer}>

      <p className={classes.small}>Developed by <a href="https://fernnigel.github.io/website">Nigel Fernandes</a> as an assignment for <a href="https://www.cea3.com/">Clean Energy Associates</a></p>
      <p className={classes.small} style={{textAlign:"center"}}>Illustration by <a href="https://icons8.com/illustrations/author/5ec7b0e101d0360016f3d1b3">Pixeltrue</a> from <a href="https://icons8.com/illustrations">Ouch!</a></p>

      </footer>

      {/* <Autocomplete
      id="combo-box-demo"
      options={[{
        title:"Google", value:"GOOGL"
      },{
        title:"Microsoft",value:"MSTF"
      },{
        title:"Amazon",value:"AMZN"
      }]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Stocks" variant="outlined" className={classes.length}/>}
      onChange={(e)=>{
        dropDownSelect(e.target.innerHTML)}}

      /> */}

      </>
    )
}

export default Dropdown
