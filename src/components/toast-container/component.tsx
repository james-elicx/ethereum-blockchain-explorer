import { createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button } from '../../components';
import type { Toast } from '../../contexts/toast-context/context.types';
import type { ToastContainerProps } from './component.types';

export const ToastContainer = ({ messages, handleClose }: ToastContainerProps): JSX.Element => (
  <TransitionGroup className="toast-container">
    {messages.map((toast: Toast) => {
      // Need to create a ref to prevent strict mode error
      // https://github.com/reactjs/react-transition-group/issues/668
      const toastRef = createRef<HTMLDivElement>();

      return (
        <CSSTransition key={toast.id} timeout={400} classNames="toast" nodeRef={toastRef}>
          <div id={`toast-${toast.id}`} className="toast" ref={toastRef}>
            <span className="toast-message">{toast.message}</span>
            <Button className="toast-close" onClick={() => handleClose(toast.id)}>
              Close
            </Button>
          </div>
        </CSSTransition>
      );
    })}
  </TransitionGroup>
);
