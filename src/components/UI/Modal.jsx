import { createPortal } from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const overlayElement = document.getElementById('overlays');

const Modal = props => {
  return (
    <>
      {createPortal(<Backdrop />, overlayElement)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayElement)}
    </>
  );
};

export default Modal;
