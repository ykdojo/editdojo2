import React from 'react'
import ReactDOM from 'react-dom'
import Cookies from 'js-cookie'


class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: window.props,
      ajaxResult: '',
    };
  }

  componentDidMount() {
    function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                let csrftoken = Cookies.get('csrftoken');
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    // Leave the following for now just to show an example of
    // how to use AJAX with Django and React.
    $.ajax({
      method: "POST",
      url: '/ajax/example/',
      data: {},
      dataType: 'json',
      success: (result) => {
        this.setState({ajaxResult: result.message});
      }
    })
  };

  render() {
    return (
      <div>
        <h3>{this.state.message}</h3>
        <p>TODO: show other users' tweets here.</p>
        <p>AJAX result: {this.state.ajaxResult}</p>
      </div>
    );
  }
}

const element = <Welcome name="world" />;
ReactDOM.render(
  element,
  window.react_mount,
);