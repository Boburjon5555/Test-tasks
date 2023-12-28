//B1
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        let node = this.map.get(key);
        if (node) {
            this.remove(node);
            this.add(node);
            return node.value;
        }
        return -1;
    }

    put(key, value) {
        let node = this.map.get(key);
        if (node) {
            this.remove(node);
        }

        node = new Node(key, value);
        this.add(node);
        this.map.set(key, node);

        if (this.map.size > this.capacity) {
            let leastRecentlyUsed = this.head.next;
            this.remove(leastRecentlyUsed);
            this.map.delete(leastRecentlyUsed.key);
        }
    }

    remove(node) {
        let prevNode = node.prev;
        let nextNode = node.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }

    add(node) {
        let prevNode = this.tail.prev;
        prevNode.next = node;
        this.tail.prev = node;
        node.prev = prevNode;
        node.next = this.tail;
    }
}


//B2
class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    removeHead() {
        if (!this.head) {
            return null;
        }
        const removedHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        return removedHead.value;
    }

    peek() {
        if (!this.head) {
            return null;
        }
        return this.head.value;
    }
}

class TimeWindowCounter {
    constructor(windowSizeSeconds) {
        this.windowSizeSeconds = windowSizeSeconds;
        this.values = new LinkedList();
    }

    hit(value) {
        const currentTime = Date.now() / 1000;
        this.values.append({time: currentTime, value: value});
        this.removeOldValues();
    }

    count() {
        this.removeOldValues();
        return this.values.reduce((total, item) => total + item.value, 0);
    }

    removeOldValues() {
        const currentTime = Date.now() / 1000;
        while (this.values.peek() && currentTime - this.values.peek().time > this.windowSizeSeconds) {
            this.values.removeHead();
        }
    }
}




//C
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }
}

function findConcatenations(dictionary, queries) {
    let trie = new Trie();
    for (let word of dictionary) {
        trie.insert(word);
    }

    let results = [];
    for (let query of queries) {
        let concatenations = [];
        for (let i = 1; i < query.length; i++) {
            if (trie.search(query.slice(0, i)) && trie.search(query.slice(i))) {
                concatenations.push(query.slice(0, i) + ":" + query.slice(i));
            }
        }
        results.push([concatenations.length, concatenations]);
    }
    return results;
}
