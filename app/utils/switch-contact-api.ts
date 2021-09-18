import { config } from '../config/app';

// ホスト名を取得して、ホスト名で分岐させる
export const contactApiEndpoint = () => {
  const host = location.host;
  const { prod, stg, local } = config.contactApiSettings;

  if (host === prod.host) {
    return prod.endpoint;
  } else if (host === stg.host) {
    return stg.endpoint;
  } else {
    return local.endpoint;
  }
};
