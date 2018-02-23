import React from 'react';

function toEther(wei) {
  return wei / 1e18;
}

export default function TransactionListItem({ transaction }) {
  return (
    <li className='transaction-item'>
      {transaction.from} sent {transaction.to} {toEther(transaction.value)} ETH
    </li>
  );
};
