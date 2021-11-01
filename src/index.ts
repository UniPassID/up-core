/**
 * up-core
 * A TypeScript SDK for UniPass
 *
 * frank@lay2.dev
 */
import { connect, disconnect } from './connect';
import { authorize } from './authorize';
import config from './config';

const up = {
  connect,
  disconnect,
  authorize,
  config,
};
export * from './types';
export default up;
