import React from 'react'
import Modal from 'react-modal';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { formatDate } from './helper';
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('react'));

export default class Post extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleContentRef(node) {
    if (node) {
      this.targetNode = node;
      disableBodyScroll(this.targetNode);
    } else {
      // We might not need this line as it's a duplicate from
      // below, but I'm keeping it for now just in case (YK).
      clearAllBodyScrollLocks();
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    clearAllBodyScrollLocks();
    this.setState({modalIsOpen: false});
  }

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
                      onClick={this.openModal}
                      style={{paddingRight: '5px', paddingLeft: '2px', marginTop: '5px'}}>
                <i className="material-icons">edit</i> Edit
              </button>
              <Modal
                  contentRef={node => this.handleContentRef(node)}
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  id={'modal' + this.props.postKey}
                  style={{
                    overlay: {},
                    content: {
                      top: '10px',
                      left: '10px',
                      right: '10px',
                      bottom: '10px',
                    }
                  }}
                >
                  <button onClick={this.closeModal}>close</button>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
                  <div>The edit view will come here.</div>
              </Modal>
            </div>
          </div>
        </div>
    );
  }
}
