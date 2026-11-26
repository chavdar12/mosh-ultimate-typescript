// Lesson: describing types with JSDoc, so checkJs can type-check plain JavaScript.

/**
 * Calculates income tax.
 * @param {number} income - Annual income.
 * @returns {number} - Net income after tax.
 */
export function calculateTax(income) {
  return income * 0.7;
}
