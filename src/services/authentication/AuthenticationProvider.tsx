import { useLocation } from 'react-router-dom';
import { Log, UserManager, WebStorageStateStore } from 'oidc-client';
import { IDENTITY_CONFIG, METADATA_OIDC } from './AuthenticationConfig';
import { AuthProvider } from './AuthProvider';

const userManager = new UserManager({
  ...IDENTITY_CONFIG,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  metadata: {
    ...METADATA_OIDC,
  },
});

Log.logger = console;
Log.level = Log.DEBUG;

export const AuthenticationProvider = (props: React.PropsWithChildren<{}>) => {
  const location = useLocation();

  return (
    <AuthProvider location={location} userManager={userManager} autoSignIn={false}>
      {props.children}
    </AuthProvider>
  );
};
