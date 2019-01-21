import React from 'react'
import ReactDOM from 'react-dom'
import Cookies from 'js-cookie'


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: window.props,
    };
  }

  render() {
    return (
      <div>
        <h3>{this.state.message}</h3>
        <p>TODO: show other users' tweets here.</p>
      </div>
    );
  }
}

const element = <Feed/>;
ReactDOM.render(
  element,
  window.react_mount,
);