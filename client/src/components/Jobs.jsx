import React from 'react';
import axios from 'axios';
import JobsList from './JobsList.jsx';

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      jobs: []
    }
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  search() {
    axios.post('/jobs', {
      query: this.state.query || 'javascript'
    })
    .then(({data}) => {
      console.log('this is', data);
      this.setState({
        jobs: data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  render() {
    return (
      <div className="jobs-container">
        <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
        <button onClick={this.search}>Find Jobs</button>
        <JobsList jobs={this.state.jobs}/>
      </div>
    )
  }
}

export default Jobs;