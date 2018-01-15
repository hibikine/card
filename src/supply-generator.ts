import Supply from "./supply";

export function generateEnergySupply(): Supply[] {
  const supply = new Array<Supply>(3);
  supply[0] = new Supply().init();
  return supply;
}
