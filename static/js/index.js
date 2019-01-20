import React from 'react'
import ReactDOM from 'react-dom'


function Welcome(props) {
  return (
    <div>
      <h3>Congrats! You have successfully finished your signup flow.</h3>
      <p>TODO: show other users' tweets here.</p>
    </div>
  );
}

const element = <Welcome name="world" />;
ReactDOM.render(
  element,
  document.getElementById('react')
);