class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj; // Return the value if it's not an object
    }
  
    if (Array.isArray(obj)) {
      // Handle arrays
      return obj.map(item => deepCopy(item));
    }
  
    // Handle objects
    const copy = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }
  
    return copy;
  }

class Node {
    constructor() {
        this.children = [];
        this.expression = "";
        this.available = [];
    }
}

var offeredNumbers = [];

offeredNumbers.push(Math.floor(Math.random() * 9) + 1);
offeredNumbers.push(Math.floor(Math.random() * 9) + 1);
offeredNumbers.push(Math.floor(Math.random() * 9) + 1);
offeredNumbers.push(Math.floor(Math.random() * 9) + 1);

let randomizer = Math.random();
if (randomizer < 0.33) {
    offeredNumbers.push(10);
} else if (randomizer < 0.66) {
    offeredNumbers.push(15);
} else {
    offeredNumbers.push(20);
}

randomizer = Math.random();
if (randomizer < 0.25) {
    offeredNumbers.push(25);
} else if (randomizer < 0.5) {
    offeredNumbers.push(50);
} else if (randomizer < 0.75) {
    offeredNumbers.push(75);
} else {
    offeredNumbers.push(100);
}

var targetNumber = Math.floor(Math.random() * 999) + 1;

console.log(offeredNumbers);
console.log(targetNumber);

var root = new Node();
root.available = offeredNumbers;
root.expression = "";

var queue = new Queue();

queue.enqueue(root);

while (!queue.isEmpty()) {

    let curr = queue.dequeue();

    if (curr.expression.length == 0 || 
        curr.expression[curr.expression.length - 1] == '+' || 
        curr.expression[curr.expression.length - 1] == '-' || 
        curr.expression[curr.expression.length - 1] == '*' || 
        curr.expression[curr.expression.length - 1] == '/' ||
        curr.expression[curr.expression.length - 1] == '(' ) 
    {

        for (let i = 0; i < curr.available.length; i++) {
            let child = new Node();
            child.expression = curr.expression + String(offeredNumbers[i]);
            child.available = deepCopy(curr.available);

            let index = curr.available.indexOf(offeredNumbers[i]);
            child.available.splice(index, 1);

            queue.enqueue(child);
        }

        let child = new Node();
        child.expression = curr.expression + '(';
        child.available = deepCopy(curr.available);

        queue.enqueue(child);

    } else if (curr.expression[curr.expression.length - 1] == ')') {
        let closedAllowed = 0;
        for (let i = 0; i < curr.expression.length; i++) {
            if (curr.expression[i] == '(') {
                closedAllowed++;
            } else if (curr.expression[i] == ')') {
                closedAllowed--;
            }
        }

        if (closedAllowed > 0) {
            let child = new Node();
            child.expression = curr.expression + ')';
            child.available = deepCopy(curr.available);

            queue.enqueue(child);
        }

        let operators = ['+', '-', '*', '/'];
        for (let i = 0; i < operators.length; i++) {
            let child = new Node();
            child.expression = curr.expression + operators[i];
            child.available = deepCopy(curr.available);

            queue.enqueue(child);
        }
    } else {
        let operators = ['+', '-', '*', '/'];
        for (let i = 0; i < operators.length; i++) {
            let child = new Node();
            child.expression = curr.expression + operators[i];
            child.available = deepCopy(curr.available);

            queue.enqueue(child);
        }
    }

    let balance = 0;
    for (let i = 0; i < curr.expression.length; i++) {
        if (curr.expression[i] == '(') {
            balance++;
        } else if (curr.expression[i] == ')') {
            balance--;
        }
    }

    if (balance == 0 &&
        curr.expression.length > 0 && 
        curr.expression[curr.expression.length - 1] != '(' && 
        curr.expression[curr.expression.length - 1] != ')' &&
        curr.expression[curr.expression.length - 1] != '+' &&
        curr.expression[curr.expression.length - 1] != '-' &&
        curr.expression[curr.expression.length - 1] != '*' &&
        curr.expression[curr.expression.length - 1] != '/') 
    {
        let result = eval(curr.expression);
        if (result == targetNumber) {
            console.log(curr.expression);
            break;
        }
    }

    if (curr.expression.length == 12) {
        break;
    }
}