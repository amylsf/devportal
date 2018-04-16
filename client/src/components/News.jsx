import React from 'react';
import axios from 'axios';
import Articles from './Articles.jsx'

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      favorites: [],
      query: 'Uber'
    }
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   this.search();
  // }

  search() {
    axios.post('/news', {
      term: this.state.query
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

  render() {
    return(
      <div>
      <input type="text" name="query" value={this.state.query} onChange={this.handleChange}></input>
      <button onClick={this.search}>Search News</button>
      <Articles articles={this.state.articles}/>
      </div>
    )
  }
}




export default News;