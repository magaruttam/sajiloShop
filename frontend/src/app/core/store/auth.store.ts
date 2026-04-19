import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type AuthState = {
  isLoggedIn: boolean;
  name: string;
  email: string;
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({ isLoggedIn: false, name: '', email: '' }),
  withMethods((store) => ({
    login(name: string, email: string) {
      patchState(store, { isLoggedIn: true, name, email });
    },
    logout() {
      patchState(store, { isLoggedIn: false, name: '', email: '' });
    },
  }))
);
