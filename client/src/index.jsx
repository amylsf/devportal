import React from "react";
import ReactDOM from "react-dom";
import Jobs from "./components/Jobs.jsx";
import News from "./components/News.jsx";
import Meetups from "./components/Meetups.jsx";
import axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '10012',
      query: null,
      jobs: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  search() {
    axios.post('/jobs', {
      query: this.state.query || 'javascript',
      location: this.state.location
    })
    .then(({data}) => {
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
      location: event.target.value
    })
  }

  handleQueryChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <div className="location">
        Enter your zipcode:
        <input type="text" name="location" value={this.state.location} onChange={this.handleChange}></input>
        <button onClick={this.search}>Set location</button>
        </div>
        <Jobs search={this.search} jobs={this.state.jobs} query={this.state.query} location={this.state.location} handleQueryChange={this.handleQueryChange}/>
        <hr/>
        <br/>
        <News/>
        <div className="vertical-line"></div>
        <Meetups location={this.state.location}/>
        <div className="clear"></div>
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));