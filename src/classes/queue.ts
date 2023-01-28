type ItemsType<T> = { [k: number]: T };

export class Queue<T> {
  constructor(
    private count: number = 0,
    private lowestCount: number = 0,
    private items: ItemsType<T> = {}
  ) {}

  enqueue(element: T): void {
    this.items[this.count] = element;
    this.count++;
  }

  getItems(): ItemsType<T> {
    return this.items;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.count - this.lowestCount;
  }

  peek(): T | undefined {
    if (this.isEmpty()) return undefined;

    return this.items[this.lowestCount];
  }

  clear(): void {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString(): string {
    if (this.isEmpty()) return "";

    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }

    return objString;
  }
}
