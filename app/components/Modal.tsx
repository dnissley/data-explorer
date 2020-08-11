import React from 'react';
import ReactDOM from 'react-dom';

const OverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
};

const ModalStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: 50,
  zIndex: 1000,
};

export interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, show, onClose }) => {
  if (!show) return null;

  const portalElement = document.getElementById('modal');

  if (portalElement == null) {
    throw new Error('Could not find portal element with the id "modal"');
  }

  return ReactDOM.createPortal(
    <div style={OverlayStyle}>
      <div style={ModalStyle}>
        <button type="button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    portalElement
  );
};

export default Modal;
