export type Toast = {
  message: string;
  id: string;
};

export type IToastContext = {
  sendToast: (message: string) => void;
};
