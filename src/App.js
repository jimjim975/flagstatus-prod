import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import FlagEvents from './features/FlagEvents';
import Status from './features/Status';

const App = () => {
  return (
    <Box className="App" my={5} mx={5}>
      <FlagEvents />
      <Status />
    </Box>
  )};

export default App;
