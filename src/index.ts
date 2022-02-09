/**
 * up-core
 * A TypeScript SDK for UniPass
 *
 * frank@lay2.dev
 */
import { connect, disconnect } from './connect';
import { authorize } from './authorize';
import config, { UPConfigOption, UP_CONFIG } from './config';
import { initPop } from './init-pop';
import {
  UPAccount,
  UPAuthMessage,
  UPAuthResponse,
  UPConnectOptions,
} from './types';

export type UPCoreType = {
  connect: (option?: UPConnectOptions) => Promise<UPAccount>;
  disconnect: () => void;
  authorize: (msg: UPAuthMessage) => Promise<UPAuthResponse>;
  config: (option: UPConfigOption) => UP_CONFIG;
  initPop: () => void;
};

const up: UPCoreType = {
  connect,
  disconnect,
  authorize,
  config,
  initPop,
};
export * from './types';
export default up;
