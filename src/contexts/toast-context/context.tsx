import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { ToastContainer } from '../../components';
import type { IToastContext, Toast } from './context.types';
import './context.scss';

const ToastContext = createContext<IToastContext>(undefined as unknown as IToastContext);

export const useToast = () => useContext<IToastContext>(ToastContext);

type Props = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: Props): JSX.Element => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const cancel = useRef<Record<string, boolean>>({});

  const sendToast = useCallback((message: string) => {
    const id = Math.random().toString(36).slice(2);

    setToasts((prev) => [...prev, { message, id }]);

    setTimeout(() => {
      if (!cancel.current[id]) {
        cancel.current[id] = true;
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }
    }, 3000);
  }, []);

  const handleClose = (id: string) => {
    if (!cancel.current[id]) {
      cancel.current[id] = true;
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }
  };

  return (
    <ToastContext.Provider value={{ sendToast }}>
      <ToastContainer messages={toasts} handleClose={handleClose} />

      {children}
    </ToastContext.Provider>
  );
};
