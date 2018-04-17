import React from "react";
import ReactDOM from "react-dom";
import News from "./components/News.jsx";
import Meetups from "./components/Meetups.jsx";
import Axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <News/>
        <Meetups />
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));