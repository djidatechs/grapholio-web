export class Stack<T> {
    private elements: T[] = [];

    push(item: T): void {
        this.elements.push(item);
    }

    pop(): T | undefined {
        return this.elements.pop();
    }

    peek(): T | undefined {
        return this.elements[this.elements.length - 1];
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}

export class Queue<T> {
    private elements: T[] = [];

    enqueue(item: T): void {
        this.elements.push(item);
    }

    dequeue(): T | undefined {
        return this.elements.shift();
    }

    peek(): T | undefined {
        return this.elements[0];
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }
}


export class S_Set<T> {
    elements: T[] = [];

    constructor(initialArray?: T[]) {
        if (initialArray) {
            this.elements = [...new Set(initialArray)];
        }
    }

    add(item: T): void {
        if (!this.has(item)) {
            this.elements.push(item);
        }
    }

    has(item: T): boolean {
        return this.elements.includes(item);
    }

    delete(item: T): void {
        const index = this.elements.indexOf(item);
        if (index !== -1) {
            this.elements.splice(index, 1);
        }
    }

    asArray(): T[] {
        return [...this.elements];
    }

    union(otherSet: S_Set<T>): S_Set<T> {
        const unionSet = new S_Set(this.elements);
        otherSet.elements.forEach(item => this.add(item));
        return unionSet;
    }

    intersection(otherSet: S_Set<T>): S_Set<T> {
        const intersectionSet = new S_Set<T>();
        this.elements.forEach(item => {
            if (otherSet.has(item)) {
                intersectionSet.add(item);
            }
        });
        return intersectionSet;
    }
}
