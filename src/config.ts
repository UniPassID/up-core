const UP_DOMAIN = 'unipass.id';
const UP_POPUP_CONFIG =
  'width=380,height=675,top=40,left=100,toolbar=no,scrollbars=yes,location=no,status=no';

export type UP_CONFIG = {
  upDomain: string;
  upConnectUrl: string;
  upAuthUrl: string;
  upPopup: string;
  upLoadingUrl: string;
};

export interface UPConfigOption {
  domain?: string;
  protocol?: 'https' | 'http';
}

var config: UP_CONFIG = {
  upDomain: UP_DOMAIN,
  upConnectUrl: `https://${UP_DOMAIN}/connect`,
  upAuthUrl: `https://${UP_DOMAIN}/authorize`,
  upPopup: UP_POPUP_CONFIG,
  upLoadingUrl: `https://${UP_DOMAIN}/connect/loading`,
};

export default (option: UPConfigOption) => {
  let { domain, protocol } = option;

  domain = domain || UP_DOMAIN;
  protocol = protocol || 'https';

  config = {
    upDomain: domain,
    upConnectUrl: `${protocol}://${domain}/connect`,
    upAuthUrl: `${protocol}://${domain}/authorize`,
    upPopup: UP_POPUP_CONFIG,
    upLoadingUrl: `${protocol}://${domain}/connect/loading`,
  };
  return config;
};

export const getConfig = () => config;
