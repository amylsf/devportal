import React from 'react';
import axios from 'axios';
import NewsList from './NewsList.jsx'

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      favorites: [],
      query: '',
      showFavorites: false
    }
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.toggleFavorites = this.toggleFavorites.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getSource = this.getSource.bind(this);
  }

  componentDidMount() {
    this.search();
    this.getFavorites();
  }

  search(source) {
    axios.post('/news', {
      term: this.state.query,
      source: source || 'recode,hacker-news,the-verge,techcrunch'
    })
    .then(({data}) => {
      data.articles.map((item) => {
        item.source = item.source.name;
        item.urltoimage = item.urlToImage;
        item.publishedat = item.publishedAt;
      })
      this.setState({
        articles: data.articles,
        showFavorites: false
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getSource(source) {
    let newSource = ''
    if (source === 'TechCrunch') {
      newSource = 'techcrunch'
    } else if (source === 'The Verge') {
      newSource = 'the-verge'
    } else if (source === 'Hacker News') {
      newSource = 'hacker-news'
    } else if (source === 'Recode') {
      newSource = 'recode' 
    }
    this.search(newSource);
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  save(item) {
    axios.post('/saveNews', {article: item})
    .then(({data}) => {
      console.log('Item saved successfully.')
      this.getFavorites();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getFavorites() {
    axios.get('/favoriteNews')
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
    axios.post('/deleteNews', {article: item})
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

  handleClick(article) {
    this.state.showFavorites ? this.delete(article) : this.save(article)
  }

  render() {
    return(
      <div className="news-container">
        <div className="header">Tech News</div>
        <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
        <button onClick={() => {this.search('')}}>Search News</button>
        <button onClick={this.toggleFavorites}>{this.state.showFavorites ? "Search Results" : "Saved articles"}</button>
        <NewsList getSource={this.getSource} showFavorites={this.state.showFavorites} handleClick={this.handleClick} articles={this.state.showFavorites ? this.state.favorites : this.state.articles}/>
      </div>
    )
  }
}




export default News;