import React from 'react';
import axios from 'axios';
import JobsList from './JobsList.jsx';

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    })
  }
  
  render() {
    return (
      <div>
        <div className="jobs-header">
            <div className="header">Open Jobs</div>
            <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
            <button onClick={() => {this.props.search(this.state.query)}}>Find Jobs</button>
        </div>
        <div className="jobs-container">
          <JobsList jobs={this.props.jobs}/>
        </div>
      </div>
    )
  }
}

export default Jobs;