import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, lightGreen } from '@mui/material/colors';



export default function Calculator() {
  const ac_theme = createTheme({
    palette: {
      primary: red
    },
  })

  const evaluate_button_theme = createTheme({
    palette: {
      primary: lightGreen
    },
  })
  
  const[expression,setExpression]=useState('');
  const[exprResult,setExprResult]=useState('');
  const appendExpression=(str) => {
    setExpression(expression + str)
  }

  const AC_ACTION = 'AC'

  const handleClick=(value) => {
    if(Number.isInteger(value) || value === '.') {
      appendExpression(value)
    }
    else if(value === AC_ACTION) {
      setExpression('')
      setExprResult('')
    }
    else {
      if(expression.length === 0 || expression.charAt(expression.length - 1) === ' ') {
        appendExpression(value + ' ')
      }
      else {
        appendExpression(' ' + value + ' ')
      }
    }
  }

  const handleSubmit=(e) => {
    e.preventDefault()
    const expr={expression}
    console.log(expr)
    fetch("http://localhost:8080/evaluate", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(expr)
    })
    .then((response) => {
      if(response.status === 200){
        console.log("SUCCESS")
        return response.json();     
      }else if(response.status >= 400){
        console.log("SOMETHING WENT WRONG")
        this.setState({ requestFailed: true })
    }})
    .then((data) => {
      const status = data.status
      const result = JSON.parse(data.value)
      if(status === "ok") {
        setExprResult(result)
      }
      else {
        setExprResult(status)
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '40ch' },
      }}
      justifyContent="center"
    >

      <form noValidate autoComplete="off">
        <TextField id="expressionField" variant="outlined" value={expression}/>
      </form>

      <Box>
        <Button id="leftBracketButton" variant="outlined" onClick={() => handleClick('(')}>(</Button>
        <Button id="rightBracketButton" variant="outlined" onClick={() => handleClick(')')}>)</Button>
        <Button id="digit7Button" variant="outlined" onClick={() => handleClick('^')}>^</Button>
        <ThemeProvider theme={ac_theme}>
          <Button id="pointButton" variant="contained" onClick={() => handleClick(AC_ACTION)}>AC</Button>
        </ThemeProvider>
      </Box>
      
      <Box>
        <Button id="digit7Button" variant="contained" onClick={() => handleClick(7)}>7</Button>
        <Button id="digit8Button" variant="contained" onClick={() => handleClick(8)}>8</Button>
        <Button id="digit9Button" variant="contained" onClick={() => handleClick(9)}>9</Button>
        <Button id="pointButton" variant="outlined" onClick={() => handleClick('/')}>/</Button>
      </Box>

      <Box>
        <Button id="digit4Button" variant="contained" onClick={() => handleClick(4)}>4</Button>
        <Button id="digit5Button" variant="contained" onClick={() => handleClick(5)}>5</Button>
        <Button id="digit6Button" variant="contained" onClick={() => handleClick(6)}>6</Button>
        <Button id="pointButton" variant="outlined" onClick={() => handleClick('*')}>*</Button>
      </Box>

      <Box>
        <Button id="digit1Button" variant="contained" onClick={() => handleClick(1)}>1</Button>
        <Button id="digit2Button" variant="contained" onClick={() => handleClick(2)}>2</Button>
        <Button id="digit3Button" variant="contained" onClick={() => handleClick(3)}>3</Button>
        <Button id="pointButton" variant="outlined" onClick={() => handleClick('-')}>-</Button>
      </Box>

      <Box>
        <Button id="digit0Button" variant="contained" onClick={() => handleClick(0)}>0</Button>
        <Button id="pointButton" variant="outlined" onClick={() => handleClick('.')}>.</Button>
        <ThemeProvider theme={evaluate_button_theme}>
          <Button id="evaluateButton" variant="contained" onClick={handleSubmit}>=</Button>
        </ThemeProvider>
        <Button id="pointButton" variant="outlined" onClick={() => handleClick('+')}>+</Button>
      </Box>

      <Box>
        <TextField id="resultField" variant="outlined" label="Result" value={exprResult} />
      </Box>
    </Box>
  );
}