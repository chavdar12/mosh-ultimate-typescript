// A plain JavaScript module with no JSDoc, as if from a third party.
export function shippingCost(weight) {
  return weight <= 1 ? 5 : 5 + (weight - 1) * 2;
}
