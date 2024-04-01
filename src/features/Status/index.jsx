import axios from 'axios';

const DOMAIN = "https://api.flagstatus.org/status";

function Status() {
  const getFlagStatusAsync = async (url) => {
    try {
      const response = await axios({method: 'get', url: url, withCredentials: false});
      console.log(response.data)
      return response.data;
    } catch (error) {
      return console.error(error.message);
    }
  }
}

export default Status;
