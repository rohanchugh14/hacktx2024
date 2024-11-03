import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
function App() {
// make a request with axios, get request
  useEffect(() => {
    const fetchData = async () => {
      const res = (await axios.get('https://api.usaspending.gov/api/v2/references/toptier_agencies/?sort=percentage_of_total_budget_authority&order=desc')).data.results
      console.log(res)
      const awardInfo = (await axios.get(`https://api.usaspending.gov/api/v2/agency/${res[0].toptier_code}/budgetary_resources/`)).data
      console.log(awardInfo)
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      Hi there
    </div>
  );
}

export default App;
