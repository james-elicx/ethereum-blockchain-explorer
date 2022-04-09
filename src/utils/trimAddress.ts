/**
 * Trim an Ethereum address.
 *
 * @param {string} address Ethereum address.
 * @returns {string} Trimmed Ethereum address.
 */
export const trimAddress = (address: string): string =>
  address.slice(0, 6) + '...' + address.slice(-4);
