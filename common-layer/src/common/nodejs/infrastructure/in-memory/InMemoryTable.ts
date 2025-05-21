import fs from 'fs';

type InMemoryTableRecord<T> = T & { id: string | number };
export default class InMemoryTable<T> {
  private readonly filePath: string;
  constructor(readonly tableName: string) {
    this.filePath = `${tableName}.json`;
    this.initializeFile();
  }
  private initializeFile(): void {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }
  private readFile(): InMemoryTableRecord<T>[] {
    const content = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(content);
  }
  private writeFile(records: InMemoryTableRecord<T>[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(records, null, 2));
  }
  getAll(): InMemoryTableRecord<T>[] {
    return this.readFile();
  }
  add(key: string | number, record: T): void {
    const records = this.readFile();
    const recordWithKey = { id: key, ...record };
    records.push(recordWithKey);
    this.writeFile(records);
  }
  get(key: string | number): T | undefined {
    const records = this.readFile();
    return records.find(record => record.id === key);
  }
  find(predicate: (record: InMemoryTableRecord<T>) => boolean): InMemoryTableRecord<T> | undefined {
    const records = this.readFile();
    return records.find(predicate);
  }
  remove(key: string | number): void {
    const records = this.readFile();
    const filteredRecords = records.filter(record => record.id !== key);
    this.writeFile(filteredRecords);
  }
  removeWhere(predicate: (record: InMemoryTableRecord<T>) => boolean): InMemoryTableRecord<T>[] {
    const records = this.readFile();
    const removedRecords = records.filter(predicate);
    const remainingRecords = records.filter(record => !predicate(record));
    this.writeFile(remainingRecords);
    return removedRecords;
  }
}
