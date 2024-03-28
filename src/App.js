import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@mui/material';

const columns = [
  {
    field: 'Origin Flag',
    headerName: 'Origin Flag',
    flex: .02,
  },
  {
    field: 'Start Date',
    headerName: 'Start Date',
    flex: .08,
  },
  {
    field: 'End Date',
    headerName: 'End Date',
    flex: .08,
  },
  {
    field: 'Description',
    headerName: 'Description',
    renderCell: (params) => {
      return <Typography paragraph>{params.value}</Typography>
    },
    flex: .1,
  },
  {
    renderCell: (params) => {
      return <IconButton onClick={async () => {
        await navigator.clipboard.writeText(params.row.Description);
      }}><ContentCopyIcon /></IconButton>  
    },
    width: 50
  }
];

const formatRows = (rows) => {
  return rows.map((row,idx) => ({...row,id: idx}))
}

const DOMAIN = "https://api.flagstatus.org/status";
const regions = [{name: "United States", abbreviation:"US"},{name:"Alabama",abbreviation:"AL"},{name:"Alaska",abbreviation:"AK"},{name:"Arizona",abbreviation:"AZ"},{name:"Arkansas",abbreviation:"AR"},{name:"California",abbreviation:"CA"},{name:"Colorado",abbreviation:"CO"},{name:"Connecticut",abbreviation:"CT"},{name:"Delaware",abbreviation:"DE"},{name:"Florida",abbreviation:"FL"},{name:"Georgia",abbreviation:"GA"},{name:"Hawaii",abbreviation:"HI"},{name:"Idaho",abbreviation:"ID"},{name:"Illinois",abbreviation:"IL"},{name:"Indiana",abbreviation:"IN"},{name:"Iowa",abbreviation:"IA"},{name:"Kansas",abbreviation:"KS"},{name:"Kentucky",abbreviation:"KY"},{name:"Louisiana",abbreviation:"LA"},{name:"Maine",abbreviation:"ME"},{name:"Maryland",abbreviation:"MD"},{name:"Massachusetts",abbreviation:"MA"},{name:"Michigan",abbreviation:"MI"},{name:"Minnesota",abbreviation:"MN"},{name:"Mississippi",abbreviation:"MS"},{name:"Missouri",abbreviation:"MO"},{name:"Montana",abbreviation:"MT"},{name:"Nebraska",abbreviation:"NE"},{name:"Nevada",abbreviation:"NV"},{name:"New Hampshire",abbreviation:"NH"},{name:"New Jersey",abbreviation:"NJ"},{name:"New Mexico",abbreviation:"NM"},{name:"New York",abbreviation:"NY"},{name:"North Carolina",abbreviation:"NC"},{name:"North Dakota",abbreviation:"ND"},{name:"Ohio",abbreviation:"OH"},{name:"Oklahoma",abbreviation:"OK"},{name:"Oregon",abbreviation:"OR"},{name:"Pennsylvania",abbreviation:"PA"},{name:"Rhode Island",abbreviation:"RI"},{name:"South Carolina",abbreviation:"SC"},{name:"South Dakota",abbreviation:"SD"},{name:"Tennessee",abbreviation:"TN"},{name:"Texas",abbreviation:"TX"},{name:"Utah",abbreviation:"UT"},{name:"Vermont",abbreviation:"VT"},{name:"Virginia",abbreviation:"VA"},{name:"Washington",abbreviation:"WA"},{name:"West Virginia",abbreviation:"WV"},{name:"Wisconsin",abbreviation:"WI"},{name:"Wyoming",abbreviation:"WY"}]

// function Idk(){
//   const [searchResult, setSearchResult] = useState();
//   async function getAPI(domain) {
//     try {
//       console.log("Trying to connect to: " + domain);
//       const response = await axios({
//         method: 'get',
//         url: domain,
//         withCredentials: false,
//       });
//       console.log(response);
//       setSearchResult(response.data);
  
//     } catch (error) {
//       setSearchResult(null);
//     }
//   }

  
//   getAPI(domain);
//   return (
//     <div>{searchResult && searchResult.Status.map((searchResult, index) => {
//       return <li key={index}><span class="tab"></span>Date: {searchResult[0]}, Time: {searchResult[1]},Temperature: {searchResult[2]}</li>})}</div>
//   )
// }

const getFlagStatusAsync = async (url) => {
  try {
    console.log('bar')
    const response = await axios({method: 'get', url: url, withCredentials: false});
    console.log(response.data)
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
}

const App = () => {
  const [selector, setSelector] = useState("");
  const [rows, setRows] = useState([]);
  const [searchResult, setSearchResult] = useState({});
  
  // useEffect(() => {
  //   //console.log(data);
  //   if (selector !== ""){
  //     fetch(`https://api.flagstatus.org/region/${selector}`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((json) => {
  //       console.log(json);
  //       setRows(formatRows(json[selector]));
  //     });
  //   }
  // }, [selector]);

  useEffect(() => {
    const getFlagStatusAsync = async (url) => {
        const response = await axios({method: 'get', url: url, withCredentials: false});
        setSearchResult(response.data.status)
        return response.data.status;
    }
    const response = getFlagStatusAsync(DOMAIN);
    console.log(response)
  }, [])

  const handleChange = (event) => {
    setSelector(event.target.value);
  };

  return (
    <div className="App">
      <div id="status-header">
        <span>Date Last Updated: {searchResult.date}</span>
        <br/>
        <span>Time: {searchResult.Time}</span>
        <br/>
        <span>Amount: {searchResult.Amount}</span>
      </div>
       {/* <div>{searchResult && searchResult.map((searchResult, index) => {
     return <li key={index}><span class="tab"></span>Date: {searchResult[0]}, Time: {searchResult[1]},Temperature: {searchResult[2]}</li>})}
     </div> */}

      <Box sx={{ margin: 5}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Region</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selector}
            label="Age"
            onChange={handleChange}
          >
            {regions.map((region) => {
              return <MenuItem value={region.abbreviation} key={region.abbreviation}>{region.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <Box sx={{ my: 1, height: 400, width: '100%' }}>
          <DataGrid
            getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
            rows={rows}
            columns={columns}
            autoHeight
          />
        </Box>
      </Box>
    </div>
  )};
export default App;
