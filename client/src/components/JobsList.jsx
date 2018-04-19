import React from "react";


const JobsList = (props) => (
  <div className="jobs-list">
  {props.jobs.map((job, i) => {
    return (
      <div key={i} className="job">
        <div className="job-title"><a href={job.url}>{job.title}</a></div>
        <div className="job-company">{job.company}</div>
      </div>
    )
  })}
  </div>
)


export default JobsList;