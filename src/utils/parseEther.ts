import type { BigNumber } from 'ethers';
import { utils } from 'ethers';

/**
 * Parse an Ethereum value.
 *
 * @param {BigNumber} value Raw Ethereum value.
 * @param {number} decimals Number of decimals to show.
 * @returns {number} Parsed Ethereum Value.
 */
export const parseEther = (value: BigNumber, decimals = 2): number =>
  parseFloat((+utils.formatEther(value)).toFixed(decimals));
