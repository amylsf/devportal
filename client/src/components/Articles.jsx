import React from "react";
import moment from "moment";

const Articles = (props) => (
  <div>
    {props.articles.map((item, i) => {
      return(
      <div key={i}>
        <div><a href={item.url}>{item.title}</a></div>
        <div>{item.author}</div>
        <div>{item.source.name}</div>
        <img src={item.urlToImage}></img>
        <div>{item.description}</div>
        <div>{moment(item.publishedAt).fromNow()}</div>
        <button onClick={() => {props.handleClick(item)}}>{props.showFavorites ? "Delete Article" : "Save Article"}</button>
        <br/>
        <br/>
      </div>
      )
    })}
  </div>
)


export default Articles;