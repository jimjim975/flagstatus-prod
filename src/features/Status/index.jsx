import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Status() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await axios({method: 'get', url: 'https://api.flagstatus.org/server/status', withCredentials: false});
        setData(response.data.status);
      } catch (error) {
        return console.error(error.message);
      }
    }
    fetchStatus();
  }, []);

  return (
    <Typography sx={{ color: '#5C5C5C', my: 3 }}>{data['Amount']} events added since {data['Time']} on {data['date']}</Typography>
  );
}

export default Status;
