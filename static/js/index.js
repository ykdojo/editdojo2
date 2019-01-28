import React from 'react'
import ReactDOM from 'react-dom'
import Cookies from 'js-cookie'


class Post extends React.Component {
  render() {
    const post = this.props.data;
    return (
        <div className="section" style={{padding: '26px 0'}}>
          <div className='card-body'>
            <div>@{post.posted_by.username}</div>
            <div>{post.text_content}</div>
          </div>
        </div>
    );
  }
}

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
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
      // TODO: Handle an error here.
    })
  };

  render() {
    if (!this.state.posts) {
      return (
        // TODO: Change this to a spinning icon
        <div>loading posts...</div>
      );
    }

    console.log(this.state.posts[0].text_content);
    return (
      <div style={{whiteSpace: 'pre-line'}}>
        {this.state.posts.map((post, index) => (
          <div class="row" style={{margin:'0 8px'}}>
            <div class="card col-lg-6 col-md-6 ml-auto mr-auto">        
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
  window.react_mount,
);