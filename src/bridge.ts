import { getConfig } from './config';
import { UPMessage } from './types';

// const abortController = new AbortController();

const MESSAGE_Q: UPMessage[] = [];
var popup: Window | null;

export const initListener = () => {
  // window.addEventListener('message', messageHandler, {
  //   signal: abortController.signal,
  // });
  window.addEventListener('message', messageHandler);
};

export const removeListener = () => {
  // abortController.abort();
  window.removeEventListener('message', messageHandler);
};

export const post2up = (message: UPMessage) => {
  MESSAGE_Q.push(message);
  switch (message.type) {
    case 'UP_LOGIN':
      popup = window.open(getConfig().upConnectUrl, '', getConfig().upPopup);
      break;
    case 'UP_AUTH':
      popup = window.open(getConfig().upAuthUrl, '', getConfig().upPopup);
      break;
  }
};

const messageHandler = (e: MessageEvent) => {
  console.log('[up-core]Message: ', e.data);
  console.log('[up-core]MessageQ: ', MESSAGE_Q);
  const { type, payload } = e.data;
  console.log('[up-core]MessageType: ', type);
  switch (type) {
    case 'UP_READY':
      sendMessageFromQ();
      break;
    default:
      MESSAGE_Q.length && MESSAGE_Q[0].resolve(payload);
      MESSAGE_Q.pop();
      break;
  }
};

const sendMessageFromQ = () => {
  popup && MESSAGE_Q.length && popup.postMessage({ ...MESSAGE_Q[0], resolve: null }, getConfig().upDomain);
};
