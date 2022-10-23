import message from 'antd/lib/message';

export const showError = (text: string) => {
  message.error(text, 4);
};

export const showInfo = (text: string) => {
  message.success(text, 4);
};
