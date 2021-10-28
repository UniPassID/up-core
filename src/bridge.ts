import { getConfig } from './config';
import { renderPop } from './pop';
import { UPMessage } from './types';

// const abortController = new AbortController();

export const UPA_SESSION_KEY = 'UP-A';
const MESSAGE_Q: UPMessage[] = [];
var popup: Window | null;
var unmount: () => void | null;

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
      ({popup, unmount} = renderPop(getConfig().upConnectUrl, getConfig().upPopup));
      break;
    case 'UP_AUTH':
      ({popup, unmount} = renderPop(getConfig().upAuthUrl, getConfig().upPopup));
      break;
  }
};

const messageHandler = (e: MessageEvent) => {
  console.log('[up-core]Message: ', e.data);
  console.log('[up-core]MessageQ: ', MESSAGE_Q);
  const { type, payload } = e.data as UPMessage;
  console.log('[up-core]MessageType: ', type);
  switch (type) {
    case 'UP_READY':
      sendMessageFromQ();
      break;
    case 'UP_LOGIN':
      MESSAGE_Q.length && MESSAGE_Q[0].resolve(payload);
      MESSAGE_Q.pop();
      unmount();
      break;
    case 'UP_AUTH':
      MESSAGE_Q.length && MESSAGE_Q[0].resolve(payload);
      MESSAGE_Q.pop();
      unmount();
      break;
    case 'UP_ERROR':
      MESSAGE_Q.length && MESSAGE_Q[0].reject(payload);
      MESSAGE_Q.pop();
      unmount();
      break;
    default:
      console.log(`[up-core] unknown MessageType: [${type}]`);
      break;
  }
};

const sendMessageFromQ = () => {
  console.log(`[up-core] popup`, popup);
  popup &&
    MESSAGE_Q.length &&
    popup.postMessage(
      { ...MESSAGE_Q[0], resolve: null, reject: null },
      getConfig().upDomain
    );
};
