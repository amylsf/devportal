import React from 'react';
import axios from 'axios';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
    this.search = this.search.bind(this);
  }


  search() {
    axios.get('/news')
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }


  render() {
    return(
      <div></div>
    )
  }
}




export default News;