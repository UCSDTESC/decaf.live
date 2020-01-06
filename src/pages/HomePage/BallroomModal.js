import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class BallroomModal extends React.Component {

  render() {
    const {toggle, open, className, title} = this.props;
    return (
      <div>
        <Modal isOpen={open} toggle={toggle} className={className}>
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <div className="row">
                <img className="img-fluid" src="/map-preview.gif"/>
                <a className="text-center w-100">
                  Open map in a new tab {'<link-icon></link-icon>'}
                </a>
              </div>
              <div className="row">
                company list? idk
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default BallroomModal;