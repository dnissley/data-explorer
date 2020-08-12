import React from 'react';
import ReactDOM from 'react-dom';
import WindowFrame from './WindowFrame';

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  zIndex: 1000,
};

export interface ModalProps {
  title: string;
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, show, onClose, children }) => {
  if (!show) return null;

  const portalElement = document.getElementById('modal');

  if (portalElement == null) {
    throw new Error('Could not find portal element with the id "modal"');
  }

  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <WindowFrame
        title={title}
        style={modalStyle}
        controls={[
          {
            name: 'close',
            icon: <i className="fa fa-times" />,
            action: onClose,
          },
        ]}
      >
        <div style={{ padding: 20 }}>{children}</div>
      </WindowFrame>
    </div>,
    portalElement
  );
};

export default Modal;
