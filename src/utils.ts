export function randomInt(min: number = 0, max: number = 32768) {
  return (Math.random() * (max - min) | 0) + min;
}

export function randomChoice<T>(array: T[]): T {
  return array[randomInt(0, array.length)];
}
