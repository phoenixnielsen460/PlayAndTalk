/**
 * Minimal IndexedDB helper for key-value storage.
 * Uses a single objectStore 'kv' and stores {key, value}
 */
function openDB() {
  return new Promise((res, rej) => {
    const req = indexedDB.open('play-and-speak-db', 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv', { keyPath: 'key' });
    };
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

export async function dbGet(key) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readonly');
    const store = tx.objectStore('kv');
    const r = store.get(key);
    r.onsuccess = () => res(r.result ? r.result.value : null);
    r.onerror = () => rej(r.error);
  });
}

export async function dbSet(key, value) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readwrite');
    const store = tx.objectStore('kv');
    const r = store.put({ key, value });
    r.onsuccess = () => res(true);
    r.onerror = () => rej(r.error);
  });
}

export async function dbDelete(key) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readwrite');
    const store = tx.objectStore('kv');
    const r = store.delete(key);
    r.onsuccess = () => res(true);
    r.onerror = () => rej(r.error);
  });
}
