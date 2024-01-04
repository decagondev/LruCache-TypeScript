# Generic LRUCache in TypeScript
This is a simple implementation of an LRUCache in TypeScript

## To test add this to the bottom of `Lrucache.ts`

```TypeScript
const cache =  new DLRUCache<number>(4);

cache.put("A", 1);
cache.put("B", 2);
cache.put("C", 3);
cache.put("D", 4);
cache.put("E", 5);
cache.put("F", 6);
cache.put("G", 7);

console.log("getting ", cache.get("E"));

console.log(cache.display());
```
