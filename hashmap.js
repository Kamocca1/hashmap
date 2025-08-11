export default class HashMap {
    // Default capacity is set to 16, and a default load factor is added.
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        // Buckets are initialized as an array of the given capacity.
        this.buckets = new Array(this.capacity).fill(null);
        // A size property is added to keep track of the number of stored keys.
        // This is much more efficient than recalculating it every time.
        this.size = 0;
    }

    /**
     * Hashes a string key into a numeric value.
     * The modulo operator (%) is used inside the loop to prevent the hashCode
     * from exceeding JavaScript's safe integer limit with long keys.
     * @param {string} key - The key to hash.
     * @returns {number} - The hash code.
     */
    #hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            // The modulo is applied in each iteration to prevent overflow.
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    /**
     * Adds or updates a key-value pair in the hash map.
     * @param {string} key - The key.
     * @param {*} value - The value.
     */
    set(key, value) {
        // First, check if we need to resize the hash map.
        if (this.size / this.capacity >= this.loadFactor) {
            this.#resize();
        }

        const index = this.#hash(key);

        // If the bucket at the index doesn't exist, create it.
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const bucket = this.buckets[index];

        // Check if the key already exists and update its value.
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return; // Exit after updating.
            }
        }

        // If the key is new, add it to the bucket and increment the size.
        bucket.push([key, value]);
        this.size++;
    }

    /**
     * Retrieves the value for a given key.
     * @param {string} key - The key to look up.
     * @returns {*} - The value associated with the key, or null if not found.
     */
    get(key) {
        const index = this.#hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    return bucket[i][1];
                }
            }
        }
        return null; // Return null if the bucket or key is not found.
    }

    /**
     * Checks if a key exists in the hash map.
     * @param {string} key - The key to check.
     * @returns {boolean} - True if the key exists, false otherwise.
     */
    has(key) {
        const index = this.#hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Removes a key-value pair from the hash map.
     * @param {string} key - The key to remove.
     * @returns {boolean} - True if the key was removed, false otherwise.
     */
    remove(key) {
        const index = this.#hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    this.size--; // Decrement the size.
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Returns the total number of key-value pairs stored.
     * @returns {number} - The number of entries.
     */
    length() {
        // Simply return the size property.
        return this.size;
    }

    /**
     * Clears all entries from the hash map.
     */
    clear() {
        // Reset the buckets array and the size.
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    /**
     * Returns an array of all keys in the hash map.
     * @returns {string[]} - An array of keys.
     */
    keys() {
        const allKeys = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [key] of bucket) {
                    allKeys.push(key);
                }
            }
        }
        return allKeys;
    }

    /**
     * Returns an array of all values in the hash map.
     * @returns {*[]} - An array of values.
     */
    values() {
        const allValues = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [, value] of bucket) {
                    allValues.push(value);
                }
            }
        }
        return allValues;
    }

    /**
     * Returns an array of all [key, value] pairs.
     * @returns {Array<[string, *]>} - An array of entries.
     */
    entries() {
        const allEntries = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                // Use spread syntax to push all items from the bucket.
                allEntries.push(...bucket);
            }
        }
        return allEntries;
    }

    /**
     * Private helper method to resize the hash map when the load factor is exceeded.
     */
    #resize() {
        const oldEntries = this.entries(); // Get all current entries.
        this.capacity *= 2; // Double the capacity.
        this.clear(); // Clear the current map (resets buckets and size).

        // Re-insert all the old entries into the newly sized map.
        // The hash for each key will be recalculated with the new capacity.
        for (const [key, value] of oldEntries) {
            this.set(key, value);
        }
    }
}
