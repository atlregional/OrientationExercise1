import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, Table } from 'semantic-ui-react';
import { csv } from 'd3';
import csvData from './data/APIs.csv';
import './App.css';

const App = () => {

  const [ apiOptions, setAPIOptions ] = useState();
  const [ selectedAPI, setSelectedAPI ] = useState();
  const [ features, setFeatures ] = useState();
  const [ fields, setFields ] = useState();
  const [ filterParams, setFilterParams ] = useState();
  const [ sortParams, setSortParams] = useState();

  // Parse info from ./data/APIs.csv to setAPIOptions for rendering API dropdown
  const getAPIOptions = () => {};
  
  // Make API request based on selectedAPI and then setFeatures and setFields
  const getData = () => {};

  // Filter function should return true or false
  const filterData = (feature, filterParams) => {};
  
  // Sort function should return -1, 1, or 0 
  const sortData = (a, b, sortParams) => {};

  useEffect(getAPIOptions, []);

  return (
    <div className='App'>
      <div className='selectors-container'>
        <h1>Selectors</h1>
        {
          // Render Dropdowns and Input components here
        }
      </div>
      <div className='table-container'>
        {
          // Render Table here
        }
      </div>
    </div>
  );
}

export default App;
