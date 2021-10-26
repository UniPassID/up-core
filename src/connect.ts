/**
 * Invoke UniPass to obtain user account info
 * @param options
 */
import { initListener, post2up, removeListener } from './bridge';
import { UPAccount, UPConnectOptions, UPMessage } from './types';

const UPA_SESSION_KEY = 'UP-A';

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
      const message = new UPMessage('UP_LOGIN', payload, resolve);
      post2up(message);
    } catch (e) {
      reject('Account Not Available');
    }
  })) as UPAccount;

  return account;
};
