import { useState } from "react";
import Dropdown from "./components/Dropdown";
import Display from "./components/Display";
import Compare from "./components/Compare";
import { Container, Grid,Button, Box, } from "@material-ui/core";
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
  boxMar:{
    marginTop:theme.spacing(10),
  },
}))


function App() {

  const classes = useStyles();

  const [stockSelected, setStockSelected] = useState(false);
  const [stock, setStock] = useState("");

  const dropDownSelect = (e) => {
    setStockSelected(true);
    setStock(e.target.value);
  };


  return (
    <Router>
    <Route path="/" exact render={(props)=>(
      <>
      <Container maxWidth="md">
        <Grid container justify="center">

        {stockSelected? "" : <Dropdown dropDownSelect={dropDownSelect} />}
         
        </Grid>
        {stockSelected && stock !== "" && <Display stock={stock} />}
      </Container>
    </>
    )
      
    }>
    </Route>

    <Route path="/compare" render={(props)=>(
      <>
      <Container maxWidth="md">
        <Box className={classes.boxMar}>
        <Button href="/">Back</Button>

        {stock ? <Compare stock1={stock} /> : <Redirect to="/"/>}
        
        </Box>
      </Container>
      </>
    )}>
    </Route>
    </Router>
  );
}

export default App;
