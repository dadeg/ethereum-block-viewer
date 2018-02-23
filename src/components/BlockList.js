import React from 'react';
import TransactionList from './TransactionList';
import TransactionListItem from './TransactionListItem';

export default function ({ recentBlock, transactionData, onClick }) {
  if (!recentBlock) { return null; }

  // Requirement: show 10 most recent blocks.
  let blocks = [];
  for (let i = 0; i < 10; i++) {
    const blockNumber = recentBlock - i;

    // Requirement: show transactions
    const transactionsInBlock = transactionData[blockNumber] || [];

    const transactions = transactionsInBlock.map(transaction => {
      return <TransactionListItem transaction={transaction} key={transaction.hash} />;
    });

    blocks.push(
      <li onClick={onClick.bind(null, blockNumber)} key={i}>
        <h3>Block: {blockNumber}</h3>
        <TransactionList display={transactionsInBlock.length > 0} transactions={transactions} />
      </li>
    );
  }

  return (
    <ul>{blocks}</ul>
  );
}
