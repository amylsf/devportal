import React from 'react';
import axios from 'axios';
import MeetupList from './MeetupList.jsx';

class Meetups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      meetups: []
    }
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  search() {
    axios.post('/meetups', {
      query: this.state.query || 'Javascript'
    })
    .then(({data}) => {
      console.log(data);
      this.setState({
        meetups: data.events
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
    return(
      <div className="meetups-container">
        <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
        <button onClick={this.search}>Search Meetups</button>
        {this.state.meetups.length === 0 ? null : <MeetupList meetups={this.state.meetups}/>}
      </div>
    )
  }
}


export default Meetups;