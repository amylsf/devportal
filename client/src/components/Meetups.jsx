import React from 'react';
import axios from 'axios';

class Meetups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search() {
    axios.post('/meetups', {
      query: this.state.query
    })
    .then(({data}) => {
      console.log(data);
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
      <div>
        <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
        <button onClick={this.search}>Search Meetups</button>
      </div>
    )
  }
}


export default Meetups;