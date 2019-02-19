import React from 'react'
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('react'));

export default function CustomModal(props) { return (
  <Modal
      // contentRef is run when the modal is loaded.
      contentRef={node => props.handleContentRef(node)}
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
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
      {/* The actual content div */}
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
                  onClick={props.closeModal}
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
          }}
        >
          {props.post.sentence_set.map(
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
          )}
        </div> {/* END the div for the main editing view */}
      </div> {/* END the actual content div */}
  </Modal>
); }