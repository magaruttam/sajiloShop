import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';

type VendorInfo = {
  id: number;
  userId: number;
  status: string;
  shopName: string;
  balance: string;
} | null;

type AuthState = {
  isLoggedIn: boolean;
  name: string;
  email: string;
  role: 'user' | 'vendor' | null;
  vendor: VendorInfo;
};

const STORAGE_KEY = 'auth_state';

function loadFromStorage(): Partial<AuthState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(state: AuthState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

const defaultState: AuthState = { isLoggedIn: false, name: '', email: '', role: null, vendor: null };

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({ ...defaultState, ...loadFromStorage() }),
  withMethods((store) => ({
    login(name: string, email: string) {
      const state: AuthState = { isLoggedIn: true, name, email, role: 'user', vendor: null };
      patchState(store, state);
      // saveToStorage(state);
    },
    vendorLogin(name: string, email: string, vendor: VendorInfo) {
      const state: AuthState = { isLoggedIn: true, name, email, role: 'vendor', vendor };
      patchState(store, state);
      // saveToStorage(state);
    },
    logout() {
      patchState(store, defaultState);
      clearStorage();
    },
  }))
);
