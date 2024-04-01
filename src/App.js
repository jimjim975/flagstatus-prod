import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import FlagEvents from './features/FlagEvents';

const App = () => {
  const [searchResult, setSearchResult] = useState({});

  return (
    <Box className="App" my={5} mx={5}>
      <FlagEvents />
    </Box>
  )};

export default App;
