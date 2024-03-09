import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Calculator() {
    return (
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="expression" label="Expression" variant="outlined"/>
      <Button id="evaluateButton" variant="contained">=</Button>
    </Box>
    );
}