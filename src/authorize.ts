import { post2up } from './bridge';
import { UPAuthMessage, UPMessage } from './types';

export const authorize = async (message: UPAuthMessage) => {
  return new Promise((resolve, reject) => {
    try {
      const msg = new UPMessage('UP_AUTH', JSON.stringify(message), resolve);
      post2up(msg);
    } catch (e) {
      reject('Auth Message Invalid');
    }
  });
};
