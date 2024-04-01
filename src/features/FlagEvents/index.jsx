import Box from '@mui/material/Box';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FlagCard from '../../components/FlagCard';
import getFlagStatus from '../../services/getFlagStatus'

const regions = [{name: "United States", abbreviation:"US"},{name:"Alabama",abbreviation:"AL"},{name:"Alaska",abbreviation:"AK"},{name:"Arizona",abbreviation:"AZ"},{name:"Arkansas",abbreviation:"AR"},{name:"California",abbreviation:"CA"},{name:"Colorado",abbreviation:"CO"},{name:"Connecticut",abbreviation:"CT"},{name:"Delaware",abbreviation:"DE"},{name:"Florida",abbreviation:"FL"},{name:"Georgia",abbreviation:"GA"},{name:"Hawaii",abbreviation:"HI"},{name:"Idaho",abbreviation:"ID"},{name:"Illinois",abbreviation:"IL"},{name:"Indiana",abbreviation:"IN"},{name:"Iowa",abbreviation:"IA"},{name:"Kansas",abbreviation:"KS"},{name:"Kentucky",abbreviation:"KY"},{name:"Louisiana",abbreviation:"LA"},{name:"Maine",abbreviation:"ME"},{name:"Maryland",abbreviation:"MD"},{name:"Massachusetts",abbreviation:"MA"},{name:"Michigan",abbreviation:"MI"},{name:"Minnesota",abbreviation:"MN"},{name:"Mississippi",abbreviation:"MS"},{name:"Missouri",abbreviation:"MO"},{name:"Montana",abbreviation:"MT"},{name:"Nebraska",abbreviation:"NE"},{name:"Nevada",abbreviation:"NV"},{name:"New Hampshire",abbreviation:"NH"},{name:"New Jersey",abbreviation:"NJ"},{name:"New Mexico",abbreviation:"NM"},{name:"New York",abbreviation:"NY"},{name:"North Carolina",abbreviation:"NC"},{name:"North Dakota",abbreviation:"ND"},{name:"Ohio",abbreviation:"OH"},{name:"Oklahoma",abbreviation:"OK"},{name:"Oregon",abbreviation:"OR"},{name:"Pennsylvania",abbreviation:"PA"},{name:"Rhode Island",abbreviation:"RI"},{name:"South Carolina",abbreviation:"SC"},{name:"South Dakota",abbreviation:"SD"},{name:"Tennessee",abbreviation:"TN"},{name:"Texas",abbreviation:"TX"},{name:"Utah",abbreviation:"UT"},{name:"Vermont",abbreviation:"VT"},{name:"Virginia",abbreviation:"VA"},{name:"Washington",abbreviation:"WA"},{name:"West Virginia",abbreviation:"WV"},{name:"Wisconsin",abbreviation:"WI"},{name:"Wyoming",abbreviation:"WY"}]

const formatRows = (rows) => {
    return rows.map((row,idx) => ({ ...row, id: idx }))
  }

function FlagEvents() {
    const [selector, setSelector] = useState("");
    const [rows, setRows] = useState([]);

    const handleChange = async (e) => {
        setSelector(e.target.value);
        try {
          const json = await getFlagStatus(e.target.value);
          setRows(formatRows(json[e.target.value]));
        } catch (err) {
          console.log(err.message);
        }
      };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel
          sx={{
            color: '#B6B6B6',
            '&.Mui-focused': {
              color: '#378CE7'
              },
          }}
          id="demo-simple-select-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selector}
          sx={{
            color: "#B6B6B6",
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#B6B6B6',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#378CE7',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#378CE7',
            },
            '.MuiSvgIcon-root ': {
              fill: '#B6B6B6',
            }
          }}
          label="Region"
          onChange={handleChange}
          inputProps={{
            MenuProps: {
                MenuListProps: {
                    sx: {
                        backgroundColor: '#282828'
                    }
                }
            }
        }}
        >
          {regions.map((region) => {
              return <MenuItem sx={{ color: '#B6B6B6' }} value={region.abbreviation} key={region.abbreviation}>{region.name}</MenuItem>
          })}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {rows.length > 0
        && rows.map((row) => <FlagCard description={row['Description']} state={row['Origin Flag']} startDate={row['Start Date']} endDate={row['End Date']} />)
        }
      </Box>
    </Box>
  )
}

export default FlagEvents;
