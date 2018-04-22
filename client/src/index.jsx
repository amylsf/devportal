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
      jobs: [],
      meetups: [],
      showFavoriteMeetups: false,
      showFavoriteJobs: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchJobs = this.searchJobs.bind(this);
    this.searchMeetups = this.searchMeetups.bind(this);
    this.toggleFavoriteMeetups = this.toggleFavoriteMeetups.bind(this);
    this.toggleFavoriteJobs = this.toggleFavoriteJobs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.searchJobs();
  }

  searchJobs(query) {
    axios.post('/jobs', {
      query: query || 'javascript',
      location: this.state.location
    })
    .then(({data}) => {
      this.setState({
        jobs: data,
        showFavoriteJobs: false
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //handle location change
  handleChange(event) {
    this.setState({
      location: event.target.value
    })
  }

  searchMeetups(query) {
    axios.post('/meetups', {
      query: query || 'Javascript',
      location: this.state.location
    })
    .then(({data}) => {
      data.events.map((item) => {
        item.groupname = item.group.name;
        item.groupurl = item.group.urlname;
      })
      this.setState({
        meetups: data.events,
        showFavoriteMeetups: false
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  toggleFavoriteMeetups() {
    this.setState({
      showFavoriteMeetups: !this.state.showFavoriteMeetups
    })
  }

  toggleFavoriteJobs() {
    this.setState({
      showFavoriteJobs: !this.state.showFavoriteJobs
    })
  }

  handleClick() {
    this.searchJobs();
    this.searchMeetups();
  }

  render() {
    return (
      <div className="container">
        <div className="location">
        Enter your zipcode:
        <input className="location-input" type="text" ref="form" name="location" value={this.state.location} onChange={this.handleChange}></input>
        <button onClick={this.handleClick}>Set location</button>
        </div>
        <div className="clear"></div>
        <Jobs search={this.searchJobs} jobs={this.state.jobs} toggleFavorites={this.toggleFavoriteJobs} showFavorites={this.state.showFavoriteJobs}/>
        <hr/>
        <br/>
        <News/>
        <div className="vertical-line"></div>
        <Meetups toggleFavorites={this.toggleFavoriteMeetups} search={this.searchMeetups} showFavorites={this.state.showFavoriteMeetups} meetups={this.state.meetups}/>
        <div className="clear"></div>
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));