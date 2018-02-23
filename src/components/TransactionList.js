import React from 'react';

export default function Transactionlist({ display, transactions }) {
  if (!display) { return null; }
  return (
    <div><h4>Transaction Summary</h4><ul>{transactions}</ul></div>
  );
}
