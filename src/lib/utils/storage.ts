// src/lib/utils/storage.ts
type StorageType = 'local' | 'session';

export function getStorage<T>(key: string, type: StorageType = 'local'): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from ${type}Storage:`, error);
    return null;
  }
}

export function setStorage<T>(key: string, value: T, type: StorageType = 'local'): void {
  if (typeof window === 'undefined') return;
  
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to ${type}Storage:`, error);
  }
}

export function removeStorage(key: string, type: StorageType = 'local'): void {
  if (typeof window === 'undefined') return;
  
  try {
    const storage = type === 'local' ? localStorage : sessionStorage;
    storage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from ${type}Storage:`, error);
  }
}