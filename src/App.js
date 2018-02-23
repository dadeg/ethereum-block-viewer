import React, { Component } from 'react';
import './App.css';
import Web3ServiceProvider from './lib/Web3ServiceProvider';
import BlockList from './components/BlockList';

const web3 = Web3ServiceProvider.create();

export function getTransactionsFromBlock(block) {
  if (block === null) {
    console.error('getBlock returned null for some unknown reason.');
  }
  // Requirement: only return transactions with ether.
  return block.transactions.filter(transaction => transaction.value > 0);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latestBlockNumber: null,
      transactions: {}
    };

    web3.eth.getBlockNumber().then(latestBlockNumber => {
      this.setState({ latestBlockNumber });
    });

    this.findTransactionsWithEther = this.findTransactionsWithEther.bind(this);
  }

  findTransactionsWithEther(blockNumber) {
    const includeTransactions = true;
    web3.eth.getBlock(blockNumber, includeTransactions).then(block => {
      const transactionsWithEther = getTransactionsFromBlock(block);
      const updatedTransactions = Object.assign({}, this.state.transactions, { [blockNumber]: transactionsWithEther });
      this.setState({ transactions: updatedTransactions });
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ethereum Block Explorer</h1>
        </header>
        <p className="App-intro">
          Here are some recent blocks, click one to see its transactions.
        </p>
        <BlockList recentBlock={this.state.latestBlockNumber} transactionData={this.state.transactions} onClick={this.findTransactionsWithEther} />
      </div>
    );
  }
}

export default App;
