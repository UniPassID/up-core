const UP_DOMAIN = 'unipass.id';
const UP_CONN_URL = 'https://unipass.id/connect';
const UP_AUTH_URL = 'https://unipass.id/authorize';
const UP_LOADING_URL = `https://${UP_DOMAIN}/connect/loading`;
const UP_POPUP_CONFIG =
  'width=380,height=675,top=40,left=100,toolbar=no,scrollbars=yes,location=no,status=no';

export type UP_CONFIG = {
  upDomain: string;
  upConnectUrl: string;
  upAuthUrl: string;
  upPopup: string;
  upLoadingUrl: string;
};

var config: UP_CONFIG;

export default (
  upDomain?: string,
  upConnectUrl?: string,
  upAuthUrl?: string,
  upPopup?: string,
  upLoadingUrl?: string
) => {
  config = {
    upDomain: upDomain || UP_DOMAIN,
    upConnectUrl: upConnectUrl || UP_CONN_URL,
    upAuthUrl: upAuthUrl || UP_AUTH_URL,
    upPopup: upPopup || UP_POPUP_CONFIG,
    upLoadingUrl: upLoadingUrl || UP_LOADING_URL,
  };
  return config;
};

export const getConfig = () => config;
