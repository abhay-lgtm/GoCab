/**
 * Format a number as Indian Rupee currency.
 * @param {number} amount
 * @returns {string}  e.g. "₹320"
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined) return '—';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}
