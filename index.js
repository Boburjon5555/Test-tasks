//A1
function checkBrackets(expression) {
    let stack = [];
    let brackets = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    for (let char of expression) {
        if (brackets.hasOwnProperty(char)) {  
            stack.push(char);
        } else if (Object.values(brackets).includes(char)) {  
            if (!stack.length || brackets[stack.pop()] !== char) {
                return 'Incorrect'; 
            }
        }
    }
    return stack.length ? 'Incorrect' : 'Correct';
}


console.log(checkBrackets('([abc])'));  



//A2
function* fib()  {
    let [prev, curr] = [0, 1];
    while (true) {
        yield prev;
        [prev, curr] = [curr, prev + curr];
    }
}

function* nonFib() {
    let fibGen = fib();
    let fibNum = fibGen.next().value;
    let current = 0;
    while (true) {
        if (current === fibNum) {
            fibNum = fibGen.next().value;
        } else {
            yield current;
        }
        current++;
    }
}

function printNonFib(n) {
    let nonFibGen = nonFib();
    for (let i = 0; i < n; i++) {
        console.log(nonFibGen.next().value);
    }
}

printNonFib(10);


//B1
class LRUCache {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.cache = {};
        this.keys = [];
    }

    proxyMethod(key, func, ...args) {
        if(this.cache[key]) {
            this.keys.splice(this.keys.indexOf(key), 1);
            this.keys.push(key);
            return this.cache[key];
        } else {
            let result = func(...args);
            this.cache[key] = result;
            this.keys.push(key);
            if(this.keys.length > this.maxSize) {
                let oldestKey = this.keys.shift();
                delete this.cache[oldestKey];
            }
            return result;
        }
    }
}



//B2
class MovingWindowCounter {
    constructor(windowSize) {
        this.windowSize = windowSize * 1000; 
        this.hits = [];
    }

    hit(value) {
        const currentTime = Date.now();
        this.hits.push({time: currentTime, value: value});
    }

    count() {
        const currentTime = Date.now();
        while(this.hits.length > 0 && currentTime - this.hits[0].time > this.windowSize) {
            this.hits.shift();
        }
        return this.hits.reduce((total, hit) => total + hit.value, 0);
    }
}



//C1
class Dictionary {
    constructor(words) {
        this.words = new Set(words);
    }

    isWord(word) {
        return this.words.has(word);
    }

    findConcatenations(s) {
        let results = [];
        for (let i = 1; i < s.length; i++) {
            let left = s.slice(0, i);
            let right = s.slice(i);
            if (this.isWord(left) && this.isWord(right)) {
                results.push(`${left}:${right}`);
            }
        }
        return results;
    }
}


let dict = new Dictionary(['abcd', 'cdef', 'ab', 'ef', 'ffff']);
let results = dict.findConcatenations('abcdef');
console.log(results.length, ...results);
