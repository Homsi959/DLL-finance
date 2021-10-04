import { UserManagerSettings } from 'oidc-client';

const identityUrl = process.env.REACT_APP_IDENTITY_URL as string;
const spaClientUrl = process.env.REACT_APP_SPA_CLIENT_URL as string;

export const IDENTITY_CONFIG: UserManagerSettings = {
  authority: identityUrl,
  client_id: 'spa_client',
  redirect_uri: spaClientUrl + '/callback',
  silent_redirect_uri: spaClientUrl + '/silent',
  post_logout_redirect_uri: spaClientUrl + '/',
  //audience: process.env.REACT_APP_AUDIENCE,
  response_type: 'code',
  loadUserInfo: true,
  scope: 'openid profile quotas IdentityServerApi',
  automaticSilentRenew: true,
  revokeAccessTokenOnSignout: true,
  filterProtocolClaims: false,
};

export const METADATA_OIDC = {
  issuer: identityUrl,
  jwks_uri: identityUrl + '/.well-known/openid-configuration/jwks',
  authorization_endpoint: identityUrl + '/connect/authorize',
  token_endpoint: identityUrl + '/connect/token',
  userinfo_endpoint: identityUrl + '/connect/userinfo',
  end_session_endpoint: identityUrl + '/connect/endsession',
  check_session_iframe: identityUrl + '/connect/checksession',
  revocation_endpoint: identityUrl + '/connect/revocation',
  introspection_endpoint: identityUrl + '/connect/introspect',
};
