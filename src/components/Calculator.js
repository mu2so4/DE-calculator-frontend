import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Calculator() {
  const[expression,setExpression]=useState('');
  const[exprResult,setExprResult]=useState('');

  const handleSubmit=(e) => {
    e.preventDefault()
    const expr={expression}
    console.log(expr)
    fetch("http://localhost:8080/evaluate", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(expr)
    })
    .then((response) => {
      if(response.status === 200){
        console.log("SUCCESS")
        return response.json();     
      }else if(response.status === 408){
        console.log("SOMETHING WENT WRONG")
        this.setState({ requestFailed: true })
    }})
    .then((data) => {
      setExprResult(JSON.parse(JSON.parse(data.result)))
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
  <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <form noValidate autoComplete="off">
      <TextField id="expressionField" label="Expression" variant="outlined" value={expression}
          onChange={(e) => setExpression(e.target.value)}/>
      <Button id="evaluateButton" variant="contained" onClick={handleSubmit}>=</Button>
    </form>

    <TextField id="resultField" variant="outlined" value={exprResult}/>
  </Box>
  );
}