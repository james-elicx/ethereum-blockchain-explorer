import type { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, utils } from 'ethers';

/**
 * Retrieve the total value of a list of transactions.
 *
 * @param {TransactionResponse[]} txs Transaction list.
 * @param {number} decimals Number of decimals to show.
 * @returns {number} Value of the list of transactions.
 */
export const valueOfTxs = (txs: TransactionResponse[], decimals = 2): number =>
  parseFloat(
    (+utils.formatEther(
      txs.reduce((val, tx) => {
        return val.add(tx.value);
      }, BigNumber.from(0)),
    )).toFixed(decimals),
  );
