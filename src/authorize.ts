import { execPop, UPA_SESSION_KEY } from './bridge';
import { UPAccount, UPAuthMessage, UPAuthResponse, UPMessage } from './types';

export const authorize = async (message: UPAuthMessage) => {
  const sessionAccount = sessionStorage.getItem(UPA_SESSION_KEY);
  const account = sessionAccount && (JSON.parse(sessionAccount) as UPAccount);
  if (!account || !message.username || account.username !== message.username) {
    throw new Error('can not authorize without login');
  }
  const msg = new UPMessage('UP_AUTH', JSON.stringify(message));

  return (await execPop(msg)) as UPAuthResponse;
};
