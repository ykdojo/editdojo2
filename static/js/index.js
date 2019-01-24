import React from 'react'
import ReactDOM from 'react-dom'
import Cookies from 'js-cookie'


class Post extends React.Component {
  render() {
    const post = this.props.data;
    return (
      <div>
        <div>@{post.posted_by.username}</div>
        <div>{post.text_content}</div>
        <hr></hr>
      </div>
    );
  }
}

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
      // TODO: Handle an error here.
    })
  };

  render() {
    if (this.state.posts === null) {
      return (
        // TODO: Change this to a spinning icon
        <div>
          <div>loading posts...</div>
          <div>this.state.error</div>
        </div>
      );
    }

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
          <Post key={index} data={post} />
        ))}
      </div>
    );
  }
}

const element = <Feed/>;
ReactDOM.render(
  element,
  window.react_mount,
);