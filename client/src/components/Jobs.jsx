import React from 'react';
import axios from 'axios';
import JobsList from './JobsList.jsx';

const Jobs = (props) => (
  <div>
    <div className="jobs-header">
      <div className="header">Open Jobs</div>
        <input type="text" name="query" value={props.query} onChange={props.handleQueryChange}></input>
        <button onClick={props.search}>Find Jobs</button>
      </div>
    <div className="jobs-container">
      <JobsList jobs={props.jobs}/>
    </div>
  </div>
)

export default Jobs;