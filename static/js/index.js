import React from 'react'
import ReactDOM from 'react-dom'
import Post from './post'
import Cookies from 'js-cookie'

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      error: null,
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

    $.ajax({
      method: "GET",
      url: '/ajax/getSerializedFeed/',
      dataType: 'json',
      success: (result) => {
        this.setState({posts: result});
      },
      error: (error) => {
        this.setState({error: error});
      },
    })
  };

  render() {
    if (this.state.posts === null) {
      return (
        // TODO: Change this to a spinning icon
        <div>
          <div>loading posts...</div>
          <div>{this.state.error}</div>
        </div>
      );
    }

    // TODO: In the following section, extract the common text
    // into a constant.
    if (!this.state.posts instanceof Array) {
      return  (
        <div>
          An unexpected error has occurred! Please tweet at us
          @EditDojo to let us know that you got this message
          so we can look into what's going on.
        </div>
      )
    }

    if (this.state.posts.length == 0) {
      return (
        <div>
          No posts have been retrieved for some reason. Please tweet
          at us @EditDojo to let us know that you got this message
          so we can look into what's going on.
        </div>
      )
    }

    return (
      <div style={{whiteSpace: 'pre-line'}}>
        {this.state.posts.map((post, index) => (
          <div key={index} className="row" style={{margin:'0 8px'}}>
            <div className="card col-lg-6 col-md-6 ml-auto mr-auto"
                  style={{marginTop: '10px', marginBottom: '10px'}}>
              <Post key={index} data={post} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const element = <Feed/>;
ReactDOM.render(
  element,
  document.getElementById('react'),
);
