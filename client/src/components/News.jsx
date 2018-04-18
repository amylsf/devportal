import React from 'react';
import axios from 'axios';
import Articles from './Articles.jsx'

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      favorites: [],
      query: null,
      showFavorites: false
    }
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }

  componentDidMount() {
    this.search();
    this.getFavorites();
  }

  search() {
    axios.post('/news', {
      term: this.state.query || 'Uber'
    })
    .then(({data}) => {
      this.setState({
        articles: data.articles
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
    axios.post('/save', {article: item})
    .then(({data}) => {
      console.log('Item saved successfully.')
    })
    .catch((err) => {
      console.log(err);
    })
    this.getFavorites();
  }

  getFavorites() {
    axios.get('/favorites')
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
    axios.post('/delete', {article: item})
    .then(({data}) => {
      console.log('Deleted');
    })
    .catch((err) => {
      console.log(err);
    })
    this.getFavorites();
  }

  swapFavorites() {
    this.setState({
      showFavorites: !this.state.showFavorites
    })
  }

  // handleClick(article) {
  //   this.state.showFavorites ? 
  // }

  render() {
    return(
      <div className="articles-container">
      <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
      <button onClick={this.search}>Search News</button>
      <button onClick={this.swapFavorites}>{this.state.showFavorites ? "Search Results" : "Show Favorites"}</button>
      <Articles save={this.save} articles={this.state.showFavorites ? this.state.favorites : this.state.articles}/>
      </div>
    )
  }
}




export default News;