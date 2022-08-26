
export type UPMessageType =
| 'UP_READY'
| 'UP_RESPONSE'
| 'UP_CLOSE'
| 'UP_AUTH'
| 'UP_LOGIN'
| 'UP_EVENT'
| 'UP_ERROR'

export type KeyType = 'Secp256k1Pubkey' | 'Secp256r1Pubkey' | 'RsaPubkey'
export const KeyTypeArray: KeyType[] = [
'RsaPubkey',
'Secp256k1Pubkey',
'Secp256r1Pubkey',
]

export class UPAccount {
constructor(
  public username: string,
  public email?: string,
  public evmKeys?: string[],
  public newborn?: boolean,
) {}
}

export class UPAuthResponse {
constructor(
  public keyType: KeyType,
  public pubkey: string,
  public sig: string,
) {}
}

// ---------- AUTHORIZE ----------
export type AUTH_TYPE = 'PLAIN_MSG' | 'CKB_TX' | 'EVM_TX' | 'FLOW_TX'

export enum EvmTransactionType {
APPROVE = 'approve',
TRANSFER = 'transfer',
TRANSFER_TOKEN = 'transfer_token',
CONTRACT_CALL = 'contract_call',
}

export enum UPEventType {
REGISTER = 'register',
}
export class UPEvent {
constructor(
  public readonly type: UPEventType,
  public readonly body: UPAccount,
) {}
}

export type UPEventListener = (event: UPEvent) => {}

export interface Token {
address: string
symbol: string
decimals: number
}
export interface EvmTransaction {
type: EvmTransactionType
raw: string
to: string
value: string
feeToken: Token
feeAmount: string
description: string
data?: string
token?: Token
tokenAmount?: string
}

export class UPAuthMessage {
constructor(
  public readonly type: AUTH_TYPE,
  public readonly username: string,
  public readonly payload: string | EvmTransaction,
) {}
}

type RESPONSE_TYPE = 'APPROVE' | 'DECLINE'
export class UPResponse {
constructor(
  public readonly type: RESPONSE_TYPE,
  public readonly data: UPAccount | UPAuthResponse | string,
) {}
}

// ------------ CONNECT ------------
export class UPMessage {
constructor(public type: UPMessageType, public payload?: string) {}
}

export enum UniPassTheme {
LIGHT = 'light',
DARK = 'dark',
}

export type UPChainInfo = {
id: number
name: string
}

export type UPConnectOptions = {
email?: boolean
evmKeys?: boolean
theme?: UniPassTheme
chain?: UPChainInfo
appName?: string
eventListener?: UPEventListener
}