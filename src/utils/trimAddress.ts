/**
 * Trim an Ethereum address.
 *
 * @param {string} address Ethereum address.
 * @param {number} chars Number of characters to keep on each side.
 * @returns {string} Trimmed Ethereum address.
 */
export const trimAddress = (address: string, chars = 4): string =>
  address.slice(0, 2 + chars) + '...' + address.slice(-chars);
