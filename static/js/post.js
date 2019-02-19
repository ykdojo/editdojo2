import React from 'react'
import CustomModal from './custom-modal';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { formatDate } from './helper';

export default class Post extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false // the modal for editing a post
    };
    this.scrollBody = null; // the portion of the modal that's going to be scrolled
    this.modalNode = null; // the DOM for the modal
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    // handle the event that occurs when the modal is loaded
    this.handleContentRef = this.handleContentRef.bind(this);
    
    // handle click outside the modal (so we can close it)
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    // If the scrollBody exists AND the scrollBody doesn't contain the clicked element,
    // then the clicked element is outside the scrollBody.
    if (this.scrollBody && !this.scrollBody.contains(event.target)) {
        this.closeModal();
    }
  }
  
  // This function is run when the modal is mounted.
  handleContentRef(node) {
    if (node) {
      this.scrollBody = node.firstElementChild.children[1];
      disableBodyScroll(this.scrollBody);
      this.modalNode = node;
      this.modalNode.addEventListener('click', this.handleClickOutside, true);
    } else {
      // We might not need this block as it's a duplicate from
      // below, but I'm keeping it for now just to make sure
      // we can clear the scroll lock (YK).
      this.scrollBody = null;
      clearAllBodyScrollLocks();
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.modalNode.removeEventListener('click', this.handleClickOutside, true);
    this.modalNode = null;
    this.scrollBody = null;
    this.setState({modalIsOpen: false});
    clearAllBodyScrollLocks();
  }

  render() {
    const post = this.props.data;
    const dateString = formatDate(post.date_posted); // example: '6 days ago'
    const profileLink = "https://twitter.com/intent/user?user_id=" + post.associated_social_account.uid;
    const user = post.posted_by;
    const learning = user.learning_languages;
    const fluent = user.fluent_languages;
    const learningString = learning.map(l => l.short_representation).join(', ')
    const fluentString = fluent.map(l => l.short_representation).join(', ')

    return (
        <div className="section" style={{padding: '5px 0', fontSize: '14px'}}>
          <div className='card-body' style={{padding: '15px 10px', paddingBottom: '0px'}}>
            {/* The div for user info */}
            <div style={{fontSize: '15px', marginBottom: '10px', lineHeight: '20px'}}>
              <a href={profileLink} target="_blank" className="ed-username">@{user.username}</a>
              <span style={{marginLeft: '2px', fontSize: '80%'}}> ({fluentString} → {learningString})</span>
            </div>

            {/* The divs for the main content and the date string */}
            <div style={{lineHeight: '21px'}}>{post.text_content}</div>
            <div style={{fontSize: '90%', color: '#333333', marginTop: '10px', textAlign: 'left'}}>{dateString}</div>

            {/* The div for the edit button */}
            <div style={{textAlign: 'right'}}>
              <button className="btn btn-primary btn-sm btn-link ed-edit-button"
                      onClick={this.openModal}
                      style={{paddingRight: '5px', paddingLeft: '2px', marginTop: '5px'}}>
                <i className="material-icons">edit</i> Edit
              </button>
              {/* The modal for editing the post */}
              <CustomModal
                handleContentRef={this.handleContentRef}
                closeModal={this.closeModal}
                modalIsOpen={this.state.modalIsOpen}
                post={post}
              />
            </div>
          </div>
        </div>
    );
  }
}
