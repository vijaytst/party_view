const isServer = () => typeof window === undefined;

export function localPersist(key, data) {
  if(!isServer) localStorage.setItem(key, data);
}

export function localUnPersist(key) {
  if(!isServer) localStorage.removeItem(key);
}

export function getLocal(key) {
  if(!isServer) return localStorage.getItem(key);
}

export function localClear() {
  if(!isServer) localStorage.clear();
}
