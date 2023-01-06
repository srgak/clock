export function makeArray(length: number, callback: (v: unknown, k: number) => any): Array<any> {
  return Array.from({length: length}, callback);
}