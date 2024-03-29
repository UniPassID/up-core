/**
 * Invoke UniPass to obtain user account info
 * @param options
 */
import { execPop, UPA_SESSION_KEY } from './bridge';
import { UPAccount, UPConnectOptions, UPMessage } from './types';

export const connect = async (
  options?: UPConnectOptions
): Promise<UPAccount> => {
  const sessionAccount = sessionStorage.getItem(UPA_SESSION_KEY);
  const account: UPAccount =
    (sessionAccount && (JSON.parse(sessionAccount) as UPAccount)) ||
    (await getAccount(options));

  return account;
};

export const disconnect = () => {
  sessionStorage.removeItem(UPA_SESSION_KEY);
};

const getAccount = async (options?: UPConnectOptions): Promise<UPAccount> => {
  try {
    const payload = options ? JSON.stringify(options) : '';
    const message = new UPMessage('UP_LOGIN', payload);

    const account: UPAccount = (await execPop(message, options?.eventListener)) as UPAccount;
    console.log('connect resp', account);
    if (account && account.username) {
      sessionStorage.setItem(UPA_SESSION_KEY, JSON.stringify(account));
    }

    return account;
  } catch (e) {
    throw new Error('Account Not Available');
  }
};
