import React from 'react';
import ReactDOM from 'react-dom';
import enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import App, { getTransactionsFromBlock } from './App';
import BlockList from './components/BlockList';

enzyme.configure({ adapter: new Adapter() });
const { mount } = enzyme;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('shows 10 blocks', () => {
  const props = {
    recentBlock: 100,
    transactionData: {},
    onClick: () => {}
  }

  const component = mount(<BlockList {...props} />);

  const h3s = component.find("h3");
  expect(h3s.length).toEqual(10);
});

it('only shows transactions with ether', () => {
  const block = {
    transactions: [
      { hash: '222', from: '0x123', to: '0x234', value: 123 },
      { hash: '333', from: '0x1234', to: '0x2345', value: 0}
    ]
  }
  expect(getTransactionsFromBlock(block)).toEqual([{hash: '222', from: '0x123', to: '0x234', value: 123}]);
});

it('shows transaction details', () => {
  const props = {
    recentBlock: 100,
    transactionData: {
      100: [
        { hash: '222', from: '0x123', to: '0x234', value: 123 },
        { hash: '333', from: '0x1234', to: '0x2345', value: 1243 }
      ]
    },
    onClick: () => {}
  }

  const component = mount(<BlockList {...props} />);

  const transactions = component.find("li.transaction-item");
  expect(transactions.length).toEqual(2);
});
