import { useState } from "react";
import axios from 'axios';

function Month() {
  
  const [text, setText] = useState();
  const [searchResult, setSearchResult] = useState();
  
  async function getAPI(domain) {
    try {
      
      const response = await axios({
        method: 'get',
        url: domain,
        withCredentials: false,
      });
      console.log(response);
      setSearchResult(response);

    } catch (error) {
      return setSearchResult(null);
    }
  }

  const handleSubmitMonth = async () => {
    let newText = String(text);
    var length = newText.split('-').length;
    let domain = "";
    var allowed = false;
    if (length === 1) {
      if (newText === "today") {
        domain = "https://temps-api01.rgarrison.net/today";
        allowed = true;
        getAPI(domain);
      } else if (newText.includes("2023") || newText.includes("2024")) {
        domain = "https://temps-api01.rgarrison.net/year/" + text;
        allowed = true;
        getAPI(domain);
      }
    } else if (length === 2) {
      if (newText.split("-")[1].includes("2023") || newText.split("-")[1].includes("2024")) {
        domain = "https://temps-api01.rgarrison.net/month/month=" + text + "&descending=True";
        getAPI(domain);
      };
    } else if (length === 3) {
      allowed = true;
      if (newText.split("-")[2].includes("2023") || newText.split("-")[2].includes("2024")) {
        domain = "https://temps-api01.rgarrison.net/day/" + text;
        getAPI(domain);
      };
    } else {
        return 0;
    }
  };

  return (
    <div>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <label for="string"><h2>Enter 'today' for current temps. <br /> Enter a month, day, and Year (MM-DD-YYYY - If searching for year only put YYYY, month only MM-YYYYY) </h2>: </label>
        <input
          id="string"
          placeholder="Enter date (MM-DD-YYYY)..."
          type="string"
          onChange={(event) => { setText(event.target.value); handleSubmitMonth();}}
        ></input>
        <button class="fa fa-search" type="submit" onClick={handleSubmitMonth}>
          Submit
        </button>
        <h2>Results for date: {text}</h2>
        <h1>Average: {searchResult && searchResult['data']['Month Average Temp']}</h1>
        <ol>
        {searchResult && searchResult.data.Month.map((searchResult, index) => {
        return <li key={index}><span class="tab"></span>Date: {searchResult[0]}, Time: {searchResult[1]},Temperature: {searchResult[2]}</li>})}
        </ol>
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <iframe title="Report Section" width="1024" height="1060" src="https://app.powerbi.com/view?r=eyJrIjoiMGRiYTU3NjAtYWFmMy00OTNiLThhYTctOWExM2UwNzNiNzYwIiwidCI6IjMxM2JmNmRlLTllMzctNDE4YS05YmFkLTkyZWI3ZmZmMGVjMSIsImMiOjF9" frameborder="0" allowFullScreen="true"></iframe>
      <Month></Month>
    </div>
  );
}
export default App;
