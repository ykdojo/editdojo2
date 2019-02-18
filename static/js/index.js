import React from 'react'
import ReactDOM from 'react-dom'
import Post from './post'
import Cookies from 'js-cookie'

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null, // all the posts that should currently be shown
      error: null, // the error message that will be shown on the UI
    };
  }

  componentDidMount() {
    // Set up the csrftoken here.
    // More info about it here: https://docs.djangoproject.com/en/2.1/ref/csrf/#setting-the-token-on-the-ajax-request
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

    // Get the main feed from /ajax/getSerializedFeed/.
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
    // If the posts haven't been loaded yet, show a spinning icon.
    if (this.state.posts === null) {
      return (
        // TODO: Change this to a spinning icon
        <div>
          <div>loading posts...</div>
          <div>{this.state.error}</div>
        </div>
      );
    }

    const contactInfo = <span>Please tweet at us <a href="https://twitter.com/EditDojo" target="_blank">@EditDojo</a> to let us know that you got this message so we can look into what's going on.</span>;
    // If the retrieved posts is not an array, then show an error.
    if (!this.state.posts instanceof Array) {
      return  (
        <div className="row">
            <div className="card col-lg-6 col-md-6 ml-auto mr-auto"
                 style={{padding: '20px 30px'}}>
              <div>
                An unexpected error has occurred! {contactInfo}
              </div>
            </div>
        </div>
      )
    }
    
    // If the retrieved posts is an empty array, then show an error.
    if (this.state.posts.length == 0) {
      return (
        <div className="row">
          <div className="card col-lg-6 col-md-6 ml-auto mr-auto"
               style={{padding: '20px 30px'}}>
            <div>
              No posts have been retrieved for some reason. {contactInfo}
            </div>
          </div>
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
