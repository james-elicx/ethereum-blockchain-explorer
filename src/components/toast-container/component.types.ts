import type { Toast } from '../../contexts/toast-context/context.types';

export type ToastContainerProps = {
  messages: Toast[];
  handleClose: (id: string) => void;
};
