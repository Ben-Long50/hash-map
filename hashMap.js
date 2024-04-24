import primeGen from "fast-prime-gen";
const generator = primeGen();

class HashMap {
  constructor() {
    this.tableSize = generator.skip(2).next().value;
    this.hashTable = new Array(this.tableSize);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    hashCode = hashCode % this.tableSize;
    return hashCode;
  }

  resizeTable() {
    this.tableSize = generator.next().value;
    this.hashTable = new Array(this.tableSize);
    console.log(this.tableSize);
  }

  rehashElements() {
    const hashTableCopy = this.hashTable;
    this.resizeTable();
    hashTableCopy.forEach((element) => {
      if (element) {
        this.set(element.key, element.value);
      }
    });
  }

  set(key, value) {
    const hashCode = this.hash(key);
    if (this.hashTable[hashCode] && this.hashTable[hashCode].key != key) {
      while (this.hashTable[hashCode]) {
        this.rehashElements();
        console.log("rehash taken");
      }
    }
    this.hashTable[hashCode] = { key, value };
    if (this.length() / this.tableSize >= 0.75) {
      this.rehashElements();
      console.log("rehash size");
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    return this.hashTable[hashCode].value;
  }

  has(key) {
    const keys = this.keys();
    for (let i = 0; i != keys.length; i++) {
      if (keys[i] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    delete this.hashTable[hashCode];
  }

  length() {
    let num = 0;
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i]) {
        num++;
      }
    }
    return num;
  }

  clear() {
    for (let i = 0; i < this.hashTable.length; i++) {
      delete this.hashTable[i];
    }
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i]) {
        keys.push(this.hashTable[i].key);
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i]) {
        values.push(this.hashTable[i].value);
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i]) {
        entries.push([this.hashTable[i].key, this.hashTable[i].value]);
      }
    }
    return entries;
  }
}

const Names = new HashMap();
Names.set("Ben", "Long");
Names.set("Pauline", "Nguyen");
Names.set("Eric", "Nguyen");
Names.set("Jeffrey", "Nguyen");
Names.set("Zach", "Wrong");
Names.set("Annie", "Osman");
Names.set("Steve", "Osman");
console.log(Names.hashTable);
console.log(Names.get("Steve"));
