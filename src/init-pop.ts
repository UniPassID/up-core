import { UPMessage } from '.';
import { pop } from './pop';

export const initPop = () => {
  pop(new UPMessage('UP_READY'));
};
