import React from 'react';
import axios from 'axios';
import JobsList from './JobsList.jsx';

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      favorites: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.delete = this.delete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleClick(job) {
    this.props.showFavorites ? this.delete(job) : this.save(job)
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  save(item) {
    axios.post('/saveJob', {job: item})
    .then(({data}) => {
      console.log('Job saved successfully.')
      this.getFavorites();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getFavorites() {
    axios.get('/favoriteJobs')
    .then(({data}) => {
      this.setState({
        favorites: data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  delete(item) {
    axios.post('/deleteJob', {job: item})
    .then(({data}) => {
      console.log('Deleted job');
      this.getFavorites();
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  render() {
    return (
      <div>
        <div className="jobs-header">
            <div className="header">Open Jobs</div>
            <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
            <button onClick={() => {this.props.search(this.state.query)}}>Find Jobs</button>
            <button onClick={this.props.toggleFavorites}>{this.props.showFavorites ? "Open Jobs" : "Saved Jobs"}</button>
        </div>
        <div className="jobs-container">
          <JobsList handleClick={this.handleClick} jobs={this.props.showFavorites ? this.state.favorites : this.props.jobs} showFavorites={this.props.showFavorites}/>
        </div>
      </div>
    )
  }
}

export default Jobs;