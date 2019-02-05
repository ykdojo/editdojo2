import React from 'react'

function formatDate(dateString) {
  const givenDate = new Date(dateString);
  const milliSecondsSince = Date.now() - givenDate.getTime();
  const minutes = Math.round(milliSecondsSince / 1000 / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (days > 0) {
    const toAppend = days == 1 ? ' day ago' : ' days ago'
    return days + toAppend;
  }

  if (hours > 0) {
    const toAppend = hours == 1 ? ' hour ago' : ' hours ago'
    return hours + toAppend;
  }

  if (minutes > 0) {
    const toAppend = minutes == 1 ? ' minute ago' : ' minutes ago'
    return minutes + toAppend;
  }

  return 'just posted';
}

class Post extends React.Component {
  render() {
    const post = this.props.data;
    const date = formatDate(post.date_posted);
    const profileLink = "https://twitter.com/intent/user?user_id=" + post.associated_social_account.uid;
    const user = post.posted_by;
    const learning = user.learning_languages;
    const fluent = user.fluent_languages;
    const learningString = learning.map(l => l.short_representation).join(', ')
    const fluentString = fluent.map(l => l.short_representation).join(', ')

    return (
        <div className="section" style={{padding: '5px 0', fontSize: '14px'}}>
          <div className='card-body' style={{padding: '15px 10px', paddingBottom: '0px'}}>
            <div style={{fontSize: '15px', marginBottom: '10px', lineHeight: '20px'}}>
              <a href={profileLink} target="_blank" className="ed-username">@{user.username}</a>
              <span style={{marginLeft: '2px', fontSize: '80%'}}> ({fluentString} → {learningString})</span>
            </div>
            <div style={{lineHeight: '21px'}}>{post.text_content}</div>
            <div style={{fontSize: '90%', color: '#333333', marginTop: '10px', textAlign: 'left'}}>{date}</div>
            <div style={{textAlign: 'right'}}>
              <button className="btn btn-primary btn-sm btn-link ed-edit-button"
                style={{paddingRight: '5px', paddingLeft: '2px', marginTop: '5px'}}>
                <i className="material-icons">edit</i> Edit
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export default Post;