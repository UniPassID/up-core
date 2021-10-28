/**
 * Invoke UniPass to obtain user account info
 * @param options
 */
import { initListener, post2up, removeListener, UPA_SESSION_KEY } from './bridge';
import { UPAccount, UPConnectOptions, UPMessage } from './types';


export const connect = async (options?: UPConnectOptions) => {
  initListener();
  const sessionAccount = sessionStorage.getItem(UPA_SESSION_KEY);
  const account =
    (sessionAccount && (JSON.parse(sessionAccount) as UPAccount)) ||
    (await getAccount(options));

  return account;
};

export const disconnect = () => {
  removeListener();
  sessionStorage.removeItem(UPA_SESSION_KEY);
};

const getAccount = async (options?: UPConnectOptions) => {
  const account = (await new Promise((resolve, reject) => {
    try {
      const payload = options ? JSON.stringify(options) : '';
      const message = new UPMessage(
        'UP_LOGIN',
        payload,
        (accountStr: string) => {
          const accountObj = JSON.parse(accountStr) as UPAccount;
          if (accountObj && accountObj.username) {
            sessionStorage.setItem(UPA_SESSION_KEY, accountStr);
          }
          resolve(accountObj);
        },
        reject
      );
      post2up(message);
    } catch (e) {
      reject('Account Not Available');
    }
  })) as UPAccount;

  return account;
};
