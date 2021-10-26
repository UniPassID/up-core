const UP_DOMAIN = 'unipass.id';
const UP_CONN_URL = 'https://unipass.id/connect';
const UP_AUTH_URL = 'https://unipass.id/authorize';
const UP_POPUP_CONFIG =
  'width=380,height=675,top=40,left=100,toolbar=no,scrollbars=yes,location=no,status=no';

export type UP_CONFIG = {
  upDomain: string;
  upConnectUrl: string;
  upAuthUrl: string;
  upPopup: string;
};

var config: UP_CONFIG;

export default (
  upDomain?: string,
  upConnectUrl?: string,
  upAuthUrl?: string,
  upPopup?: string
) => {
  config = {
    upDomain: upDomain || UP_DOMAIN,
    upConnectUrl: upConnectUrl || UP_CONN_URL,
    upAuthUrl: upAuthUrl || UP_AUTH_URL,
    upPopup: upPopup || UP_POPUP_CONFIG
  }
  return config
};

export const getConfig = () => config;
