export class UPAccount {
  constructor(public username: string, public email?: string) { }
}

// ---------- AUTHORIZE ----------
type AUTH_TYPE = 'PLAIN_MSG' | 'CKB_TX' | 'EVM_TX' | 'FLOW_TX';
type AUTH_HASH = 'sha256' | 'sha3' | 'blake2b';

export class UPAuthMessage {
  constructor(
    public readonly type: AUTH_TYPE,
    public readonly payload: string,
    public readonly hash: AUTH_HASH = 'sha256'
  ) { }
}

// ------------ CONNECT ------------
export class UPMessage {
  constructor(
    public type: UPMessageType,
    public payload?: string,
    public resolve?: any
  ) { }
}

export type UPMessageType = 'UP_READY' | 'UP_AUTH' | 'UP_LOGIN' | 'UP_ERROR';

export type UPConnectOptions = {
  email: boolean;
};
