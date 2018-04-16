import React from "react";
import ReactDOM from "react-dom";
import News from "./components/News.jsx";


class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <News />
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));