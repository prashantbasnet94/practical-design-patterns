interface CacheNode<K, V> {
  key: K;
  value: V;
  prev: CacheNode<K, V> | null;
  next: CacheNode<K, V> | null;
}

export class LRUCache<K, V> {
  private capacity: number;
  // TODO: Define your data structures here

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    // TODO: Return value and mark as recently used
    return undefined;
  }

  put(key: K, value: V): void {
    // TODO: Add/Update value. Evict least recently used if full.
  }
}
