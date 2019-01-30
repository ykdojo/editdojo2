import React from 'react'
import ReactDOM from 'react-dom'
import Cookies from 'js-cookie'

function formatDate(dateString) {
  const givenDate = new Date(dateString);
  const timeSince = new Date(Date.now() - givenDate);

  const days = timeSince.getDay();
  if (days > 0) {
    const toAppend = days == 1 ? ' day ago' : ' days ago'
    return days + toAppend;
  }

  const hours = timeSince.getHour();
  if (hours > 0) {
    const toAppend = hours == 1 ? ' hours ago' : ' hours ago'
    return hours + toAppend;
  }

  const minutes = timeSince.getMinute();
  if (minutes > 0) {
    const toAppend = minutes == 1 ? ' minutes ago' : ' minutes ago'
    return minutes + toAppend;
  }

  return 'just posted';
}

class Post extends React.Component {
  render() {
    const post = this.props.data;
    const date = formatDate(post.date_posted);
    const profileLink = "https://twitter.com/intent/user?user_id=" + post.associated_social_account.uid;
    return (
        <div className="section" style={{padding: '5px 0', fontSize: '14px'}}>
          <div className='card-body' style={{padding: '15px 10px'}}>
            <div style={{fontSize: '15px', marginBottom: '10px', lineHeight: '20px'}}>
              <a href={profileLink} target="_blank">@{post.posted_by.username}</a> - {date}
            </div>
            <div style={{lineHeight: '21px'}}>{post.text_content}</div>
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
          <div>{this.state.error}</div>
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
  window.react_mount,
);