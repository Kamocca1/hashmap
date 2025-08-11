import HashMap from "./hashmap.js";

console.log("--- Initializing and Populating ---");

const test = new HashMap(0.75);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Current length:", test.length());
console.log("Current capacity:", test.capacity);
console.log("Current entries:", test.entries());

console.log("\n--- Overwriting Existing Keys ---");
test.set("apple", "dark red");
test.set("dog", "dark brown");

console.log("Length after overwrite:", test.length()); // Should still be 12
console.log("Value for 'apple':", test.get("apple")); // Should be 'dark red'
console.log("Current capacity:", test.capacity); // Should still be 16

console.log("\n--- Triggering Resize ---");
// This next `set` will push the load factor over 0.75 (13/16 > 0.75)
test.set("moon", "silver");

console.log("Length after resize:", test.length()); // Should be 13
console.log("New capacity after resize:", test.capacity); // Should be 32
console.log("Has 'moon' key:", test.has("moon")); // Should be true
console.log("Current entries:", test.entries());

console.log("\n--- Testing Other Methods After Resize ---");
console.log("Removing 'grape':", test.remove("grape")); // true
console.log("Has 'grape' key:", test.has("grape")); // false
console.log("Length after removal:", test.length()); // 12
console.log("All keys:", test.keys());
console.log("All values:", test.values());

console.log("\n--- Clearing the Map ---");
test.clear();
console.log("Length after clear:", test.length()); // 0
console.log("Entries after clear:", test.entries()); // []
console.log("Capacity after clear:", test.capacity); // 32 (capacity remains)
