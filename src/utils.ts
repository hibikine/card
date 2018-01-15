export function randomInt(min: number = 0, max: number = 32768) {
  return (Math.random() * (max - min) | 0) + min;
}
