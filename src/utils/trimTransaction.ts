/**
 * Trim a transaction hash to a certain number of characters.
 *
 * @param {string} hash Transaction hash.
 * @param {number} length Number of characters to show.
 * @returns {string} Trimmed transaction hash.
 */
export const trimTransaction = (hash: string, length = 13): string => hash.slice(0, length) + '...';
