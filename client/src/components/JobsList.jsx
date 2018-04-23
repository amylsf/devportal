import React from "react";
import ReactHtmlParser from "react-html-parser";
import Job from './Job.jsx';


class JobsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showApply: this.props.jobs.map((item) => false)
    }
    this.toggleShowApply = this.toggleShowApply.bind(this);
  }

  toggleShowApply(i) {
    let newShowApply = [...this.state.showApply];
    newShowApply[i] = !this.state.showApply[i];
    this.setState({
      showApply: newShowApply
    })
  }

  render() {
    return(
      <div className="jobs-list">
      {this.props.jobs.map((job, i) => {
        return (
          <Job 
            key={i}
            toggleShowApply={this.toggleShowApply}
            job={job}
            index={i}
            showApply={this.state.showApply}
            nowShowing={this.state.showApply[i]}
            handleClick={this.props.handleClick}
          />
        )
      })}
      </div>
    )
  }
}


export default JobsList;