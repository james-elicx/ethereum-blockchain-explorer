import type { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, utils } from 'ethers';

/**
 * Retrieve the average fee for a list of transactions.
 *
 * @param {TransactionResponse[]} txs Transaction list.
 * @param {number} decimals Number of decimals to show.
 * @returns {number} Average fee for the list of transactions.
 */
export const averageFeeOfTxs = (txs: TransactionResponse[], decimals = 2): number => {
  let txns = 0;

  return parseFloat(
    (+utils.formatUnits(
      txs
        .reduce((val, tx) => {
          if (tx.gasPrice && tx.gasPrice > BigNumber.from(0)) {
            txns++;
            return val.add(tx.gasPrice);
          }
          return val;
        }, BigNumber.from(0))
        .div(txns),
      'gwei',
    )).toFixed(decimals),
  );
};
