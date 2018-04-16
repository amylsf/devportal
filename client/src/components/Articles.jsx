import React from "react";

const Articles = (props) => (
  <div>
    {console.log(props.articles)}
    {props.articles.map((item, i) => {
      return(
      <div key={i}>
        <div><a href={item.url}>{item.title}</a></div>
        <div>{item.author}</div>
        <div>{item.source.name}</div>
        <div src={item.urlToImage}></div>
        <div>{item.description}</div>
      </div>
      )
    })}
  </div>
)


export default Articles;