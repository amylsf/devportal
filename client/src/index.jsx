import React from "react";
import ReactDOM from "react-dom";
import Jobs from "./components/Jobs.jsx";
import News from "./components/News.jsx";
import Meetups from "./components/Meetups.jsx";
import Axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Jobs/>
        <br/>
        <News/>
        <Meetups />
        <div className="clear"></div>
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));