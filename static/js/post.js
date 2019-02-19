import React from 'react'
import Modal from 'react-modal';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { formatDate } from './helper';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('react'));

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
              <Modal
                  // contentRef is run when the modal is loaded.
                  contentRef={node => this.handleContentRef(node)}
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={{
                    content: {
                      // Need to use table here for vertical centering
                      display: 'table',
                      height: '100%',
                      overflow: 'hidden',
                      width: '100%',
                      border: 'none',
                      background: 'none',
                      padding: 0,
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }
                  }}
                >
                  <div
                    style={{
                      padding: '10px',
                      // Need to use table-cell here for vertical centering
                      display: 'table-cell',
                      verticalAlign: 'middle',
                      position: 'static',
                      border: 'none',
                      background: 'none',
                    }}
                  >
                    {/* The div for the close button */}
                    <div style={{marginLeft: 'auto',
                                 marginRight: 'auto',
                                 height:'0px',
                                 position: 'relative',
                                 maxWidth: '600px'}}>
                      <button className='btn btn-fab btn-round'
                              onClick={this.closeModal}
                              style={{
                                      position: 'absolute',
                                      right: '-10px',
                                      top: '-10px',
                                      width: '24px',
                                      minWidth: '24px',
                                      height: '24px',
                                      zIndex: '999999',
                                    }}
                      >
                        <i className="material-icons" style={{lineHeight: '25px', fontSize: '16px'}}>close</i>
                      </button>
                    </div> {/* END the div for the close button */}
                    {/* The div for the main editing view */}
                    <div
                      style={{
                        maxHeight: '100%',
                        maxWidth: '600px',
                        padding: '20px',
                        paddingRight: '15px',
                        overflow: 'auto',
                        border: '1px solid rgb(204, 204, 204)',
                        background: 'rgb(255, 255, 255)',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}>
                      {
                        post.sentence_set.map(
                          (sentence) => (
                            <div key={sentence.sentence_index}>
                              <div style={{
                                fontWeight: 'normal',
                                display: 'flex',
                                flexWrap: 'nowrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                                <div>
                                  {sentence.text_content}
                                </div>
                                <div style={{paddingLeft: '10px', height: '24px'}}>
                                  <i className="material-icons" style={{color: "#9c27b0"}}>edit</i>
                                </div>
                              </div>
                              <hr></hr>
                            </div>
                          )
                        )
                      }
                    </div>
                  </div>
              </Modal>
            </div>
          </div>
        </div>
    );
  }
}
