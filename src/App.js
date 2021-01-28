// import logo from './logo.svg';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Dropdown, Table } from 'semantic-ui-react';
import { csv } from 'd3';
import csvData from './data/APIs.csv';
import './App.css';



const App = () => {

  const [ apiOptions, setAPIOptions ] = useState();
  const [ selectedAPI, setSelectedAPI ] = useState();
  const [ features, setFeatures ] = useState();
  const [ fields, setFields ] = useState();
  const [ filterOptions, setFilterOptions ] = useState();
  const [ filterBy, setFilterBy ] = useState();
  const [ selectedValues, setSelectedValues ] = useState([]);
  

  // Parse info from ./data/APIs.csv to setAPIOptions to be passed to API dropdown
  const handleAPIOptions = () => {
    const rowArray = csvData;
    console.log(rowArray);
    csv(csvData)
      .then(res => {
        const options =// console.log(res)
        res.map(item => (
          {
            key: item.Name,
            value: item,
            text: item.Name
          }
        ))
        console.log(options)
        setAPIOptions(options.length > 0 ? options : null);    
      })
      .catch(err => console.log(err));
  };

  // Make API request based selectedAPI and then setFeatures (i.e. records) and setFields
  const handleData = () => 
    selectedAPI
    ? axios.get(selectedAPI.URL)
      .then(res => {
        setFilterBy();
        setSelectedValues([]);
        setFeatures(res.data.features);
        setFields(res.data.fields);

      })
      .catch(err => console.log(err))
    : null;

  const handleFilterOptions = () => {
    const optionValues = features && filterBy 
      ? features.map(feature => feature.attributes[filterBy])
      : [];

    const optionsSet = [...new Set(optionValues)];

    console.log(optionsSet)

    setFilterOptions(optionsSet.length > 0 ? optionsSet : null);
  }

  const renderBodyRow = (data, i) => ({
    key: `row-${i}-${Object.values(data)[0]}-${selectedAPI ? selectedAPI.Name.split(' ').join('-') : 'all'}`,
    cells: fields.map(field => data[field.name])
  });

  useEffect(handleAPIOptions, []);
  useEffect(handleData, [selectedAPI]);
  useEffect(handleFilterOptions, [filterBy, features]);

  console.log(selectedValues);

  return (
    <div className='App'>
      <div className='selectors'>
        <div className='selector'>
          { 
            // API Dropdown
            apiOptions
            ? <div>
                <div>
                  Select API
                </div>
                <Dropdown
                  selection
                  // fluid
                  options={apiOptions}
                  onChange={(e, data) => {
                    setFeatures();
                    setFields();
                    setFilterBy();
                    setSelectedAPI(data.value);
                  }}
                />
              </div>
            : null
          }
        </div>
        <div className='selector'>
          { 
            // Filter By Dropdown
            fields
            ? <div>
                <div>
                  Filter By
                </div>
                <Dropdown
                  selection
                  // fluid
                  options={fields.map(field => ({
                    text: field.alias,
                    value: field.name,
                    key: field.name
                  }))}
                  onChange={(e, data) => {
                    setSelectedValues([]);
                    setFilterBy(data.value);
                  }}
                />
              </div>
            : null
          }
        </div>
        <div className='selector'>
          { 
            // API Dropdown
            filterOptions
            ? <div>
                <div>
                  Filter Values
                </div>
                <Dropdown
                  fluid
                  multiple
                  selection
                  search
                  value={selectedValues}
                  // fluid
                  options={filterOptions.map(option => ({
                    text: option,
                    value: option,
                    key: option
                  }))}
                  onChange={(e, data) => setSelectedValues(data.value)}
                />
              </div>
            : null
          }
        </div>
      </div>
      <div className='results-container'>
        {
          features &&
          fields
          ? <Table
              key={`table-${selectedAPI ? selectedAPI.Name.split(' ').join('-') : 'all'}`}
              celled 
              tableData={features
                .filter(feature => 
                filterBy && 
                selectedValues
                  ? selectedValues.includes(feature.attributes[filterBy]) ||
                    selectedValues.length === 0
                  : true
                )
                .map(feature => feature.attributes)
              }
              renderBodyRow={renderBodyRow}
              headerRow={fields.map(field => field.alias)} 
            />
          : null
        }
        {/* {
          features
          ? features
            .filter(feature => 
              filterBy && selectedValues
              ? selectedValues.includes(feature.attributes[filterBy]) 
              : true
            )
            .map(feature =>
              <div className='results-card'>
                {
                  <h3>
                    {feature.attributes[selectedAPI['Label Field']]}
                  </h3>
                }
                {
                  fields
                  ? fields
                    .filter(field => field.alias.search('MOE') === -1)
                    .map(field =>
                    <div>
                      {field.alias}: {feature.attributes[field.name]} 
                    </div>
                  )
                  : null
                }

                {
                  // Map over fields and populate card with feature info
                  // Use a filter to exclude MOE fields
                  // Use alias as field label
                }
              </div>  
            )
          : null
        } */}
      </div>
    </div>
  );
}

export default App;
