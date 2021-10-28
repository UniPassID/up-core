import { post2up, UPA_SESSION_KEY } from './bridge';
import { UPAccount, UPAuthMessage, UPAuthResponse, UPMessage } from './types';

export const authorize = async (message: UPAuthMessage) => {
  return new Promise((resolve, reject) => {
    try {
      const sessionAccount = sessionStorage.getItem(UPA_SESSION_KEY);
      const account =
        sessionAccount && (JSON.parse(sessionAccount) as UPAccount);
      if (
        !account ||
        !message.username ||
        account.username !== message.username
      ) {
        reject('can not authorize without login');
        return;
      }

      const msg = new UPMessage(
        'UP_AUTH',
        JSON.stringify(message),
        (resp: string) => {
          const authResp = JSON.parse(resp) as UPAuthResponse;
          resolve(authResp);
        },
        reject
      );
      post2up(msg);
    } catch (e) {
      reject('Auth Message Invalid');
    }
  });
};
