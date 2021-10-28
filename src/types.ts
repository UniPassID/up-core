export class UPAccount {
  constructor(public username: string, public email?: string) {}
}

export class UPAuthResponse {
  constructor(
    public keyType: 'Secp256K1' | 'Secp256R1' | 'RSA',
    public pubkey: string,
    public sig: string
  ) {}
}

// ---------- AUTHORIZE ----------
type AUTH_TYPE = 'PLAIN_MSG' | 'CKB_TX' | 'EVM_TX' | 'FLOW_TX';
type AUTH_HASH = 'sha256' | 'sha3' | 'blake2b';

export class UPAuthMessage {
  constructor(
    public readonly type: AUTH_TYPE,
    public readonly username: string,
    public readonly payload: string,
    public readonly hash: AUTH_HASH = 'sha256'
  ) {}
}

// ------------ CONNECT ------------
export class UPMessage {
  constructor(
    public type: UPMessageType,
    public payload?: string,
    public resolve?: any,
    public reject?: any
  ) {}
}

export type UPMessageType = 'UP_READY' | 'UP_AUTH' | 'UP_LOGIN' | 'UP_ERROR';

export type UPConnectOptions = {
  email: boolean;
};
