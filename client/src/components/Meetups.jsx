import React from 'react';
import axios from 'axios';
import MeetupsList from './MeetupsList.jsx';

class Meetups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      meetups: [],
      favorites: [],
      showFavorites: false
    }
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.search();
    this.getFavorites();
  }

  search() {
    axios.post('/meetups', {
      query: this.state.query || 'Javascript',
      location: this.props.location
    })
    .then(({data}) => {
      data.events.map((item) => {
        item.groupname = item.group.name;
      })
      this.setState({
        meetups: data.events,
        showFavorites: false
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

  save(item) {
    axios.post('/saveMeetup', {meetup: item})
    .then(({data}) => {
      console.log('Meetup saved successfully.')
      this.getFavorites();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getFavorites() {
    axios.get('/favoriteMeetups')
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
    axios.post('/deleteMeetup', {meetup: item})
    .then(({data}) => {
      console.log('Deleted');
      this.getFavorites();
    })
    .catch((err) => {
      console.log(err);
    })
  }


  toggleFavorites() {
    this.setState({
      showFavorites: !this.state.showFavorites
    })
  }

  handleClick(meetup) {
    this.state.showFavorites ? this.delete(meetup) : this.save(meetup)
  }

  render() {
    return(
      <div className="meetups-container">
        <div className="header">Local Meetups</div>
        <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
        <button onClick={this.search}>Search Meetups</button>
        <button onClick={this.toggleFavorites}>{this.state.showFavorites ? "Upcoming Meetups" : "Saved Meetups"}</button>
        <MeetupsList handleClick={this.handleClick} meetups={this.state.showFavorites ? this.state.favorites : this.state.meetups} showFavorites={this.state.showFavorites}/>
      </div>
    )
  }
}


export default Meetups;