import React from "react";
import ReactHtmlParser from "react-html-parser";

const Job = (props) => (
  <div className="job">
    <div className="job-title"><a href={props.job.url}>{props.job.title}</a></div>
    <a href={props.job.company_url}>{props.job.company_logo ? <img className="job-img" src={props.job.company_logo}></img> : <div className="job-company">{props.job.company}</div>}</a>
    <br/>
    {props.nowShowing ? <div>{ReactHtmlParser(props.job.how_to_apply)}</div> : null}
    <button onClick={() => {props.toggleShowApply(props.index)}}>{props.nowShowing ? "Back" : "How to Apply"}</button>
    <button onClick={() => {props.handleClick(props.job)}}>{props.showFavorites ? "Unsave Job" : "Save Job"}</button>
  </div>
)

export default Job;