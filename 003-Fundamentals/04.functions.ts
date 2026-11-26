// Calculate tax: income is required, the tax year is optional and defaults to 2022.
export function calculateTax(income: number, taxYear = 2022): number {
  if (taxYear < 2022) return income * 1.2;
  return income * 1.3;
}
