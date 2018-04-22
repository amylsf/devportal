import React from "react";


const JobsList = (props) => (
  <div className="jobs-list">
  {props.jobs.map((job, i) => {
    return (
      <div key={i} className="job">
        <div className="job-title"><a href={job.url}>{job.title}</a></div>
        <a href={job.company_url}>{job.company_logo ? <img className="job-img" src={job.company_logo}></img> : <div className="job-company">{job.company}</div>}</a>
        <br/>
        <button onClick={() => {props.handleClick(job)}}>{props.showFavorites ? "Unsave Job" : "Save Job"}</button>
      </div>
    )
  })}
  </div>
)


export default JobsList;