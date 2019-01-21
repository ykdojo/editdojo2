import React from 'react'
import ReactDOM from 'react-dom'


function Welcome(props) {
  let message = window.props;
  return (
    <div>
      <h3>{message}</h3>
      <p>TODO: show other users' tweets here.</p>
    </div>
  );
}

const element = <Welcome name="world" />;
ReactDOM.render(
  element,
  window.react_mount,
);