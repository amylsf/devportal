import React from "react";
import ReactHtmlParser from "react-html-parser";


class JobsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showApply: false
    }
    this.toggleShowApply = this.toggleShowApply.bind(this);
  }

  toggleShowApply() {
    this.setState({
      showApply: !this.state.showApply
    })
  }

  render() {
    return(
      <div className="jobs-list">
      {this.props.jobs.map((job, i) => {
        return (
          <div key={i} className="job">
            <div className="job-title"><a href={job.url}>{job.title}</a></div>
            <a href={job.company_url}>{job.company_logo ? <img className="job-img" src={job.company_logo}></img> : <div className="job-company">{job.company}</div>}</a>
            <br/>
            {this.state.showApply ? <div>{ReactHtmlParser(job.how_to_apply)}</div> : null}
            <button onClick={this.toggleShowApply}>{this.state.showApply ? "Back" : "How to Apply"}</button>
            <button onClick={() => {this.props.handleClick(job)}}>{this.props.showFavorites ? "Unsave Job" : "Save Job"}</button>
          </div>
        )
      })}
      </div>
    )
  }
}


export default JobsList;