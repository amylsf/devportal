import React from "react";
import moment from "moment";

const NewsList = (props) => (
  <div className="news-list">
    {props.articles.map((item, i) => {
      return(
      <div key={i} className="news">
        <div className="news-title"><a href={item.url}>{item.title}</a></div>
        <div className="news-source" onClick={() => {props.getSource(item.source)}}>{item.source}</div>
        <div className="news-date">{moment(item.publishedat).fromNow()}</div>
        <a href={item.url}><img src={item.urltoimage} className="news-img"></img></a>
        <div className="news-description">{item.description}</div>
        <button onClick={() => {props.handleClick(item)}}>{props.showFavorites ? "Delete Article" : "Save Article"}</button>
        <hr/>
      </div>
      )
    })}
  </div>
)


export default NewsList;