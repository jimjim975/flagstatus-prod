import Box from '@mui/material/Box';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FlagCard from '../../components/FlagCard';
import getFlagEventsByRegion from '../../services/getFlagEventsByRegion'
import { Divider, FormControlLabel, FormGroup, Switch } from '@mui/material';
import regions from './regions'

const formatRows = (rows) => {
  return rows.map((row, idx) => ({ ...row, id: idx }))
}

function FlagEvents() {
  const [selector, setSelector] = useState("");
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const handleChange = async (e) => {
    setSelector(e.target.value);
    try {
      const json = await getFlagEventsByRegion(e.target.value);
      setData(json);
      if (isActive) {
        setRows(formatRows(filterData(json)));
      } else {
        setRows(formatRows(json));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const filterData = (data) => {
    return data.filter((i) => {
      const today = new Date();
      if (today >= new Date(i['Start Date']) && today <= new Date(i['End Date'])) {
        return i;
      }
      return false;
    });
  }

  const handleToggle = (e) => {
    setIsActive(e.target.checked);
    if (e.target.checked) {
      setRows(formatRows(filterData(data)));
    } else {
      setRows(formatRows(data));
    }
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
      <FormControl fullWidth sx={{ marginBottom: 1 }}>
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
            },
            elevation: 12
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
      <FormControl sx={{ marginBottom: 3 }}>
        <FormGroup>
          <FormControlLabel sx={{ color: '#B6B6B6' }} label="Active Today" control={
            <Switch checked={isActive} onChange={handleToggle} />
          } />
        </FormGroup>
      </FormControl>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {rows.length > 0
          && rows.map((row, i) => {
            return (
              <Box width="100%" key={JSON.stringify(row)}>
                <FlagCard key={JSON.stringify(row)} description={row['Description']} state={row['Origin Flag']} startDate={row['Start Date']} endDate={row['End Date']} />
                {(i < rows.length - 1) && <Divider sx={{ my: 3, backgroundColor: '#B6B6B6' }} />}
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
}

export default FlagEvents;
