import React from 'react';
import axios from 'axios';
import MeetupsList from './MeetupsList.jsx';

class Meetups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      favorites: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.search();
    this.getFavorites();
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

  handleClick(meetup) {
    this.props.showFavorites ? this.delete(meetup) : this.save(meetup)
  }

  render() {
    return(
      <div className="meetups-container">
        <div className="header">Local Meetups</div>
        <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
        <button onClick={() => {this.props.search(this.state.query)}}>Search Meetups</button>
        <button onClick={this.props.toggleFavorites}>{this.props.showFavorites ? "Upcoming Meetups" : "Saved Meetups"}</button>
        <MeetupsList handleClick={this.handleClick} meetups={this.props.showFavorites ? this.state.favorites : this.props.meetups} showFavorites={this.props.showFavorites}/>
      </div>
    )
  }
}


export default Meetups;