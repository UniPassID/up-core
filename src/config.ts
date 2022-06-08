const UP_DOMAIN = 'unipass.id';

export type UP_CONFIG = {
  upDomain: string;
  upConnectUrl: string;
  upAuthUrl: string;
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
    upLoadingUrl: `${protocol}://${domain}/connect/loading`,
  };
  return config;
};

export const getConfig = () => config;
