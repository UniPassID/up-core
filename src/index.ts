/**
 * up-core
 * A TypeScript SDK for UniPass
 *
 * frank@lay2.dev
 */
import { connect, disconnect } from './connect';
import { authorize } from './authorize';
import config from './config';
import { initPop } from './init-pop';

const up = {
  connect,
  disconnect,
  authorize,
  config,
  initPop,
};
export * from './types';
export default up;
