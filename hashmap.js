export default class HashMap {
    constructor(loadFactor, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(capacity);
    }

    #hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.capacity;
    }
    set(key, value) {
        const index = this.#hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        // if (bucket.length < this.loadFactor * this.capacity) {
        //     // Remember to grow your buckets to double their capacity when your hash map reaches the load factor. The methods mentioned later in this assignment can help you handle the growth logic, so you may want to implement this feature near the end. However, we mention this with set() because it’s important to grow buckets exactly as they are being expanded.
        // }
    }
    get(key) {
        const index = this.#hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }
    has(key) {
        const index = this.#hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }
    remove(key) {
        const index = this.#hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    length() {
        this.buckets.reduce((total, bucket) => {
            let bucketLength = bucket.length;
            return (total += bucketLength);
        }, 0);
    }
    clear() {
        this.buckets.forEach((bucket) => {
            bucket.splice(0, bucket.length);
        });
        this.buckets.splice(0, this.buckets.length);
    }
    keys() {
        return this.buckets.flatMap((bucket) => {
            return bucket.map((item) => item[0]);
        });
    }
    values() {
        return this.buckets.flatMap((bucket) => {
            return bucket.map((item) => item[1]);
        });
    }
    entries() {
        return this.buckets.flat();
    }
}
