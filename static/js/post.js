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
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleContentRef(node) {
    if (node) {
      disableBodyScroll(node.firstElementChild.firstElementChild);
    } else {
      // We might not need this line as it's a duplicate from
      // below, but I'm keeping it for now just to make sure
      // we can clear the scroll lock (YK).
      clearAllBodyScrollLocks();
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    clearAllBodyScrollLocks();
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
                  style={{
                    overlay: {},
                    content: {
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
                      display: 'table-cell',
                      verticalAlign: 'middle',
                      position: 'static',
                      border: 'none',
                      background: 'none',
                    }}
                  >
                    <div style={{marginLeft: 'auto',
                                 marginRight: 'auto',
                                 height:'0px',
                                 position: 'relative',
                                 maxWidth: '600px'}}>
                      <button onClick={this.closeModal}
                        style={{position: 'absolute', right: '-10px', top: '-10px'}}>
                        close
                      </button>
                    </div>
                    <div
                      style={{
                        maxHeight: '100%',
                        maxWidth: '600px',
                        padding: '20px',
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
                              <div style={{fontWeight: 'normal'}}>
                                {sentence.text_content}
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
