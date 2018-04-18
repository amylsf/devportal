import React from "react";


const JobsList = (props) => (
  <div className="jobs-container">
  {props.jobs.map((job, i) => {
    return (
      <div key={i} className="job">
        <div><a href={job.url}>{job.title}</a></div>
        <div>{job.company}</div>
      </div>
    )
  })}
  </div>
)


export default JobsList;