export interface VaultOptions {
  /** `'local'` (default) for localStorage, `'session'` for sessionStorage. */
  type?: 'local' | 'session';
  /** Stores every key as `<prefix>-<key>`, so instances with different prefixes don't collide. */
  prefix?: string;
}

/** Typed wrapper over localStorage / sessionStorage; values are stored as JSON. */
export class Vault {
  private readonly type: 'local' | 'session';
  private readonly prefix: string;

  constructor({ type = 'local', prefix = '' }: VaultOptions = {}) {
    this.type = type;
    this.prefix = prefix ? `${prefix}-` : '';
  }

  // looked up on each call, so a Vault can be created before storage is available
  private get store(): Storage {
    return this.type === 'session' ? sessionStorage : localStorage;
  }

  /** Whether the storage can be written (false when disabled, e.g. some private modes). */
  get isSupported(): boolean {
    try {
      const probe = `${this.prefix}__vault__`;
      this.store.setItem(probe, probe);
      this.store.removeItem(probe);
      return true;
    } catch {
      return false;
    }
  }

  set<T>(key: string, value: T): void {
    this.store.setItem(this.prefix + key, JSON.stringify(value));
  }

  get<T>(key: string): T | undefined {
    const raw = this.store.getItem(this.prefix + key);
    return raw === null ? undefined : (JSON.parse(raw) as T);
  }

  remove(key: string): void {
    this.store.removeItem(this.prefix + key);
  }

  /** Clears the storage; with a prefix, only this vault's keys. */
  removeAll(): void {
    if (!this.prefix) return this.store.clear();
    for (const key of this.ownKeys()) this.store.removeItem(key);
  }

  /** Calls `fn` when another tab changes `key`. Returns an unsubscribe function. */
  onChange(key: string, fn: (e: StorageEvent) => void): () => void {
    const handler = (e: StorageEvent) => {
      if (e.storageArea === this.store && e.key === this.prefix + key) fn(e);
    };
    addEventListener('storage', handler);
    return () => removeEventListener('storage', handler);
  }

  /** All of this vault's keys (prefix stripped) and their raw, still-JSON string values. */
  get value(): Record<string, string> {
    return Object.fromEntries(
      this.ownKeys().map((key) => [key.slice(this.prefix.length), this.store.getItem(key)!]),
    );
  }

  get length(): number {
    return this.ownKeys().length;
  }

  private ownKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.store.length; i++) {
      const key = this.store.key(i)!;
      if (key.startsWith(this.prefix)) keys.push(key);
    }
    return keys;
  }
}
