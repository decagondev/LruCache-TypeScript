class LRUCache {
  private capacity: number;
  private cache: Map<string, { key: string; value: string; prev: string | null; next: string | null }>;
  private head: string | null;
  private tail: string | null;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<string, { key: string; value: string; prev: string | null; next: string | null }>();
    this.head = null;
    this.tail = null;
  }

  private removeNode(key: string): void {
    const node = this.cache.get(key);
    if (node) {
      if (node.prev !== null) {
        const prevNode = this.cache.get(node.prev);
        if (prevNode) {
          prevNode.next = node.next;
        }
      } else {
        this.head = node.next;
      }

      if (node.next !== null) {
        const nextNode = this.cache.get(node.next);
        if (nextNode) {
          nextNode.prev = node.prev;
        }
      } else {
        this.tail = node.prev;
      }
    }
    this.cache.delete(key);
  }

  private addToFront(key: string, value: string): void {
    const newNode = {
      key,
      value,
      prev: null,
      next: this.head,
    };

    if (this.head !== null) {
      const headNode = this.cache.get(this.head);
      if (headNode) {
        headNode.prev = key;
      }
    } else {
      this.tail = key;
    }

    this.cache.set(key, newNode);
    this.head = key;
  }

  get(key: string): string | undefined {
    const entry = this.cache.get(key);
    if (entry) {
      const value = entry.value;
        this.removeNode(key);
        this.addToFront(key, value);
        return value;
    }
    return undefined;
  }

  put(key: string, value: string): void {
    if (this.cache.has(key)) {
      this.removeNode(key);
    } else if (this.cache.size >= this.capacity) {
      if (this.tail !== null) {
        this.removeNode(this.tail);
      }
    }
    this.addToFront(key, value);
  }

  display(): void {
    let current = this.head;
    while (current !== null) {
      const node = this.cache.get(current);
      if (node) {
        console.log(`Key: ${node.key}, Value: ${node.value}`);
        current = node.next;
      } else {
        break;
      }
    }
  }
}


const cache = new LRUCache(3000);

cache.put('a', 'one');
cache.put('b', 'two');
cache.put('c', 'three');
cache.put('d', 'four');


console.log(cache.get('b')); 

cache.display();
